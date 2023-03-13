import { AuthService } from './../services/auth.service';
import { Request, Response, NextFunction } from "express";
import { LoginDTO, SignupDTO } from "../dtos/auth.dto";

class AuthController {
    public authService = new AuthService();
    public signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: SignupDTO = req.body;
            const data = await this.authService.signup(userData);
            res.status(200).json({ message: "USER CREATED SUCCESSFULLY", data });

        } catch (err: any) {
            res.status(err.status ?? 500).jsonp({ message: err.message ?? "SOMETHING WENT WRONG" })

        }

    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: LoginDTO = req.body;
            const data = await this.authService.login(userData);
            res.status(200).json({ message: "USER Login SUCCESSFULLY", data });

        } catch (err: any) {
            res.status(err.status ?? 500).jsonp({ message: err.message ?? "SOMETHING WENT WRONG" })

        }

    };

    public verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.authService.verifyEmail(req.params.token);
            res.status(200).json({ message: "USER VERIFIED SUCCESSFULLY", data });

        } catch (err: any) {
            res.status(err.status ?? 500).jsonp({ message: err.message ?? "SOMETHING WENT WRONG" })

        }

    };


}

export default AuthController