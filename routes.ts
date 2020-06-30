import { Router } from 'https://deno.land/x/oak/mod.ts'
import { Client } from "https://deno.land/x/postgres/mod.ts"
import { configs } from './config.ts'
import { DBService } from './db/db.ts'
import {AuthService} from './services/auth-service/auth.ts'

import { AuthController } from './controllers/auth_controllers.ts'
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
const authService = new AuthService(configs['local'].secret_key)

const userService = new UserRAM
const itemService = new WordItemDB(db)
const wordImageService = new WordImageDB(db)

const auth = new AuthController(userService, authService);
const userController = new UsersController(userService, itemService, wordImageService, authService)
const itemController = new WordItemController(itemService, wordImageService, authService)
const wordImageController = new WordImageController(wordImageService)



router
.get('/', (ctx:any) => {
    ctx.response.body = 'Hello I am the App 🐻'
})
// AUTH ROUTES
.post(`${API}/auth`, auth.login)
// USER ROUTES
.get(`${API}/users/:id`, auth.authSession,userController.checkUserOwner, userController.getUser)
.post(`${API}/users`, userController.createUser)
.put(`${API}/users/:id`, auth.authSession, userController.checkUserOwner, userController.updateUser)
.delete(`${API}/users/:id`, auth.authSession, userController.checkUserOwner, userController.deleteUser)
// ITEM ROUTES
.get(`${API}/items/:id`, auth.authSession, itemController.checkItemOwner,itemController.getWordItem)
.post(`${API}/items`, auth.authSession, itemController.createWordItem)
.put(`${API}/items/:id`, auth.authSession, itemController.checkItemOwner, itemController.updateWordItem)
.delete(`${API}/items/:id`, auth.authSession, itemController.checkItemOwner,itemController.deleteWordItem)
// USER ITEM ROUTES
.get(`${API}/users/items/:id`, auth.authSession, userController.checkUserOwner, itemController.getUserItems)
.delete(`${API}/users/items/:id`, auth.authSession, userController.checkUserOwner, itemController.deleteUserItems)
// WORDIMAGE ROUTES
.get(`${API}/images/:id`, auth.authSession, wordImageController.getWordImage)
.post(`${API}/images`, auth.authSession, wordImageController.createWordImage)
.put(`${API}/images/:id`, auth.authSession, wordImageController.updateWordImage)
.delete(`${API}/images/:id`, auth.authSession, wordImageController.deleteWordImage)
// ITEM IMAGE ROUTES
.get(`${API}/items/images/:id`, auth.authSession, itemController.checkItemOwner,wordImageController.getItemImages)
.delete(`${API}/items/images/:id`, auth.authSession, itemController.checkItemOwner, wordImageController.deleteItemImages)
// USER IMAGE ROUTEs
.get(`${API}/users/images/:id`, auth.authSession, userController.checkUserOwner,wordImageController.getUserImages)
.delete(`${API}/users/images/:id`, auth.authSession, userController.checkUserOwner, wordImageController.deleteUserImages)

//ADMIN ROUTES
.get(`${API}/users`, auth.authSession, auth.checkAdmin, userController.getUsers)
.get(`${API}/items`, auth.authSession, auth.checkAdmin, itemController.getWordItems)
.get(`${API}/images`, auth.authSession, auth.checkAdmin, wordImageController.getAllWordImages)

export default router