import {  User } from '../types.ts'
import { UsersService } from '../services/users/users_service.ts'
import { AuthService } from '../services/auth-service/auth.ts'
import { RouterContext } from "https://deno.land/x/oak/mod.ts"
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts'

export class AuthController{
    private userService : UsersService
    private authService : AuthService

    constructor( 
        userService : UsersService,
        authService : AuthService
    ) {
        this.userService = userService
        this.authService = authService
    }

    public login = async (ctx: RouterContext) => {
        const body = await ctx.request.body()
        const user = await this.userService.getUserByEmail(body.value.email)

        if(user){
            const pwdMatch = await bcrypt.compare(body.value.password, user.password)
            if(!pwdMatch) {

                ctx.response.status = 401
                ctx.response.body = {
                    success: false,
                    msg: 'Username / Password do not match'
                }
            } else {
                const jwt = await this.authService.generateJWT(user)
                ctx.response.status = 200
                ctx.response.body = {
                    success: true,
                    data: jwt
                }
            }
        } else {
            ctx.response.status = 401
            ctx.response.body = {
                success: false,
                msg: 'Username / Password do not match'
            }
        } 
    }

    public authSession = async (ctx: RouterContext, next: any) => {
        const token = await ctx.request.headers.get('authorization')

        if(!token || token == ''){
            ctx.response.status = 401
            ctx.response.body = {
                success: false,
                data: 'No authorization headers'
            }
        } else {
            const jwt = token.split(' ')[1]
            const session = await this.authService.validateSession(jwt)
            if(!session.isValid){
                ctx.response.status = 403
                ctx.response.body = {
                    success: false,
                    data: 'Session invalid'
                }
            } else {
                await next()
            }
            
        }
    }

    public checkAdmin = async (ctx: RouterContext, next:any) => {
        const session:any = await this.authService.getSession(ctx)
        const userType = session.payload.userType
        const token = await ctx.request.headers.get('authorization')

        if(userType!== 'admin'){
            ctx.response.status = 403
            ctx.response.body = {
                success: false,
                data: 'Not authorized'
            }
        } else {
            await next()
        } 
    }

    public checkSessionOwner = async (ctx: RouterContext, next:any ) => {
        const body  = await ctx.request.body()
        if(!body.value.user_id){
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
            const userID = body.value.user_id
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

    public updatePassword = async (ctx: RouterContext) => {
        const body = await ctx.request.body()
        const session:any = await this.authService.getSession(ctx)
        const user = await this.userService.getUser(session.payload.iss)

        if(!user){
            ctx.response.status = 404
            ctx.response.body = {
                success: false,
                msg: 'User Error'
            }
        } else {
            const pwdMatch = await bcrypt.compare(body.value.password, user.password)
            if(!pwdMatch){
                ctx.response.status = 401
                ctx.response.body = {
                    success: false,
                    msg: 'Incorrect password'
                }
            } else {
                await this.userService.updatePassword(user.id, body.value.newPassword)
                ctx.response.status = 200
                ctx.response.body = {
                    success: true,
                    data: 'Password Updated'
                }
            }
        }
    }

}

