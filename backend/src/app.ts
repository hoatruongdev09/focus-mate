import "reflect-metadata"
import express from 'express';
import cors from 'cors'


import boardRoute from './routes/board.route'
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'

declare module "express-serve-static-core" {
    interface Request {
        user_id?: number | undefined
        user_role?: number | undefined
    }
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.json("OK");
});

app.use("/auth", authRoute)
app.use("/board", boardRoute)
app.use("/user", userRoute)


app.listen(port, () => {
    console.log(`app running on port: ${port}`)
});