
import { Request,Response } from "express"
import prisma from "../prisma"

export const contacts=async(req:Request,res:Response)=>{
    const{name,message,email}=req.body

    try{
        await prisma.contact.create({
            data:{
                name,
                email,
                message
            }
        })
        return res.status(200).json({message:"Contact received"})
    }catch(err){
        console.log(err)
        return res.status(411).json({mesage:"Not able to receive the contact info"})
    }
}