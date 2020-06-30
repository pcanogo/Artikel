import { ctx, WordImage } from '../types.ts'
import { WordImageService } from '../services/word-images/word_image_service.ts'
import { AuthService } from '../services/auth-service/auth.ts'
import { RouterContext } from "https://deno.land/x/oak/mod.ts"

export class WordImageController {
    private wordImageService: WordImageService
    private authService: AuthService

    constructor (
        wordImageService : WordImageService,
        authService: AuthService
    ){
        this.wordImageService = wordImageService
        this.authService = authService
    }

    public getAllWordImages = async ({ response } : ctx) => {
        const images = await this.wordImageService.getAllWordImages()
        response.body = {
            success: true,
            data: images
        }
    }


    public getWordImage = async ({params, response} : ctx) => {
        const wordImage = await this.wordImageService.getWordImage(params.id)
        if(!wordImage){
            //error
            response.status = 404
            response.body = {
                success: false,
                msg: 'WordImage not found'
            }
        } else {
            response.status = 200
            response.body = {
                success: true,
                data: wordImage
            }
        }
    }

    public createWordImage = async ({request, response} : ctx) => {
        const body = await request.body()
        if(!request.hasBody){
            response.status = 400
            response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
            const newWordImageID = await this.wordImageService.createWordImage(body.value)
            response.body = {
                success: true,
                msg: `Created wordimage with ID ${newWordImageID}`
            }
        }

    } 

    public updateWordImage = async ( {params, request, response} : ctx ) => {
        const body = await request.body()
        const wordImage = await this.wordImageService.getWordImage(params.id)
    
        if(!wordImage){
            response.status = 404
            response.body = {
                success: false,
                msg: 'No wordImage found'
            }
        } else {
            const updatedImageID = await this.wordImageService.editWordImage(params.id, body.value)
            response.status = 200
            response.body = {
                success: true,
                data: `Updated wordImage with ID ${updatedImageID}`
            }
        }
    }

    public deleteWordImage = async ({params, response} : ctx) => {
        await this.wordImageService.deleteWordImage(params.id)
        response.body = {
            success: true,
            msg: `Deleted word image with ID ${params.id}`
        }
    }

    //ITEM IMAGE CONTROLS
    public getItemImages = async ({params, response} : ctx) => {
        const items = await this.wordImageService.getItemImages(params.id)

        if(!items){
            response.status = 404
            response.body = {
                success: false,
                msg: 'Item has no images'
            }
        } else {
            response.status = 200
            response.body = {
                success: true,
                data: items
            }
        }
    }

    public deleteItemImages = async ({params, response} : ctx) => {
        const items = await this.wordImageService.getItemImages(params.id)

        if(!items){
            response.status = 404
            response.body = {
                success: false,
                msg: 'User has no word items'
            }
        } else {
            await this.wordImageService.deleteItemImages(params.id)
            response.status = 200
            response.body = {
                success: true,
                data: 'Item images deleted'
            }
        }
    }

    //USER IMAGE CONTROLS
    public getUserImages = async ({params, response} : ctx) => {
        const images = await this.wordImageService.getUserItemImages(params.id)

        if(!images){
            response.status = 404
            response.body = {
                success: false,
                msg: 'User has no images'
            }
        } else {
            response.status = 200
            response.body = {
                success: true,
                data: images
            }
        }
    }

    public deleteUserImages = async ({params, response} : ctx) => {
        const images = await this.wordImageService.getUserItemImages(params.id)

        if(!images){
            response.status = 404
            response.body = {
                success: false,
                msg: 'User has no images'
            }
        } else {
            await this.wordImageService.deleteUserItemImages(params.id)
            response.status = 200
            response.body = {
                success: true,
                data: 'User images deleted'
            }
        }
    }

    public checkImageOwner = async (ctx: RouterContext, next:any ) => {
        if(ctx.params.id){
            const session:any = await this.authService.getSession(ctx)
            const currentuser = {
                id: session.payload.iss,
                type: session.payload.userType
            }
            const userID = await this.wordImageService.getUserID(ctx.params.id)
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

