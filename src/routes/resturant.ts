import express from "express";

import { getAllRestaurant,restaurant,getbyId } from "../controller/res";

const resRouter=express.Router()

resRouter.post('/restaurants',restaurant)
resRouter.get('/restaurants',getAllRestaurant)
resRouter.get('/restaurants/:id',getbyId)

export default resRouter