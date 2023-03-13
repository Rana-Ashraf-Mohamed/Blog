import { Request, Response, NextFunction } from 'express';
import { UserData } from '../interfaces/auth.interface';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token) {
        try {
            const authToken = token.split(' ')[1];
            const verified = jwt.verify(authToken, process.env.JWT_SECRET as string) as UserData;
            const user = await User.findOne({ where: { id: verified.id } })
            if (!user) {
                return res.status(401).json({ message: 'USER NOT FOUND' })
            }

            if (!user.isVerified) {
                return res.status(401).json({ message: 'USER NOT VERIFIED' })
            }
            req.user = verified;
            next();



        } catch (err) {
            res.status(401).json({ message: err })
        }
    } else {
        res.status(401).json({ message: 'AUTHENTICATION TOKEN NOT FOUND' });
    }

}