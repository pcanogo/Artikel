import { makeJwt, setExpiration, Jose, Payload } from 'https://deno.land/x/djwt/create.ts'
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { User } from '../../types.ts';
import { RouterContext } from "https://deno.land/x/oak/mod.ts"

export class AuthService {
    private key: string
    constructor (key: string){
        this.key = key
    }

    public async generateJWT(user: User) {
        const userType  = user.type ? user.type : 'user'
        const payload: Payload = {
            iss: user.id,
            userType: userType,
            exp: setExpiration(new Date().getTime() + 10 * 60 * 1000),
        }
        const header: Jose = {
            alg: "HS256",
            typ: "JWT",
        }
        const key = this.key
        console.log('THIS IS THE PAYLOAD')
        console.log(payload)
        return makeJwt({ header, payload, key})
    }

    public async validateSession(jwt: string) {
        const key = this.key
        try {
            const token: any = await validateJwt(jwt, key, {})
            return token
        } catch (error){
            throw new Error(error) 
        }
        
    }
    public async getSession (ctx: RouterContext)  {
        const token = await ctx.request.headers.get('authorization')
        if(token) {
            const jwt = token.split(' ')[1]
            const session = await this.validateSession(jwt)
            return session
        }
    }

}

