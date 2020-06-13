import { WordImage } from '../../types.ts'

export abstract class WordImageService {

    abstract getWordImage(id: string) : WordImage | undefined | Promise<WordImage | undefined>
    abstract createWordImage(newWordImage: WordImage) : string | Promise<string>
    abstract editWordImage(id: string, updatedWordImage: WordImage) : string | Promise<string>
    abstract deleteWordImage(id: string) : void | Promise<void>

    abstract getAllWordImages() : WordImage[] | Promise<WordImage[]>
    abstract getItemImages(itemId: string) : WordImage[] | Promise<WordImage[]>
    abstract getItemImagesURL(itemId: string) : string[] | Promise<string[]>
    abstract deleteItemImages(itemId: string) : void | Promise<void>

    abstract getUserItemImages(userId: string) : WordImage[] | Promise<WordImage[]>
    abstract deleteUserItemImages(userId: string) : void | Promise<void>
}