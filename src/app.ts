import dotenv from "dotenv";
import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/userRouter';
const app: Application = express()
dotenv.config();
const PORT: number = Number(process.env.PORT)|| 3000;

app.use('/user', userRoutes);
app.get('/toto', (req: Request, res: Response) => {
    res.send('Hello toto')
})
app.get('/', (req: Request, res: Response) => {
    res.send('Hello toto')
})

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT} !`)
})