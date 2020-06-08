import { User } from '../../types.ts'
import { QueryResult } from "https://deno.land/x/postgres/query.ts"

// USERS SERVICE ABSTRACT CLASS
export abstract class UsersService {

    abstract getUsers() : User[] | Promise<User[]>
    abstract getUser(id: string) : User | undefined | Promise<User | undefined>
    abstract createUser(newUser: User) : string
    abstract updateUser(userID: string , updatedUser: User) : string
    abstract deleteUser(id: string) : void

}