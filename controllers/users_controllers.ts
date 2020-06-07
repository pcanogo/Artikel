import { ctx } from '../types.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { UsersService} from '../services/users/users_service.ts'
import { WordItemService } from '../services/word-items/word_item_service.ts'
import { WordImageService } from '../services/word-images/word_image_service.ts'
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export class UsersController {
    private userService : UsersService
    private wordItemService: WordItemService
    private wordImageService: WordImageService     

    constructor (
        userService: UsersService,
        wordItemService : WordItemService,
        wordImageService: WordImageService      
        ) {
        this.userService = userService
        this.wordItemService = wordItemService
        this.wordImageService = wordImageService
    }

    public getUsers = ({ response } : ctx) => {
        response.body = {
            success: true,
            data: this.userService.getUsers()
        }
    }
    
    
    public getUser = ({ params, response }: ctx) => {
        const user = this.userService.getUser(params.id)
        if (!user) {
            response.status = 404
            response.body = {
                success: false,
                msg: 'No user found'
            }
        } else {
            response.status = 200
            response.body = {
                success: true,
                data: user
            }
        }
    }
    
    public createUser = async ( ctx: RouterContext ) => {
        let body = await ctx.request.body()
        if(!ctx.request.hasBody){
            ctx.response.status = 400
            ctx.response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
            body.value.wordItem_id = this.wordItemService.createWordItem(body.value.id)
            const newUserID = this.userService.createUser(body.value)
            ctx.response.body = {
                success: true,
                msg: `Created user with ID ${newUserID}`
            }
        }
    }
    
    public updateUser = async ( {params, request, response} : ctx ) => {
        const body = await request.body()
        const user = this.userService.getUser(params.id)
    
        if(!user){
            response.status = 404
            response.body = {
                success: false,
                msg: 'No user found'
            }
        } else {
            const updatedUserID = this.userService.updateUser(user.id, body.value)
            response.status = 200
            response.body = {
                success: true,
                data: `Updated user with ID ${updatedUserID}`
            }
        }
    }
    
    public deleteUser = ({params, response} : ctx) => {
        this.wordImageService.deleteUserItemImages(params.id)
        this.wordItemService.deleteUserItems(params.id)
        this.userService.deleteUser(params.id)
        response.body = {
            success: true,
            msg: `Deleted user with ID ${params.id}`
        }
    }

}


