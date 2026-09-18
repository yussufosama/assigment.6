import { Router } from "express"
import { create_log } from "./log.service.js"
const router = Router()

router.post("/add-log",async(req,res)=>{
    let data= await create_log(req.body)
    res.json(data)
})







export default router
