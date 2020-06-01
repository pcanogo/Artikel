import { ctx, WordBank } from '../types.ts'
import { WordBankService } from '../services/wordbanks/word_bank_service.ts'

export class WordBankController {
    private wordBankService: WordBankService

    constructor (wordBankService : WordBankService){
        this.wordBankService = wordBankService
    }

    //getWordBank
    public getWordBank = ({params, response} : ctx) => {
        const wordBank = this.wordBankService.getWordBank(params.id)
        if(!wordBank){
            //error
            response.status = 404
            response.body = {
                success: false,
                msg: 'WordBank not found'
            }
        } else {
            response.status = 200
            response.body = {
                success: true,
                data: wordBank
            }
        }
    }

    //createWordBank
    public createWordBank = async ({request, response} : ctx) => {
        const body = await request.body()
        if(!request.hasBody){
            response.status = 400
            response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
            const newWordBankID = this.wordBankService.createWordBank(body.value.id)
            response.body = {
                success: true,
                msg: `Created wordbank with ID ${newWordBankID}`
            }
        }

    } 

    //deleteWordBank
    public deleteWordBank = ({params, response} : ctx) => {
        this.wordBankService.deleteWordBank(params.id)
        response.body = {
            success: true,
            msg: `Deleted word bank with ID ${params.id}`
        }
    }

}

