import { WordBank } from '../../types.ts'

export abstract class WordBankService {

    abstract getWordBank(id: string) : WordBank | undefined
    abstract addWordBank(newWordBankID: string) : string
    // abstract editWordBank(id: string, updatedWordBank: WordBank) : string
    abstract deleteWordBank(id: string, user_id: string) : void
}