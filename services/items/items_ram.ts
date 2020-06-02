import {Item} from '../../types.ts'
import {ItemService} from './items_service.ts'

let items : Item[] = [
    {   
        id: 'itemID1',
        wordBank_id: '1',
        word: 'item1',
        translation: 'articulo1',
        imgs: [
            'urla',
            'urlb',
        ]
    },
    {   
        id: 'itemID2',
        wordBank_id: '1',
        word: 'item2',
        translation: 'articulo2',
        imgs: [
            'urlc',
            'urld',
            'urle',
        ]
    },
    {   
        id: 'itemID3',
        wordBank_id: '1',
        word: 'item3',
        translation: 'articulo3',
        imgs: [
            'urlf',
        ]
    },
    {   
        id: 'itemID4',
        wordBank_id: '3',
        word: 'item4',
        translation: 'articulo14',
        imgs: [
            'url4a',
            'url4b',
        ]
    },
    {   
        id: 'itemID5',
        wordBank_id: '3',
        word: 'item5',
        translation: 'articulo5',
        imgs: [
            'url5a',
            'url5b',
            'url5c'
        ]
    },
]

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
        let item = this.getItem(itemID)
        if(item){
            item.word = updatedItem.word ? updatedItem.word : item.word 
            item.translation = updatedItem.translation ? updatedItem.translation : item.translation 
            item.imgs = [...item.imgs, ...updatedItem.imgs]       
        }
        // items = items.map(x => x.id === itemID ? { ...x, ...updatedItem } : x)
        return itemID
    }

    public deleteItem(id:string) : void {
        items = items.filter(x => x.id !== id)
    }

}