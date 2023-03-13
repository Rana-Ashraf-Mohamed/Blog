import { UserAttributes } from './../models/User';
import { SignupDTO, LoginDTO } from '../dtos/auth.dto';
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginResponse, UserData } from '../interfaces/auth.interface';
import { sendEmail } from '../utils/sendEmail';

export class AuthService {
    public async signup(data: SignupDTO): Promise<UserData> {
        const user = await User.findOne({ where: { email: data.email } })
        if (user) {
            throw { status: 400, message: "USER ALREADY EXISTS" };
        }

        const hashedPass = await bcrypt.hash(data.password, 10);
        const newUser = await User.create({
            email: data.email,
            name: data.name,
            password: hashedPass,
        });
        console.log(newUser);

        const result = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isVerified: newUser.isVerified
        };
        const token = await jwt.sign(result, process.env.JWT_SECRET as string, { expiresIn: "10h" });
        sendEmail(newUser.email, newUser.name, token);
        return result;
    }

    public async login(data: LoginDTO): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email: data.email } })
        if (!user) {
            throw { status: 404, message: "USER NOT FOUND" };
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw { status: 400, message: "WRONG PASSWORD" };
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified
        }


        const token = await jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "10h" });
        return { user: payload, token: `Bearer ${token}` };
    }

    public async verifyEmail(token: string): Promise<LoginResponse> {
        const res = jwt.verify(token, process.env.JWT_SECRET as string) as UserData;
        const user = await User.update({
            isVerified: true
        },
            {
                where: {
                    id: res.id
                },
                returning: true
            });
        const payload = {
            id: user[1][0].id,
            name: user[1][0].name,
            email: user[1][0].email,
            isVerified: user[1][0].isVerified
        }


        const verifiedToken = await jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "10h" });
        console.log(payload)

        return { user: payload, token: `Bearer ${verifiedToken}` };
    }
}