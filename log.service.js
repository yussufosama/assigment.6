import { log_model } from "../../main.js"





export const create_log = async (body) => {
    const data = await log_model.insertOne(body)
    return body
}
