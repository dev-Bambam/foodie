class BaseError extends Error {
    constructor(
        public message: string,
        public statusCode: number,
        public type: string,
        public status?: string,
        public isOperational = true
    ) {
        super(message)
        this.status = 'error'
        Error.captureStackTrace(this, this.constructor)
    }
}

export default BaseError 