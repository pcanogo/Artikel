import {User} from '../../types.ts'
import {UsersService} from './users.ts'

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

export class UserRAM extends UsersService {
    constructor() {
        super()
    }

    public getUsers() : User[] {
        return users
    }

    public getUser(id: string) : User | undefined{
        const user: User | undefined = users.find(x => x.id === id)
        return user
    }

    public addUser(newUser: User) : string{
        users.push(newUser)
        return newUser.id
    }

    public editUser (userID:string, updatedUser: User) : string {
        const user  : {
            first_name?: string;
            last_name?: string;
            email?: string;
        } = updatedUser
        
        users = users.map(x => x.id === userID ? { ...x, ...updatedUser } : x)
        return userID
    }

    public deleteUser(id:string) : void{
        users = users.filter(x => x.id !== id)
    }
}