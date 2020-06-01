import { ctx } from '../types.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { UsersService} from '../services/users/users_service.ts'
import { WordBankService } from '../services/wordbanks/word_bank_service.ts'
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export class UsersController {
    private userService : UsersService
    private wordBankService: WordBankService

    constructor (
        userService: UsersService,
        wordBankService : WordBankService        
        ) {
        this.userService = userService
        this.wordBankService = wordBankService
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
    
    public addUser = async ( ctx: RouterContext ) => {
        let body = await ctx.request.body()
        if(!ctx.request.hasBody){
            ctx.response.status = 400
            ctx.response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
            body.value.wordBank_id = this.wordBankService.addWordBank(body.value.id)
            const newUserID = this.userService.addUser(body.value)
            ctx.response.body = {
                success: true,
                msg: `Create user with ID ${newUserID}`
            }
        }
    }
    
    public editUser = async ( {params, request, response} : ctx ) => {
        const body = await request.body()
        const user = this.userService.getUser(params.id)
    
        if(!user){
            response.status = 404
            response.body = {
                success: false,
                msg: 'No user found'
            }
        } else {
            const updatedUserID = this.userService.editUser(user.id, body.value)
            response.status = 200
            response.body = {
                success: true,
                data: updatedUserID
            }
        }
    }
    
    public deleteUser = ({params, response} : ctx) => {
        this.wordBankService.deleteWordBank(params.id)
        this.userService.deleteUser(params.id)
        response.body = {
            success: true,
            msg: `Deleted user with ID ${params.id}`
        }
    }

}


