import { WordItem, WordImage } from '../../types.ts'

export abstract class WordItemService {

    
    abstract createWordItem(newWordItem: WordItem) : string
    abstract getWordItem(wordItemID: string) : WordItem | undefined
    abstract updateWordItem(wordItemID: string, updatedWordItem: WordItem) : string
    abstract deleteWordItem(wordItemID: string) : void

    abstract getAllWordItems() : WordItem[]
    abstract getUserItems(userID: string) : WordItem[]
    abstract deleteUserItems(userID: string) : void
}   