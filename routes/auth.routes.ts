import { Router } from 'express';
import { Route } from '../interfaces/routes.interface';
import AuthController from '../controllers/auth.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { SignupDTO, LoginDTO } from '../dtos/auth.dto';
class AuthRoutes implements Route {
    public router = Router();
    public path = '/auth';
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, validationMiddleware(SignupDTO, 'body'), this.authController.signup,
            (req, res) => {
                res.json({ message: "success" })
            });

        this.router.post(`${this.path}/login`, validationMiddleware(LoginDTO, 'body'), this.authController.login,
            (req, res) => {
                res.json({ message: "success" })
            });

        this.router.post(`${this.path}/verify-email/:token`,
            this.authController.verifyEmail,
            (req, res) => {
                res.json({ message: "success" })
            });


    };
}

export default AuthRoutes;