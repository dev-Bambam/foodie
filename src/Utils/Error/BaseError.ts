class BaseError extends Error {
    constructor(
        public message: string,
        public statusCode: number,
        public status: string,
        public type: string,
        public isOperational = true
    ) {
        super(message)
        Error.captureStackTrace(this, this.constructor)
    }
}

export default BaseError 