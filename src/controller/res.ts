import { Response,Request } from "express"
import prisma from "../prisma"

export const restaurant=async(req:Request,res:Response)=>{
    const{name,location}=req.body

    if(!name||!location){
        return res.json({message:"invalid name of the resturant"})
    }
    try{
        const existing=await prisma.restaurant.findFirst({
            where:{
                name:name,
                location:location
            }
        })
        if(existing){
            return res.json({message:"restaurant already exists woth this name"})
        }
        const newRestaurant=await prisma.restaurant.create({
            data:{
                name:name,
                location:location
            }
        })
        return res.json({message:"created successfully",resturant:newRestaurant})
    }catch(err){
        console.error("Error creating res",err)
        return res.status(500).json({
            messsage:"unsuccessful",
        })
    }
}

export const getAllRestaurant=async(req:Request,res:Response)=>{
    try{
        const restaurant=await prisma.restaurant.findMany({
            include:{
                review:true,
                menu:true
            }
        })

        const constraint=restaurant.map(rest=>({
            name:rest.name,
            location:rest.location,

        }))
        return res.json({message:"successfully retrived",
            restaurant:constraint
        })

    }
    catch(err){
        return res.json({message:"unable to retrive the retaurant"})
    }
}


export const getbyId=async(req:Request,res:Response)=>{
    const{id}=req.params
    try{
        const byid=await prisma.restaurant.findUnique({
            where:{
                id
            },
            include:{
                review:true,
                menu:true
            }
        })
        if(!byid){
            return res.json({message:"restaurant not found"})
        }
        return res.json({message:"sucessfully retrived the restaurant of this ID",
            restaurant:{
                id:byid.id,
                name:byid.name,
                location:byid.location,
                menu:byid.menu,
                review:byid.review
            }

        })
    }
    catch(err){
        console.error("Error while fetching the restaurant",err)
        return res.status(500).json({message:"unsucessful "})
    }
}