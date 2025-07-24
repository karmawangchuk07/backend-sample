import { Request,Response,NextFunction } from "express";

import prisma from "../prisma";

interface authreq extends Request{
    userId?: string
}

export const createReview=async(req:authreq,res:Response,next:NextFunction)=>{
    const userId=req.userId;
    const{resturantId,comment,ambience,rating}=req.body;

    if(!resturantId||!rating||!comment||!ambience){
        return res.status(411).json({
            message:"invalid inputs or incorrect"
        })
    }

    try{
        const review=await prisma.review.create({
            data:{
                userId:userId!,
                restaurantId:resturantId,
                comment:comment,
                ambience:ambience,
                rating:parseFloat(rating)
            },
        });
        return res.json({message:"created sucessfully",review})
    }
    catch(error){
        console.error("Error creating review",error)
        return res.json({message:"interruted while creating......"})
    }
}