import express from 'express'
import { Application } from 'express'
import {configureCloudinary} from '../config/cloudinary.config'
import cors from 'cors'
import mainRouter from './Routes/index.route'
import webhookRouter from './Routes/webhook.route';
import globalErrorHandler from './Middlewares/ErrorHandler';

const app: Application = express();

// CORS configuration
const corsOptions = {
    origin: function (origin: any, callback: any) {
        // Allow requests with no origin (mobile apps, Postman, etc)
        if (!origin) return callback(null, true)
        
        // Allow all origins for now (you can restrict later)
        return callback(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Origin',
        'X-Requested-With',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers'
    ],
    credentials: false,
    optionsSuccessState: 200,
    preflightContinue: false
}

// CORS applications first
app.use(cors(corsOptions))
configureCloudinary()

app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}))

app.use('/api', mainRouter)


app.use(globalErrorHandler)

app.use('/api/webhook', webhookRouter)

// 404 handler
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
       status: "error",
       message: `Route ${req.method} ${req.originalUrl} not found`,
    });
})

export default app