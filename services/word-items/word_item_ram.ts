import {WordItem, WordImage} from '../../types.ts'
import {WordItemService} from './word_item_service.ts'

let wordItems : WordItem[] = [
    {    
        id: '1',
        user_id: '1',
        word: 'item1',
        translation: 'articulo1'
    },
    {   
        id: '2',
        user_id: '1',
        word: 'item2',
        translation: 'articulo2',
    },
    {   
        id: '3',
        user_id: '1',
        word: 'item3',
        translation: 'articulo3',

    },
    {   
        id: '4',
        user_id: '3',
        word: 'item4',
        translation: 'articulo4',
    },
    {   
        id: '5',
        user_id: '3',
        word: 'item5',
        translation: 'articulo5',
    },
]

export class WordItemRAM extends WordItemService {
    constructor() {
        super()
    }

    public createWordItem(newItem: WordItem) : string {
        wordItems.push(newItem)
        return newItem.id
    }

    public getWordItem(itemID: string) : WordItem | undefined {
        const item: WordItem | undefined = wordItems.find(x => x.id === itemID)
        return item
    }

    public updateWordItem (itemID:string, updatedWordItem: WordItem) : string {
        wordItems = wordItems.map(x => x.id === itemID ? { ...x, ...updatedWordItem } : x)    
        return itemID
    }

    public deleteWordItem(id:string) : void {
        wordItems = wordItems.filter(x => x.id !== id)
    }

    public getAllWordItems() : WordItem[] {
        return wordItems
    }

    public getUserItems( userID: string ) : WordItem[] {
        const userItems = wordItems.filter(x => x.user_id !== userID )
        return userItems
    }

    public deleteUserItems(userId:string) : void {
        wordItems = wordItems.filter(x => x.user_id !== userId)
    }

    public getUserID(itemID:string): string | undefined{
        const item : any = wordItems.find(x => x.id === itemID)
        return item.user_id
    }
}