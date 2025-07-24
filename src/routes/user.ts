import express from "express"
import { login, newUser } from "../controller/users";

const userRouter= express.Router()

// userRouter.post("/login", login)
userRouter.post("/signup", newUser)
userRouter.post("/signin", login)


export default userRouter;