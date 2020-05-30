import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import router from './routes.ts'

const env = Deno.env.toObject()
const HOST = env.HOST || '127.0.0.1'
const PORT = env.PORT || 8000
const app = new Application()

app.use(router.routes());  
app.use(router.allowedMethods());

console.info(`Listening on port ${PORT} 🦍`)

await app.listen(`${HOST}:${PORT}`);