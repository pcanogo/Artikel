import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { User } from '../types.ts'
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

export const getUsers = ({ response }: ctx) => {
    response.body = {
        success: true,
        data: users
    }
}


export const getUser = ({ params, response }: ctx) => {
    const user: User | undefined = users.find(p => p.id === params.id)
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

export const addUser = async ( ctx: RouterContext ) => {
    const body = await ctx.request.body()
    if(!ctx.request.hasBody){
        ctx.response.status = 400
        ctx.response.body = {
            success: false,
            msg: "No Data"
        }
    } else {
        const user: User = body.value
        users.push(user)
        ctx.response.body = {
            success: true,
            msg: `Create user with ID ${user.id}`
        }
    }
}

export const editUser = async ( ctx: RouterContext ) => {
    const body = await ctx.request.body()
    const user: User | undefined = users.find(p => p.id === ctx.params.id)

    if(!user){
        ctx.response.status = 404
        ctx.response.body = {
            success: false,
            msg: 'No user found'
        }
    } else {
        const updateUser :{
            first_name?: string;
            last_name?: string;
            email?: string;
        } = body.value
        users = users.map(u => u.id === ctx.params.id ? { ...u, ...updateUser } : u)

        ctx.response.status = 200
        ctx.response.body = {
            success: true,
            data: users
        }
    }
}

export const deleteUser = (ctx: RouterContext) => {
    users = users.filter(u => u.id !== ctx.params.id)
    ctx.response.body = {
        success: true,
        msg: `Deleted user with ID ${ctx.params.id}`
    }
}
