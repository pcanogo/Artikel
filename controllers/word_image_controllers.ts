import { ctx, WordImage } from '../types.ts'
import { WordImageService } from '../services/word-images/word_image_service.ts'

export class WordImageController {
    private wordImageService: WordImageService

    constructor (wordImageService : WordImageService){
        this.wordImageService = wordImageService
    }

    public getAllWordImages = ({ response } : ctx) => {
        response.body = {
            success: true,
            data: this.wordImageService.getAllWordImages()
        }
    }


    //getWordImage
    public getWordImage = ({params, response} : ctx) => {
        const wordImage = this.wordImageService.getWordImage(params.id)
        if(!wordImage){
            //error
            response.status = 404
            response.body = {
                success: false,
                msg: 'WordImage not found'
            }
        } else {
            response.status = 200
            response.body = {
                success: true,
                data: wordImage
            }
        }
    }

    //createWordImage
    public createWordImage = async ({request, response} : ctx) => {
        const body = await request.body()
        if(!request.hasBody){
            response.status = 400
            response.body = {
                success: false,
                msg: "No Data"
            }
        } else {
            const newWordImageID = this.wordImageService.createWordImage(body.value)
            response.body = {
                success: true,
                msg: `Created wordimage with ID ${newWordImageID}`
            }
        }

    } 

    public updateWordImage = async ( {params, request, response} : ctx ) => {
        const body = await request.body()
        const wordImage = this.wordImageService.getWordImage(params.id)
    
        if(!wordImage){
            response.status = 404
            response.body = {
                success: false,
                msg: 'No wordImage found'
            }
        } else {
            const updatedImageID = this.wordImageService.editWordImage(wordImage.id, body.value)
            response.status = 200
            response.body = {
                success: true,
                data: `Updated wordImage with ID ${updatedImageID}`
            }
        }
    }

    //deleteWordImage
    public deleteWordImage = ({params, response} : ctx) => {
        this.wordImageService.deleteWordImage(params.id)
        response.body = {
            success: true,
            msg: `Deleted word image with ID ${params.id}`
        }
    }

}

