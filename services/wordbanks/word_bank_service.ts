import { WordBank } from '../../types.ts'

export abstract class WordBankService {

    abstract getWordBank(id: string) : WordBank | undefined
    abstract createWordBank(newWordBankID: string) : string
    // abstract editWordBank(id: string, updatedWordBank: WordBank) : string
    abstract deleteWordBank(id: string) : void
    
    abstract addItem(wordBankID: string, itemID: string): void
    abstract removeItem(wordBankID: string, itemID: string): void
}