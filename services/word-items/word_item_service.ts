import { WordItem, WordImage } from '../../types.ts'

export abstract class WordItemService {

    
    abstract createWordItem(newWordItem: WordItem) : string | Promise<string>
    abstract getWordItem(wordItemID: string) : WordItem | undefined | Promise< WordItem | undefined>
    abstract updateWordItem(wordItemID: string, updatedWordItem: WordItem) : string | Promise<string>
    abstract deleteWordItem(wordItemID: string) : void | Promise<void>

    abstract getAllWordItems() : WordItem[] | Promise<WordItem[]>
    abstract getUserItems(userID: string) : WordItem[] | Promise<WordItem[] | undefined>
    abstract deleteUserItems(userID: string) : void | Promise<void>

    abstract getUserID(itemID: string) : string | undefined | Promise<string>
}   