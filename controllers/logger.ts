import { green, cyan, bold} from "https://deno.land/std@0.54.0/fmt/colors.ts";

export default async (context:any, next:any) => {
    await next();
    const rt = context.response.headers.get("X-Response-Time");
    console.log(
      `${green(context.request.method)} ${cyan(context.request.url.pathname)} - ${
        bold(
          String(rt),
        )
      }`,
    );
  }