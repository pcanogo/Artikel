import { User } from '../../types.ts'

// USERS SERVICE ABSTRACT CLASS
export abstract class UsersService {

    abstract getUsers() : User[] 
    abstract getUser(id: string) : User | undefined
    abstract createUser(newUser: User) : string
    abstract updateUser(userID: string , updatedUser: User) : string
    abstract deleteUser(id: string) : void

}