import { Application } from "https://deno.land/x/oak/mod.ts";
import { APP_HOST, APP_PORT } from "./config.js";
import  logger  from './controllers/logger.ts'
import errorHandler from './controllers/error_handler.ts'
import router from './routes.ts'
import _404 from './controllers/404.ts'

const app = new Application()

// Logger
app.use(logger);

  // Error handler
app.use(errorHandler);

app.use(router.routes());  
app.use(router.allowedMethods());

app.use(_404);

console.info(`Listening on port ${APP_PORT} 🦍`)

await app.listen(`${APP_HOST}:${APP_PORT}`);