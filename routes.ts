import { Router } from 'https://deno.land/x/oak/mod.ts'
import { UsersController } from './controllers/users_controllers.ts'
import { WordBankController } from './controllers/word_bank_controllers.ts'
import { ItemController } from './controllers/item_controller.ts'

import { UserRAM } from './services/users/users_service_ram.ts'
import { WordBankRAM } from './services/wordbanks/word_bank_ram.ts'
import { ItemRAM } from './services/items/items_ram.ts'

const API = '/api/v1'
const router = new Router()

const userService = new UserRAM ()
const wordBankService = new WordBankRAM()
const itemService = new ItemRAM()

const itenController = new ItemController(itemService)
const wordBankController = new WordBankController(wordBankService)
const userController = new UsersController(userService, wordBankService)


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
// WORDBANK ROUTES
.get(`${API}/wordbanks/:id`, wordBankController.getWordBank)
.post(`${API}/wordbanks`, wordBankController.createWordBank)
.delete(`${API}/wordbanks/:id`, wordBankController.deleteWordBank)
// ITEM ROUTES
.get(`${API}/items/:id`, itenController.getItem)
.post(`${API}/items`, itenController.createItem)
.put(`${API}/items/:id`, itenController.updateItem)
.delete(`${API}/items/:id`, itenController.deleteItem)

export default router