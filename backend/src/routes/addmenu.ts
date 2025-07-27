import express from "express";
import { addmenuitems,addMultipleMenuItems,getbyMenu } from "../controller/addmenuitems";


const addmenu=express.Router()

addmenu.post('/menu',addmenuitems)
addmenu.post('/menu/bulk',addMultipleMenuItems)
addmenu.get('/menu/restaurent/:restaurentId',getbyMenu)

export default addmenu;