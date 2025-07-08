import jwt from 'jsonwebtoken'

type TPayload =  {
   userId: string;
   role: "customer" | "admin";
};

export const generateToken = (payload: TPayload): string => {
    const secret = process.env.JWT_SECRET!
    const token = jwt.sign(payload, secret, { expiresIn: '1d' })
    
    return token
}