import { Client } from "https://deno.land/x/postgres/mod.ts"
import { QueryResult } from "https://deno.land/x/postgres/query.ts"

export class DBService {
    private _client:Client
    constructor(_dbConfigs:Object){
        this._client = new Client(_dbConfigs)
    }

    public async execQuery(query_string:string) : Promise<QueryResult> {
        let result
        try{
            await this._client.connect()
            result = await this._client.query(query_string)
        } catch (error){
            result = error
        } finally {
            await this._client.end()
            return result
        }
    }
}