import express from "express";

import { getAllRestaurants,getRestaurantById,updateRestaurant,deleteRestaurant,res } from "../controller/res";

const resRouter=express.Router()

resRouter.post('/restaurants',res)
resRouter.get('/restaurants',getAllRestaurants)
resRouter.get('/restaurants/:id',getRestaurantById)
resRouter.put('/restaurants/:id',updateRestaurant)
resRouter.delete('/restaurants/:id',deleteRestaurant)

export default resRouter