import {WordImage} from '../../types.ts'
import {WordImageService} from './word_image_service.ts'
import {DBService} from '../../db/db.ts'

const IMG_ID = 0
const ITEM_ID = 1
const USER_ID = 2
const URL = 3

export class WordImageDB extends WordImageService {
    private _db : DBService
    constructor(dbService: DBService){
        super()
        this._db = dbService
    }

    public async getAllWordImages() : Promise<WordImage[]> {
        const result = await this._db.execQuery('SELECT * FROM word_images;')
        return result.rows 
    }

    public async getWordImage(id: string) : Promise<WordImage | undefined> {
        const result = await this._db.execQuery('SELECT * FROM word_images WHERE id = $1;', [id])
        if(!result.rowCount){
            return undefined
        } else {
            const image : WordImage = {
                id: result.rows[0][IMG_ID],
                item_id: result.rows[0][ITEM_ID],
                user_id: result.rows[0][USER_ID],
                url: result.rows[0][URL],
            }
            return image
        }   
    }

    public async createWordImage(newImage: WordImage) : Promise<string> {
        const result = await this._db.execQuery(`
        INSERT INTO word_images (item_id, user_id, url)
        VALUES ($1,$2,$3)
        RETURNING id;`,
        [newImage.item_id, newImage.user_id, newImage.url]
        )
        return result.rows[0][0]
    }

    public async editWordImage(id: string, image: WordImage) : Promise<string> {

        const result = await this._db.execQuery(
            'UPDATE word_images SET url=$1 WHERE id=$2 RETURNING id;', 
            [image.url, id])

        return result.rows[0][0]
    }

    public async deleteWordImage(id:string) : Promise<void> {
        await this._db.execQuery(`
        DELETE FROM word_images
        WHERE id=$1;`,
        [id])
    }


    public async getItemImagesURL(itemId: string) : Promise<string[]> {
        const result = await this._db.execQuery('SELECT url FROM word_images WHERE item_id=$1;', [itemId])
        let imageURL:string[] = []
        result.rows.map(x => imageURL.push(x[0]))
        return imageURL
   
    }

    public async getItemImages(itemId: string) : Promise<WordImage[] | undefined> {
        let item_images : WordImage[] = []
        const result =  await this._db.execQuery(
            'SELECT * FROM word_images WHERE item_id=$1;',
            [itemId]
        )
        if(!result.rowCount){
            return undefined
        } else {
            result.rows.map( (row, i) =>
                item_images[i] = {
                    id: row[IMG_ID],
                    item_id: row[ITEM_ID],
                    user_id: row[USER_ID],
                    url: row[URL]
                }
            )
            return item_images
        }  
    }

    public async deleteItemImages(itemId: string) : Promise<void> {
        await this._db.execQuery(
            'DELETE FROM word_images WHERE item_id=$1;',
            [itemId]
        )
    }

    public async getUserItemImages(userId: string) : Promise<WordImage[] | undefined> {
        let user_images : WordImage[] = []
        const result =  await this._db.execQuery(
            'SELECT * FROM word_images WHERE user_id=$1;',
            [userId]
        )
        if(!result.rowCount){
            return undefined
        } else {
            result.rows.map( (row, i) =>
                user_images[i] = {
                    id: row[IMG_ID],
                    item_id: row[ITEM_ID],
                    user_id: row[USER_ID],
                    url: row[URL]
                }
            )
            return user_images
        }  
    }
    public async deleteUserItemImages(userId: string) : Promise<void> {
        await this._db.execQuery(
            'DELETE FROM word_images WHERE user_id=$1;',
            [userId]
        )
    }

    public async getUserID(imageID: string) : Promise<string> {
        const result = await this._db.execQuery( 'SELECT user_id FROM word_images WHERE id=$1',[imageID])
        const userID: string = result.rows[0][0]
        return userID
    } 

}