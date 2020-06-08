import {User} from '../../types.ts'
import {UsersService} from './users_service.ts'
import {DBService} from '../../db/db.ts'

const _USER_ID = 0
const _USER_FNAME = 1
const _USER_LNAME = 2
const _USER_EMAIL = 3
const _USER_PWD = 4

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

export class UserDB extends UsersService {
    private _db : DBService

    constructor(dbService: DBService){
        super()
        this._db = dbService
    }

    public async getUsers() : Promise<User[]> {
        const result = await this._db.execQuery("SELECT * FROM users;");
        return result.rows
    }

    public async getUser(id: string) : Promise<User | undefined> {
        const result = await this._db.execQuery(`SELECT * FROM users WHERE id = ${id};`);
        if(!result.rowCount){
            return undefined
        } else {
            const user : User = {
                id: result.rows[0][_USER_ID],
                first_name: result.rows[0][_USER_FNAME],
                last_name: result.rows[0][_USER_LNAME],
                email: result.rows[0][_USER_EMAIL],
                password: result.rows[0][_USER_PWD]
            }
            return user
        }   
    }

    public createUser(newUser: User) : string {
        users.push(newUser)
        return newUser.id
    }

    public updateUser (userID:string, updatedUser: User) : string {
        users = users.map(x => x.id === userID ? { ...x, ...updatedUser } : x)
        return userID
    }

    public deleteUser(id:string) : void {
        users = users.filter(x => x.id !== id)
    }


}