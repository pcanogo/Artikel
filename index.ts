import { Application, isHttpError } from "https://deno.land/x/oak/mod.ts";
import { green, cyan, bold, yellow} from "https://deno.land/std@0.54.0/fmt/colors.ts";
import { APP_HOST, APP_PORT } from "./config.js";
import router from './routes.ts'

const app = new Application()

// Logger
app.use(async (context, next) => {
    await next();
    const rt = context.response.headers.get("X-Response-Time");
    console.log(
      `${green(context.request.method)} ${cyan(context.request.url.pathname)} - ${
        bold(
          String(rt),
        )
      }`,
    );
  });

  // Error handler
app.use(async (context, next) => {
    try {
      await next();
    } catch (err) {
      if (isHttpError(err)) {
        context.response.status = err.status;
        const { message, status, stack } = err;
        if (context.request.accepts("json")) {
          context.response.body = { message, status, stack };
          context.response.type = "json";
        } else {
          context.response.body = `${status} ${message}\n\n${stack ?? ""}`;
          context.response.type = "text/plain";
        }
      } else {
        console.log(err);
        throw err;
      }
    }
  });

app.use(router.routes());  
app.use(router.allowedMethods());

console.info(`Listening on port ${APP_PORT} 🦍`)

await app.listen(`${APP_HOST}:${APP_PORT}`);