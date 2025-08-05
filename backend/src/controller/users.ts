import {  Request, Response } from 'express';
import { signinInput, signupInput } from '../zod/zod';
import  jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from 'bcrypt'
import prisma from '../prisma';


export const newUser=async(req:Request,res:Response)=>{
    const body=req.body;
    const {success,data}=signupInput.safeParse(body);
    if(!success){
        console.log("zod error",data)
        return res.status(411).json({
            message:"invalid",
            error:data
        })
    }
    try{
        const{email,password}=data
        const user=await prisma.user.findUnique({where:{email}});
        if (user) {
            return res.status(401).json({ message: "email already registered before" });
        }
        const hashed=await bcrypt.hash(password,5)
        const User=await prisma.user.create({
            data:{
                name:body.name,
                email:body.email,
                password:hashed
            }
        })
        const token=jwt.sign({
            userId: User.id
        },process.env.JWT_SECRET!)

        return res.json({
            success:true,
            token
        })

    }catch(error){
        console.log(error);
        res.status(411)
        return res.json("invalid")
    }
}


export const login=async(req:Request,res:Response)=>{
    const body= req.body;
    const {success,data}=signinInput.safeParse(body);
    if(!success){
        res.status(411);
        return res.json({
            message:"Inputs are invalid"
        })
    }
    const {email,password}=data;
    try{
        const user=await prisma.user.findUnique({
            where:{
                email:body.email,
            }
        })
        if(!user){
            res.status(403);
            return res.json({
                message:"Incorrect creds"
            })
        }

        const ispassword=await bcrypt.compare(password,user.password)

        if(!ispassword){
            return res.json({
                message:"invalid password or email"
            })
        }

        const token=jwt.sign({
            userId:user.id
        },process.env.JWT_SECRET!)

        return res.json({
            token
        })}catch(error){
            console.log(error);
            res.status(411)
            return res.json("Invalid")
        }
}
