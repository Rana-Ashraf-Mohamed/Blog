import { Router } from 'express';
import { Route } from '../interfaces/routes.interface';
import PostController from '../controllers/post.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { PostDTO } from '../dtos/post.dto';
import { authMiddleware } from '../middlewares/auth.middleware';
class PostRoutes implements Route {
    public router = Router();
    public path = '/post';
    public postController = new PostController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(PostDTO, 'body'), this.postController.createPost,
            (req, res) => {
                res.json({ message: "success" })
            });

        this.router.get(`${this.path}`, authMiddleware, this.postController.getPosts,
            (req, res) => {
                res.json({ message: "success" })
            });

        this.router.get(`${this.path}/:id`, authMiddleware, this.postController.getPost,
            (req, res) => {
                res.json({ message: "success" })
            });

        this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(PostDTO, 'body'), this.postController.updatePost,
            (req, res) => {
                res.json({ message: "success" })
            });

        this.router.delete(`${this.path}/:id`, authMiddleware, this.postController.deletePost,
            (req, res) => {
                res.json({ message: "success" })
            });
    };
}

export default PostRoutes;