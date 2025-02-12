import "reflect-metadata"
import express from 'express';
import cors from 'cors'


import boardRoute from './routes/board.route'
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import boardThemeRoute from './routes/board-theme.route'
import dataSource from "./db/data-source";
import { boardThemeService } from "./services/board-theme.service";
import workspaceRoute from "./routes/workspace.route";

declare module "express-serve-static-core" {
    interface Request {
        customer_id?: number | undefined
        customer_role?: number | undefined
    }
}
dataSource.initialize().then(async () => {
    await boardThemeService.initBoard()
}).catch((err) => console.error(err))

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
app.use("/board-theme", boardThemeRoute)
app.use("/user", userRoute)
app.use("/workspace", workspaceRoute)



app.listen(port, () => {
    console.log(`app running on port: ${port}`)
});