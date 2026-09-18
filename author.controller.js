import { Router } from "express"
import { add_author } from "./author.service.js"

const router = Router()
router.post("/add-author", async (req,res)=>{
    let data = await add_author(req.body)
    res.json(data)
})

export default router
