import { ctx, WordItem } from '../types.ts'
import { WordItemService } from '../services/word-items/word_item_service.ts'
import { WordImageService } from '../services/word-images/word_image_service.ts'
import { RouterContext } from "https://deno.land/x/oak/mod.ts"
import { AuthService } from '../services/auth-service/auth.ts'

export class WordItemController {
    private itemService: WordItemService
    private wordImageService: WordImageService
    private authService: AuthService

    constructor (
        itemService : WordItemService,
        wordImageService: WordImageService,
        authService: AuthService
        ){
        this.itemService = itemService
        this.wordImageService = wordImageService,
        this.authService = authService
    }

    public getWordItems = async ({ response } : ctx) => {
        const items = await this.itemService.getAllWordItems()
        response.body = {
            success: true,
            data: items
        }
    }

    //createWordItem
    public createWordItem = async ({request, response} : ctx) => {
        const body = await request.body()
        if(!request.hasBody){
            response.status = 400
            response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
            const newWordItemID = await this.itemService.createWordItem(body.value)
            response.body = {
                success: true,
                msg: `Created item with ID ${newWordItemID}`
            }
        }

    } 

    //getWordItem
    public getWordItem = async ({params, response} : ctx) => {
        const item_info = await this.itemService.getWordItem(params.id)
        const item_urls = await this.wordImageService.getItemImagesURL(params.id)
        const item = {
            ...item_info,
            img_urls: [...item_urls]
        }

        if(!item){
            //error
            response.status = 404
            response.body = {
                success: false,
                msg: 'item not found'
            }
        } else {
            response.status = 200
            response.body = {
                success: true,
                data: item
            }
        }
    }

    public updateWordItem = async ( {params, request, response} : ctx ) => {
        const body = await request.body()
        const item = await this.itemService.getWordItem(params.id)
    
        if(!item){
            response.status = 404
            response.body = {
                success: false,
                msg: 'WordItem not found'
            }
        } else {
            const updatedWordItemID = await this.itemService.updateWordItem(item.id, body.value)
            response.status = 200
            response.body = {
                success: true,
                data: `Updated item with ID ${updatedWordItemID}`
            }
        }
    }

    //deleteWordItem
    public deleteWordItem = async ({params, response} : ctx) => {
        const item = await this.itemService.getWordItem(params.id)
        if(!item){
            response.status = 404
            response.body = {
                success: false,
                msg: 'WordItem not found'
            }
        } else{
            await this.wordImageService.deleteItemImages(item.id)
            await this.itemService.deleteWordItem(item.id)
            response.body = {
                success: true,
                msg: 'Deleted item successfully'
            }
        }
    }

    public getUserItems = async ({params, response} : ctx) => {
        const items = await this.itemService.getUserItems(params.id)
        if(!items){
            response.status = 404
            response.body = {
                success: false,
                msg: 'User has no word items'
            }
        } else {
            response.status = 200
            response.body = {
                success: true,
                data: items
            }
        }
    }

    public deleteUserItems = async ({params, response} : ctx) => {
        const items = await this.itemService.getUserItems(params.id)

        if(!items){
            response.status = 404
            response.body = {
                success: false,
                msg: 'User has no word items'
            }
        } else {
            await this.wordImageService.deleteUserItemImages(params.id)
            await this.itemService.deleteUserItems(params.id)
            response.status = 200
            response.body = {
                success: true,
                data: 'User items deleted.'
            }
        }
    }

    public checkItemOwner = async (ctx: RouterContext, next:any ) => {
        if(!ctx.params.id){
            ctx.response.status = 400
            ctx.response.body = {
                success: false,
                msg: 'bad request'
            }
        } else {
            const session:any = await this.authService.getSession(ctx)
            const currentuser = {
                id: session.payload.iss,
                type: session.payload.userType
            }
            const userID = await this.itemService.getUserID(ctx.params.id)
            if(String(userID) !== currentuser.id && currentuser.type !== 'admin'){
                ctx.response.status = 401
                ctx.response.body = {
                    success: false,
                    msg: 'Not Authorized'
                }
            } else {
                await next()
            }
        }
    }
}

