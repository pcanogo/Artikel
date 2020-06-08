import { Router } from 'https://deno.land/x/oak/mod.ts'
import { Client } from "https://deno.land/x/postgres/mod.ts"
import { DBService } from './db/db.ts'
import { configs } from './config.ts'
import { UsersController } from './controllers/users_controllers.ts'
import { WordImageController } from './controllers/word_image_controllers.ts'
import { WordItemController } from './controllers/word_item_controller.ts'

import { UserDB } from './services/users/users_service_db.ts'
import { WordImageRAM } from './services/word-images/word_image_ram.ts'
import { WordItemRAM } from './services/word-items/word_item_ram.ts'


const API = '/api/v1'
const router = new Router()
const db = new DBService(configs['local'])


const wordImageService = new WordImageRAM()
const itemService = new WordItemRAM()
const userService = new UserDB(db)

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
// WORDIMAGE ROUTES
.get(`${API}/wordimages`, wordImageController.getAllWordImages)
.get(`${API}/wordimages/:id`, wordImageController.getWordImage)
.post(`${API}/wordimages`, wordImageController.createWordImage)
.put(`${API}/wordimages/:id`, wordImageController.updateWordImage)
.delete(`${API}/wordimages/:id`, wordImageController.deleteWordImage)

export default router