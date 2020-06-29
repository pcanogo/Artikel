import {User} from '../../types.ts'
import {UsersService} from './users_service.ts'
import {DBService} from '../../db/db.ts'

const USER_ID = 0
const FIRST_NAME = 1
const LAST_NAME = 2
const EMAIL = 3
const PWD = 4
const TYPE = 6

export class UserDB extends UsersService {
    private _db : DBService

    constructor(dbService: DBService){
        super()
        this._db = dbService
    }

    public async getUsers() : Promise<User[]> {
        const result = await this._db.execQuery('SELECT * FROM users;');
        return result.rows
    }

    public async getUser(id: string) : Promise<User | undefined> {
        const result = await this._db.execQuery('SELECT * FROM users WHERE id = $1;', [id])
        if(!result.rowCount){
            return undefined
        } else {
            const user : User = {
                id: result.rows[0][USER_ID],
                first_name: result.rows[0][FIRST_NAME],
                last_name: result.rows[0][LAST_NAME],
                email: result.rows[0][EMAIL],
                password: result.rows[0][PWD],
                type: result.rows[0][TYPE]
            }
            return user
        }   
    }

    public async createUser(newUser: User) : Promise<string> {
        const result = await this._db.execQuery(`
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1,$2,$3,$4)
        RETURNING id;`,
        [newUser.first_name, newUser.last_name, newUser.email, newUser.password]
        );
        return result.rows[0][USER_ID]
    }

    public async updateUser (userID:string, user: User) : Promise<string> {

        let query = 'UPDATE users '
        let hasSet = false

        if(user.first_name!==undefined){
            if(!hasSet) query += 'SET '
            query += `
                first_name = '${this._db.cleanString(user.first_name)}' `
                + (user.last_name !== undefined ? ", " : "")
            hasSet = true
        }
        if(user.last_name!==undefined){
            if(!hasSet) query += 'SET '
            query += `
                last_name = '${this._db.cleanString(user.last_name)}' `
                + (user.email !== undefined ? ", " : "")
            hasSet = true
        }
        if(user.email!==undefined){
            if(!hasSet) query += 'SET '
            query += `
                email = '${this._db.cleanString(user.email)}' `
        }

        query += `
        WHERE id=${this._db.cleanString(userID)} RETURNING id;`
        console.log(query)
        const result = await this._db.execQuery(query)
        return result.rows[0][USER_ID]
    }

    public async deleteUser(id:string) : Promise<void> {
        await this._db.execQuery(`
        DELETE FROM users
        WHERE id=$1;`,
        [id]
        );
    }

    public async getUserByEmail(email: string) : Promise<User | undefined> {
        const result = await this._db.execQuery('SELECT * FROM users WHERE email = $1;', [email])
        if(!result.rowCount){
            return undefined
        } else {
            const user : User = {
                id: result.rows[0][USER_ID],
                first_name: result.rows[0][FIRST_NAME],
                last_name: result.rows[0][LAST_NAME],
                email: result.rows[0][EMAIL],
                password: result.rows[0][PWD]
            }
            return user
        }   
    }
}