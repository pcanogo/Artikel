import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getUsers, getUser} from './controllers/users.ts'

const router = new Router()

router.get('/', (ctx:any) => {
    ctx.response.body = 'Hello I am the App 🐻'
})

router
.get('/api/v1/users', getUsers)
.get('/api/v1/user/:id', getUser)


export default router