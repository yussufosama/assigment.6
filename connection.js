import { MongoClient } from "mongodb"
import { env } from "../../config/env.service.js"
import { error } from "node:console"




export const DB_connection = async () => {
    try {
        const uri = env.uri
        const client = new MongoClient(env.uri)
        await client.connect()
        console.log("database connected")
        return client
    } catch {
        console.log(error)
        throw error
    }
}
