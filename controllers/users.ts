import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { User } from '../types.ts'
import { UsersService } from '../services/users/users.ts'
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

interface ctx {
    [key:string]: any;
}

let users: User[] = [
    {
        id: '1',
        first_name: 'user1',
        last_name: 'test1',
        email: '1@gemail.com',
        password: 'pwd'
    },
    {
        id: '2',
        first_name: 'user2',
        last_name: 'test2',
        email: '2@gemail.com',
        password: 'pwd'
    },
    {
        id: '3',
        first_name: 'user3',
        last_name: 'test3',
        email: '3@gemail.com',
        password: 'pwd'
    },
  ];

export class UsersController {
    private userService : UsersService

    constructor (userService: UsersService) {
        this.userService = userService
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
        const body = await ctx.request.body()
        if(!ctx.request.hasBody){
            ctx.response.status = 400
            ctx.response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
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
        this.userService.deleteUser(params.id)
        response.body = {
            success: true,
            msg: `Deleted user with ID ${params.id}`
        }
    }

}


