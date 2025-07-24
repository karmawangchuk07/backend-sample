import jwt from "jsonwebtoken";
import { Response,Request, NextFunction } from "express";

export const middleware=async(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.header("authorization")||"";
    if(!authHeader){
        return res.json({
            success:false,
            message:"not authorized to login"
        })
    }
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    try{
        const user=jwt.verify(token,process.env.JWT_SECRET!)as{id:String}
        if(user){
            req.body.userId=user.id
            next()
        } else {
            return res.status(403).json({
                message: "You are not logged in"
            });
        }

    } catch (error) {
        return res.status(403).json({
        message: "You are not logged in"
    })
    }
}

