"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./Routes/index.route"));
const webhook_route_1 = __importDefault(require("./Routes/webhook.route"));
const ErrorHandler_1 = __importDefault(require("./Middlewares/ErrorHandler"));
const app = (0, express_1.default)();
// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc)
        if (!origin)
            return callback(null, true);
        // Allow all origins for now (you can restrict later)
        return callback(null, true);
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
};
// CORS applications first
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: '10mb'
}));
app.use('/api', index_route_1.default);
app.use(ErrorHandler_1.default);
app.use('/api/webhook', webhook_route_1.default);
// 404 handler
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        status: "error",
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});
exports.default = app;
