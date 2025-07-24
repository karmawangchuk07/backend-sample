import { Response,Request } from "express"
import prisma from "../prisma";
import { Types } from "mongoose";

export const addmenuitems=async(req:Request,res:Response)=>{
    const {restaurantId,foodItems,price,description}=req.body;
     if (!restaurantId) {
        return res.status(400).json({ 
            message: "Restaurant ID is required" 
        })
    }
     if (!foodItems) {
        return res.status(400).json({ 
            message: "Food item name is required" 
        })
    }

    if(price<=0){
            return res.json({message:"price's cannot be Zero or less than"})
        }

    try{
        const restaurant=await prisma.restaurant.findUnique({
            where:{id:restaurantId}
        })
        if(!restaurant){
            return res.json({message:"restaurant not found"})
        }
        
        const menu=await prisma.menu.create({
            data:{
                foodItems:foodItems,
                price:parseFloat(price),
                description,
                restaurantId:restaurantId
            }
        })
        return res.status(201).json({message:"food added successfully",menu})
    }catch(err){
        return res.status(411).json({
            message:"interrupted during creating",error:err
        })
    }

}

export const getbyMenu=async (req:Request,res:Response)=>{
    const{restaurantId}=req.params
   if (!restaurantId || restaurantId.length !== 24) {
        return res.status(400).json({ 
            message: "Invalid restaurant ID format. ObjectId must be 24 characters long." 
        });
    }
    try{
        const bymenu=await prisma.restaurant.findUnique({
            where:{
                id:restaurantId
            },
            include:{
                menu:true
            }
        })
        if(!bymenu){
            return res.status(404).json({message:"did not find the restaurant you are looking for"})
        }

        return res.status(200).json({
            message:"found",
            bymenu: {
                id: bymenu.id,
                name: bymenu.name,
                location: bymenu.location,
                menuCount: bymenu.menu.length,
                menu: bymenu.menu
            }
        })
    }catch(err){
        return res.status(411).json({
            message:"cannot find the restaurant"
        })
    }
}

export const addMultipleMenuItems = async (req: Request, res: Response) => {
    const { restaurantId, menuItems } = req.body

    if (!restaurantId || !menuItems || !Array.isArray(menuItems)) {
        return res.status(400).json({
            message: "Restaurant ID and menu items array are required"
        })
    }

    try {
        // Verify restaurant exists
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: restaurantId }
        })

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            })
        }

        // Validate all menu items
        for (const item of menuItems) {
            if (!item.name || !item.price || item.price <= 0) {
                return res.status(400).json({
                    message: "Each menu item must have a name and valid price"
                })
            }
        }

        // Create all menu items
        const createdItems = await prisma.menu.createMany({
            data: menuItems.map(item => ({
                foodItems: item.name.trim(),
                description: item.description?.trim() || "",
                price: parseFloat(item.price),
                category: item.category?.trim() || "General",
                isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
                restaurantId
            }))
        })

        return res.status(201).json({
            message: `${createdItems.count} menu items added successfully`,
            count: createdItems.count
        })
    } catch (err) {
        console.error("Error adding multiple menu items:", err)
        return res.status(500).json({
            message: "Failed to add menu items"
        })
    }
}
