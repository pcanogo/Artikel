import { User } from '../../types.ts'

// USERS SERVICE ABSTRACT CLASS
export abstract class UsersService {

    abstract getUsers() : User[] | Promise<User[]>
    abstract getUser(id: string) : User | undefined | Promise<User | undefined>
    abstract createUser(newUser: User) : string | Promise<string>
    abstract updateUser(userID: string , updatedUser: User) : string | Promise<string>
    abstract deleteUser(id: string) : void | Promise<void>

    abstract getUserByEmail(email: string) : User | undefined | Promise<User | undefined>


}