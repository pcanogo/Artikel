import { WordBank, Item} from '../../types.ts'
import {WordBankService} from './word_bank_service.ts'

let wordBanks: WordBank[] = [
    {
        id: '1',
        items:[
            'itemID1',
            'itemID2',
            'itemID3'
        ]
    },
    {
        id: '2',
        items:[],
    },
    {
        id: '3',
        items:[
            'itemID4',
            'itemID5'
        ]
    }
]

export class WordBankRAM extends WordBankService {
    constructor() {
        super()
    }

    public getWordBank(id: string) : WordBank | undefined {
        const wordBank: WordBank | undefined = wordBanks.find(x => x.id === id)
        return wordBank
    }
    public addWordBank(newWordBankID: string) : string {
        const newWordBank : WordBank = {
            'id': newWordBankID,
            'items': []
        }
        wordBanks.push(newWordBank)
        return newWordBankID
    }

    public deleteWordBank(id: string) : void {
        wordBanks = wordBanks.filter(x => x.id !== id )
    }
}