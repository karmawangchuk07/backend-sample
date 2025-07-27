import express from "express"
import { createReview } from "../controller/createorder"
const reviewRouter= express.Router()

reviewRouter.post('/review',createReview)


export default reviewRouter;