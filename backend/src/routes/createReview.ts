import express from "express"
import { Creator } from "../controller/Creator"
const reviewRouter= express.Router()

reviewRouter.post('/review',Creator)


export default reviewRouter;