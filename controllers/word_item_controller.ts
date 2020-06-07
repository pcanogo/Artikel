import { ctx, WordItem } from '../types.ts'
import { WordItemService } from '../services/word-items/word_item_service.ts'
import { WordImageService } from '../services/word-images/word_image_service.ts'

export class WordItemController {
    public itemService: WordItemService
    public wordImageService: WordImageService

    constructor (
        itemService : WordItemService,
        wordImageService: WordImageService
        ){
        this.itemService = itemService
        this.wordImageService = wordImageService
    }

    public getWordItems = ({ response } : ctx) => {
        response.body = {
            success: true,
            data: this.itemService.getAllWordItems()
        }
    }

    //createWordItem
    public createWordItem = async ({request, response} : ctx) => {
        const body = await request.body()
        if(!request.hasBody){
            response.status = 400
            response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
            const newWordItemID = this.itemService.createWordItem(body.value)
            response.body = {
                success: true,
                msg: `Created item with ID ${newWordItemID}`
            }
        }

    } 

    //getWordItem
    public getWordItem = ({params, response} : ctx) => {
        const item = {
            ...this.itemService.getWordItem(params.id),
            img_urls: [...this.wordImageService.getItemImagesURL(params.id)]
        }

        if(!item){
            //error
            response.status = 404
            response.body = {
                success: false,
                msg: 'item not found'
            }
        } else {
            response.status = 200
            response.body = {
                success: true,
                data: item
            }
        }
    }

    public updateWordItem = async ( {params, request, response} : ctx ) => {
        const body = await request.body()
        const item = this.itemService.getWordItem(params.id)
    
        if(!item){
            response.status = 404
            response.body = {
                success: false,
                msg: 'WordItem not found'
            }
        } else {
            const updatedWordItemID = this.itemService.updateWordItem(item.id, body.value)
            response.status = 200
            response.body = {
                success: true,
                data: `Updated item with ID ${updatedWordItemID}`
            }
        }
    }

    //deleteWordItem
    public deleteWordItem = ({params, response} : ctx) => {
        const item = this.itemService.getWordItem(params.id)
        if(!item){
            response.status = 404
            response.body = {
                success: false,
                msg: 'WordItem not found'
            }
        } else{
            this.wordImageService.deleteItemImages(item.id)
            this.itemService.deleteWordItem(item.id)
            response.body = {
                success: true,
                msg: `Deleted item with ID ${params.id}`
            }
        }
    }

}

