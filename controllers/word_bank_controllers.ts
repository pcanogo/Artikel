import { ctx } from '../types.ts'
import { WordBankService } from '../services/wordbanks/word_bank_service.ts'

export class WordBankController {
    private wordBankService = WordBankService
    constructor (wordBankService : WordBankService){
        this.wordBankService = WordBankService
    }
}

//getWordBank

//addWordBank

//editWordBank

//deleteWordBank