import {WordItem} from '../../types.ts'
import {WordItemService} from './word_item_service.ts'
import {DBService} from '../../db/db.ts'

const ITEM_ID = 0
const USER_ID = 1
const WORD = 2
const TRANSLATION = 3

export class WordItemDB extends WordItemService {
    private _db : DBService

    constructor(dbService: DBService){
        super()
        this._db = dbService
    }

    public async getAllWordItems() : Promise<WordItem[]> {
        const result = await this._db.execQuery('SELECT * FROM word_items;')
        return result.rows
    }

    public async getWordItem(id: string) : Promise<WordItem | undefined> {
        const result = await this._db.execQuery('SELECT * FROM word_items WHERE id = $1;', [id])
        if(!result.rowCount){
            return undefined
        } else {
            const item : WordItem = {
                id: result.rows[0][ITEM_ID],
                user_id: result.rows[0][USER_ID],
                word: result.rows[0][WORD],
                translation: result.rows[0][TRANSLATION],
            }
            return item
        }   
    }

    public async createWordItem(newItem: WordItem) : Promise<string> {
        const result = await this._db.execQuery(`
        INSERT INTO word_items (user_id, word, translation)
        VALUES ($1,$2,$3)
        RETURNING id;`,
        [newItem.user_id, newItem.word, newItem.translation]
        );
        return result.rows[0][ITEM_ID]
    }

    public async updateWordItem (itemID:string, item: WordItem) : Promise<string> {

        let query = 'UPDATE word_items '
        let hasSet = false

        if(item.word!==undefined){
            if(!hasSet) query += 'SET '
            query += `
                word = '${this._db.cleanString(item.word)}' `
                + (item.translation !== undefined ? ", " : "")
            hasSet = true
        }
        if(item.translation!==undefined){
            if(!hasSet) query += 'SET '
            query += `
                translation = '${this._db.cleanString(item.translation)}' `
            hasSet = true
        }

        query += `
        WHERE id=${this._db.cleanString(itemID)} RETURNING id;`
        console.log(query)
        await this._db.execQuery(query)
        return itemID
    }

    public async deleteWordItem(id:string) : Promise<void> {
        await this._db.execQuery(`
        DELETE FROM word_items
        WHERE id=$1;`,
        [id])
    }

    public async getUserItems(userID: string) : Promise<WordItem[] | undefined> {
        let user_items : WordItem[] = []
        const result = await this._db.execQuery('SELECT * FROM word_items WHERE user_id = $1;', [userID])
        if(!result.rowCount){
            return undefined
        } else {
            result.rows.map( (row, i) =>
                user_items[i] = {
                    id: row[ITEM_ID],
                    user_id: row[USER_ID],
                    word: row[WORD],
                    translation: row[TRANSLATION]
                }
            )
            return user_items
        }  
    }

    public async deleteUserItems(userID: string) : Promise<void> {
        await this._db.execQuery(`
        DELETE FROM word_items
        WHERE user_id=$1;`,
        [userID])

    }
}