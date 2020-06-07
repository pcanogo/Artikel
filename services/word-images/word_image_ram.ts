import { WordImage } from '../../types.ts'
import {WordImageService} from './word_image_service.ts'

let wordImages: WordImage[] = [
    {
        id: '1',
        item_id:'1',
        user_id: '1',
        url: 'url1'
    },
    {
        id: '2',
        item_id:'1',
        user_id: '1',
        url: 'url2'
    },
    {
        id: '3',
        item_id:'2',
        user_id: '1',
        url: 'url3'
    },
    {
        id: '4',
        item_id:'2',
        user_id: '1',
        url: 'url4'
    },
    {
        id: '5',
        item_id:'2',
        user_id: '1',
        url: 'url5'
    },
    {
        id: '6',
        item_id:'3',
        user_id: '1',
        url: 'url6'
    },
    {
        id: '7',
        item_id:'4',
        user_id: '3',
        url: 'url7'
    },
    {
        id: '8',
        item_id:'4',
        user_id: '3',
        url: 'url8'
    },
    {
        id: '9',
        item_id:'5',
        user_id: '3',
        url: 'url9'
    },
    {
        id: '10',
        item_id:'5',
        user_id: '3',
        url: 'url10'
    },
    {
        id: '11',
        item_id:'5',
        user_id: '3',
        url: 'url11'
    }
]

export class WordImageRAM extends WordImageService {
    constructor() {
        super()
    }

    public getWordImage(id: string) : WordImage | undefined {
        const wordImage: WordImage | undefined = wordImages.find(x => x.id === id)
        return wordImage
    }
    
    public createWordImage(newWordImage: WordImage) : string {
        wordImages.push(newWordImage)
        return newWordImage.id
    }

    public editWordImage(id: string, updatedWordImage: WordImage) : string {
        wordImages = wordImages.map(x => x.id === id ? { ...x, ...updatedWordImage } : x)
        return id
    }

    public deleteWordImage(id: string) : void {
        wordImages = wordImages.filter(x => x.id !== id )
    }

    public getAllWordImages() : WordImage[] {
        return wordImages
    }

    public getItemImages(itemId: string) : WordImage[] {
        const itemImages = wordImages.filter(x => x.item_id !== itemId )
        return itemImages
    }

    public getItemImagesURL(itemId: string) : string[] {
        let itemImagesURL: string[] = []
        wordImages
            .filter(x => x.item_id === itemId)
            .map(x=> itemImagesURL.push(x.url))
        return itemImagesURL
    }

    public deleteItemImages(itemId: string) : void { 
        wordImages = wordImages.filter(x => x.item_id !== itemId)
    }

    public deleteUserItemImages(userId: string) : void {
        wordImages = wordImages.filter(x => x.user_id !== userId)
    }
}