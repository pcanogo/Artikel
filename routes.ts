import { Router } from 'https://deno.land/x/oak/mod.ts'
import { Client } from "https://deno.land/x/postgres/mod.ts"
import { DBService } from './db/db.ts'
import { configs } from './config.ts'
import { UsersController } from './controllers/users_controllers.ts'
import { WordImageController } from './controllers/word_image_controllers.ts'
import { WordItemController } from './controllers/word_item_controller.ts'

import { UserDB } from './services/users/users_service_db.ts'
import { WordImageDB } from './services/word-images/word_image_db.ts'
import { WordItemDB } from './services/word-items/word_item_db.ts'

import { UserRAM } from './services/users/users_service_ram.ts'
// import { WordImageRAM } from './services/word-images/word_image_ram.ts'
// import { WordItemRAM } from './services/word-items/word_item_ram.ts'


const API = '/api/v1'
const router = new Router()
const db = new DBService(configs['local'])


const wordImageService = new WordImageDB(db)
const itemService = new WordItemDB(db)
const userService = new UserRAM

const itemController = new WordItemController(itemService, wordImageService)
const wordImageController = new WordImageController(wordImageService)
const userController = new UsersController(userService, itemService, wordImageService)


router
.get('/', (ctx:any) => {
    ctx.response.body = 'Hello I am the App 🐻'
})
// USER ROUTES
.get(`${API}/users`, userController.getUsers)
.get(`${API}/users/:id`, userController.getUser)
.post(`${API}/users`, userController.createUser)
.put(`${API}/users/:id`, userController.updateUser)
.delete(`${API}/users/:id`, userController.deleteUser)
// ITEM ROUTES
.get(`${API}/items`, itemController.getWordItems)
.get(`${API}/items/:id`, itemController.getWordItem)
.post(`${API}/items`, itemController.createWordItem)
.put(`${API}/items/:id`, itemController.updateWordItem)
.delete(`${API}/items/:id`, itemController.deleteWordItem)
// USER ITEM ROUTES
.get(`${API}/users/items/:id`, itemController.getUserItems)
.delete(`${API}/users/items/:id`, itemController.deleteUserItems)
// WORDIMAGE ROUTES
.get(`${API}/images`, wordImageController.getAllWordImages)
.get(`${API}/images/:id`, wordImageController.getWordImage)
.post(`${API}/images`, wordImageController.createWordImage)
.put(`${API}/images/:id`, wordImageController.updateWordImage)
.delete(`${API}/images/:id`, wordImageController.deleteWordImage)
// ITEM IMAGE ROUTES
.get(`${API}/items/images/:id`, wordImageController.getItemImages)
.delete(`${API}/items/images/:id`, wordImageController.deleteItemImages)
// USER IMAGE ROUTE 
.get(`${API}/users/images/:id`, wordImageController.getUserImages)
.delete(`${API}/users/images/:id`, wordImageController.deleteUserImages)

export default router