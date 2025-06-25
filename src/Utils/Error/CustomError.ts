import { ErrorObject } from "ajv";
import BaseError from "./BaseError";

export class NotFoundError extends BaseError{
    constructor(public message = 'Resource not found') {
        super(message, 404, 'NOTFOUND_ERR')
    }
}

export class BadRequestError extends BaseError{
    constructor(public message:string, public type:string) {
        super(message, 400, type)
    }
}

export class ValidationError extends BaseError{
    constructor(public error:ErrorObject[]) {
        super('Invalid request body', 400,'VALIDATION_ERR')
    }
}
