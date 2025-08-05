import express from "express";
import { contacts } from "../controller/contact";

const cont=express.Router()

cont.post('/contact',contacts)

export default cont