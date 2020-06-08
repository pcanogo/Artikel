import { Client } from "https://deno.land/x/postgres/mod.ts"
import { QueryResult } from "https://deno.land/x/postgres/query.ts"

export class DBService {
    private _client:Client
    constructor(_dbConfigs:Object){
        this._client = new Client(_dbConfigs)
    }

    public async execQuery(query_string:string) : Promise<QueryResult> {
        try{
            await this._client.connect()
            const result = await this._client.query(query_string)
            return result
        } catch (error){
            throw new Error(error) 
        } finally {
            await this._client.end()
        }
    }
}