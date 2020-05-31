import { Router } from 'https://deno.land/x/oak/mod.ts'
import { UsersController } from './controllers/users.ts'
import { UserRAM } from './services/users/users_ram.ts'

const router = new Router()

const userService = new UserRAM ()
const userController = new UsersController(userService)


router
.get('/', (ctx:any) => {
    ctx.response.body = 'Hello I am the App 🐻'
})
.get('/api/v1/users', userController.getUsers)
.get('/api/v1/user/:id', userController.getUser)
.post('/api/v1/users', userController.addUser)
.put('/api/v1/user/:id', userController.editUser)
.delete('/api/v1/user/:id', userController.deleteUser)


export default router