import { User } from '../../types.ts'

// USERS SERVICE ABSTRACT CLASS
export abstract class UsersService {
    constructor() {}

    abstract getUsers() : User[] 
    abstract getUser(id: string) : User | undefined
    abstract addUser(newUser: User) : string
    abstract editUser(userID: string , updatedUser: User) : string
    abstract deleteUser(id: string) : void

}