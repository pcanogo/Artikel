import { WordImage } from '../../types.ts'

export abstract class WordImageService {

    abstract getWordImage(id: string) : WordImage | undefined
    abstract createWordImage(newWordImage: WordImage) : string
    abstract editWordImage(id: string, updatedWordImage: WordImage) : string
    abstract deleteWordImage(id: string) : void

    abstract getAllWordImages() : WordImage[]
    abstract getItemImages(itemId: string) : WordImage[] 
    abstract getItemImagesURL(itemId: string) : string[]
    abstract deleteItemImages(itemId: string) : void
    abstract deleteUserItemImages(userId: string) : void
}