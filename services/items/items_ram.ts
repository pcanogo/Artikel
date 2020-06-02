import {Item} from '../../types.ts'
import {ItemService} from './items_service.ts'

let items : Item[] = []

export class ItemRAM extends ItemService {
    constructor() {
        super()
    }
    
    public createItem(newItem: Item) : string {
        items.push(newItem)
        return newItem.id
    }

    public getItem(itemID: string) : Item | undefined {
        const item: Item | undefined = items.find(x => x.id === itemID)
        return item
    }

    public updateItem (itemID:string, updatedItem: Item) : string {
        items = items.map(x => x.id === itemID ? { ...x, ...updatedItem } : x)
        return itemID
    }

    public deleteItem(id:string) : void {
        items = items.filter(x => x.id !== id)
    }

}