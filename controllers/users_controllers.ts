import { ctx, User } from '../types.ts'
import {AuthService} from '../services/auth-service/auth.ts'
import { UsersService} from '../services/users/users_service.ts'
import { WordItemService } from '../services/word-items/word_item_service.ts'
import { WordImageService } from '../services/word-images/word_image_service.ts'
import { RouterContext } from "https://deno.land/x/oak/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"

export class UsersController {
    private userService : UsersService
    private wordItemService: WordItemService
    private wordImageService: WordImageService    
    private authService: AuthService

    constructor (
        userService: UsersService,
        wordItemService : WordItemService,
        wordImageService: WordImageService,
        authService: AuthService      
        ) {
        this.userService = userService
        this.wordItemService = wordItemService
        this.wordImageService = wordImageService
        this.authService = authService
    }

    public getUsers = async (ctx : RouterContext) => {
        const users = await this.userService.getUsers()
        ctx.response.body = {
            success: true,
            data: users
        }
    }
    
    
    public getUser = async ({ params, response }: ctx) => {
        const user = await this.userService.getUser(params.id)
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
        const body = await ctx.request.body()
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(body.value.password, salt);
        body.value['password'] = hash
        
        if(!ctx.request.hasBody){
            ctx.response.status = 400
            ctx.response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
            const newUserID = await this.userService.createUser(body.value)
            ctx.response.body = {
                success: true,
                msg: newUserID
            }
        }
    }
    
    public updateUser = async ( {params, request, response} : ctx ) => {
        const body = await request.body()
        const user = await this.userService.getUser(params.id)
    
        if(!user){
            response.status = 404
            response.body = {
                success: false,
                msg: 'No user found'
            }
        } else {
            const updatedUserID = await this.userService.updateUser(user.id, body.value)
            response.status = 200
            response.body = {
                success: true,
                data: `${updatedUserID}`
            }
        }
    }
    
    public deleteUser = async ({params, response} : ctx) => {
        this.wordImageService.deleteUserItemImages(params.id)
        this.wordItemService.deleteUserItems(params.id)
        this.userService.deleteUser(params.id)
        response.body = {
            success: true,
            msg: `Deleted user successfully`
        }
    }

    public checkUserOwner = async (ctx: RouterContext, next:any) => {
        const session:any = await this.authService.getSession(ctx)
        const currentuser = {
            id: session.payload.iss,
            type: session.payload.userType
        }
        const userID = ctx.params.id

        if(userID !== currentuser.id && currentuser.type !== 'admin'){
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


