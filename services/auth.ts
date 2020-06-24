import { makeJwt, setExpiration, Jose, Payload } from 'https://deno.land/x/djwt/create.ts'
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts'
import { User } from '../types.ts'

export class AuthService {
    private key: string
    constructor (key: string){
        this.key = key
    }

    public async generateJWT(userID: string) {
        const payload: Payload = {
            iss: userID,
            exp: setExpiration(new Date().getTime() + 10 * 60 * 1000),
        }
        const header: Jose = {
            alg: "HS256",
            typ: "JWT",
        }
        const key = this.key

        return makeJwt({header, payload, key})
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

}

