import "reflect-metadata"
import express from 'express';
import cors from 'cors'
import boardRoute from './routes/group.route'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.json("OK");
});

app.use("/board", boardRoute)


app.listen(port, () => {
    console.log(`app running on port: ${port}`)
});