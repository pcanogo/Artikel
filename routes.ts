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

const userService = new UserDB(db)
const itemService = new WordItemDB(db)
const imageService = new WordImageDB(db)

const auth = new AuthController(userService, authService);
const user = new UsersController(userService, itemService, imageService, authService)
const item = new WordItemController(itemService, imageService, authService)
const image = new WordImageController(imageService, authService)



router
.get('/', (ctx:any) => {
    ctx.response.body = 'Hello I am the App 🐻'
})
// AUTH ROUTES
.post(`${API}/auth`, auth.login)
// USER ROUTES
.get(`${API}/users/:id`, auth.authSession, user.checkUserOwner, user.getUser)
.post(`${API}/users`, user.createUser)
.put(`${API}/users/:id`, auth.authSession, user.checkUserOwner, user.updateUser)
.delete(`${API}/users/:id`, auth.authSession, user.checkUserOwner, user.deleteUser)
// ITEM ROUTES
.get(`${API}/items/:id`, auth.authSession, item.checkItemOwner,item.getWordItem)
.post(`${API}/items`, auth.authSession, item.createWordItem)
.put(`${API}/items/:id`, auth.authSession, item.checkItemOwner, item.updateWordItem)
.delete(`${API}/items/:id`, auth.authSession, item.checkItemOwner,item.deleteWordItem)
// USER ITEM ROUTES
.get(`${API}/users/items/:id`, auth.authSession, user.checkUserOwner, item.getUserItems)
.delete(`${API}/users/items/:id`, auth.authSession, user.checkUserOwner, item.deleteUserItems)
// WORDIMAGE ROUTES
.get(`${API}/images/:id`, auth.authSession, image.checkImageOwner,image.getWordImage)
.post(`${API}/images`, auth.authSession, image.createWordImage)
.put(`${API}/images/:id`, auth.authSession, image.checkImageOwner, image.updateWordImage)
.delete(`${API}/images/:id`, auth.authSession, image.checkImageOwner, image.deleteWordImage)
// ITEM IMAGE ROUTES
.get(`${API}/items/images/:id`, auth.authSession, item.checkItemOwner,image.getItemImages)
.delete(`${API}/items/images/:id`, auth.authSession, item.checkItemOwner, image.deleteItemImages)
// USER IMAGE ROUTEs
.get(`${API}/users/images/:id`, auth.authSession, user.checkUserOwner,image.getUserImages)
.delete(`${API}/users/images/:id`, auth.authSession, user.checkUserOwner, image.deleteUserImages)

//ADMIN ROUTES
.get(`${API}/users`, auth.authSession, auth.checkAdmin, user.getUsers)
.get(`${API}/items`, auth.authSession, auth.checkAdmin, item.getWordItems)
.get(`${API}/images`, auth.authSession, auth.checkAdmin, image.getAllWordImages)

export default router