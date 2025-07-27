import express from "express";
import cors from "cors"
import userRouter from "./routes/user";
import { middleware } from "./middleware/middleware";
import reviewRouter from "./routes/createReview";
import addmenu from "./routes/addmenu";
import resRouter from "./routes/resturant";

const app=express()
const PORT=4000;

app.use(express.json())
app.use(cors());

app.use('/api/user',userRouter)
app.use('/api/user',middleware,reviewRouter)
app.use('/api/',addmenu)
app.use('/api/',resRouter)

app.get("/", (req, res) => {
  res.send("API is running");
})


app.listen(PORT, () => {
  console.log(`🚀 Server is up and running `);

})
