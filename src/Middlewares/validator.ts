import { ValidationError } from "../Utils/Error/CustomError";
import { TSchema } from "@sinclair/typebox";
import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)

export function validateBody<T extends TSchema>(schema: T){
    const validate = ajv.compile(schema)

    return (res: Response, req: Request, next: NextFunction) => {
        const valid = validate(req.body)
        if (!valid) {
            next(new ValidationError(validate.errors ?? []))
            return
        }
        next()
    }
}