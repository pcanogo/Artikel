import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getUsers, getUser, addUser, editUser, deleteUser} from './controllers/users.ts'

const router = new Router()

router
.get('/', (ctx:any) => {
    ctx.response.body = 'Hello I am the App 🐻'
})
.get('/api/v1/users', getUsers)
.get('/api/v1/user/:id', getUser)
.post('/api/v1/users', addUser)
.put('/api/v1/user/:id', editUser)
.delete('/api/v1/user/:id', deleteUser)


export default router