import { ctx, Item } from '../types.ts'
import { ItemService } from '../services/items/items_service.ts'
import { WordBankService } from '../services/wordbanks/word_bank_service.ts'

export class ItemController {
    public itemService: ItemService
    public wordBankService: WordBankService

    constructor (
        itemService : ItemService,
        wordBankService: WordBankService
        ){
        this.itemService = itemService
        this.wordBankService = wordBankService
    }

    //createItem
    public createItem = async ({request, response} : ctx) => {
        const body = await request.body()
        if(!request.hasBody){
            response.status = 400
            response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
            const newItemID = this.itemService.createItem(body.value)
            this.wordBankService.addItem(body.value.wordBank_id, newItemID)
            response.body = {
                success: true,
                msg: `Created item with ID ${newItemID}`
            }
        }

    } 

    //getItem
    public getItem = ({params, response} : ctx) => {
        const item = this.itemService.getItem(params.id)
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

    public updateItem = async ( {params, request, response} : ctx ) => {
        const body = await request.body()
        const item = this.itemService.getItem(params.id)
    
        if(!item){
            response.status = 404
            response.body = {
                success: false,
                msg: 'Item not found'
            }
        } else {
            const updatedItemID = this.itemService.updateItem(item.id, body.value)
            response.status = 200
            response.body = {
                success: true,
                data: `Updated item with ID ${updatedItemID}`
            }
        }
    }

    //deleteItem
    public deleteItem = ({params, response} : ctx) => {
        const item = this.itemService.getItem(params.id)
        if(!item){
            response.status = 404
            response.body = {
                success: false,
                msg: 'Item not found'
            }
        } else{
            this.wordBankService.removeItem(item.wordBank_id, item.id)
            this.itemService.deleteItem(item.id)
            response.body = {
                success: true,
                msg: `Deleted item with ID ${params.id}`
            }
        }
    }

}

