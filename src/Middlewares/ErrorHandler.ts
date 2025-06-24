import BaseError from "../Utils/Error/BaseError";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../Utils/Error/CustomError";
import util from 'util'

const globalErrorHandler = async (err: BaseError, _req: Request, res: Response, _next: NextFunction) => {
    const message = err.message ?? 'Server Down'
    const status = err.status ?? 'fail'
    const statusCode = err.statusCode ?? 500
    const type = err.type ?? 'SERVER_ERR'
    let errorDetail = {}

    if (err instanceof ValidationError) {
        errorDetail = {error: err.error}
    }

    if (!err.isOperational) {
        console.error("Server Error:", util.inspect(err, { depth: null, colors: true }));
    }

    res.status(statusCode).json({
        status,
        message,
        type,
        ...errorDetail
    })
}

export default globalErrorHandler