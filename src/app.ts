import express from 'express'
import { Application } from 'express'
import mainRouter from './Routes/index.route'
import globalErrorHandler from './Middlewares/ErrorHandler';

const app: Application = express();

app.use(express.json())
app.use('/api', mainRouter)


app.use(globalErrorHandler)



export default app