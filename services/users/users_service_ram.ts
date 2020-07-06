import {User} from '../../types.ts'
import {UsersService} from './users_service.ts'

let users: User[] = [
    {
        id: '1',
        first_name: 'user1',
        last_name: 'test1',
        email: '1@email.com',
        password: '$2a$08$eq/fVKyZ9Zcdby3rT8CiyOlwSEgd1eVgTXys4vKbYB2Mnk4X8trtu',
        type:'admin'
    },
    {
        id: '2',
        first_name: 'user2',
        last_name: 'test2',
        email: '2@email.com',
        password: '$2a$08$eq/fVKyZ9Zcdby3rT8CiyOlwSEgd1eVgTXys4vKbYB2Mnk4X8trtu'
    },
    {
        id: '3',
        first_name: 'user3',
        last_name: 'test3',
        email: '3@email.com',
        password: '$2a$08$eq/fVKyZ9Zcdby3rT8CiyOlwSEgd1eVgTXys4vKbYB2Mnk4X8trtu'
    },
];

export class UserRAM extends UsersService {
    constructor() {
        super()
    }

    public getUsers() : User[] {
        return users
    }

    public getUser(id: string) : User | undefined {
        const user: User | undefined = users.find(x => x.id === id)
        return user
    }

    public createUser(newUser: User) : string {
        newUser['id'] = String(users.length + 1)
        users.push(newUser)
        return newUser.id
    }

    public updateUser (userID:string, updatedUser: User) : string {
        users = users.map(x => x.id === userID ? { ...x, ...updatedUser } : x)
        return userID
    }

    public updatePassword (userID:string, pwd: string) : void {
        users = users.map(x => x.id === userID ? { ...x, pwd } : x)
    }


    public deleteUser(id:string) : void {
        users = users.filter(x => x.id !== id)
    }

    public getUserByEmail(email: string) : User | undefined {
        const user = users.find(x => x.email === email)
        return user
    }
}