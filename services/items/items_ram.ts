import { Item } from '../../types.ts'

export abstract class ItemService {

    abstract createItem(newItem: Item) : string
    abstract getItem(itemID: string) : Item | undefined
    abstract updateItem(itemID: string, updatedItem: Item) : string
    abstract deleteItem(itemID: string) : void
}   