import dotenv from "dotenv";
import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/userRouter';
const app: Application = express()
const PORT: number = Number(process.env.PORT)|| 3000;
dotenv.config();
app.use(express.json());

// 라우터 등록
app.use('/users', userRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello toto')
})

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT} !`)
})