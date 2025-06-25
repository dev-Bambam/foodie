import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

interface Payload{
    userId: Types.ObjectId,
    role: 'customer' | 'admin'
}

export const generateToken = (payload: Payload): string => {
    const secret = process.env.JWT_SECRET!
    const token = jwt.sign(payload, secret, { expiresIn: '1d' })
    
    return token
}