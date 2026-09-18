import { author_model } from "../../main.js"





export const add_author= async (body)=>{
    let {name , nationality}=body
    const result = await author_model.insertOne({name,nationality})
    return {
        name,
        nationality
    }
}
