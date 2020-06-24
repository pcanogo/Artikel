import { config } from "https://deno.land/x/dotenv/mod.ts";

export const APP_HOST = config().APP_HOST || "127.0.0.1";
export const APP_PORT = config().APP_PORT || 8000;

export const configs = {
    'local': {
        user: config().LOCAL_DB_USER, 
        database: config().LOCAL_DB_NAME, 
        hostname: config().LOCAL_DB_HOST, 
        port: parseInt(config().LOCAL_DB_PORT), 
        password: config().LOCAL_DB_PASSWORD,
        secret_key: config().SECRET_KEY
    },  
}
