import { PostService } from './../services/post.service';
import { Request, Response, NextFunction } from "express";
import { PostDTO } from '../dtos/post.dto';

class PostController {
    public postService = new PostService();
    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postData: PostDTO = req.body;
            const data = await this.postService.createPost(postData, req.user.id);
            res.status(200).json({ message: "POST CREATED SUCCESSFULLY", data });

        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err.message ?? "SOMETHING WENT WRONG" })

        }

    };

    public getPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.postService.getPosts();
            res.status(200).json({ message: "POSTS FETCHED SUCCESSFULLY", data });
        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err })

        }

    };

    public getPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.postService.getPost(req.params.id);
            res.status(200).json({ message: "POST FETCHED SUCCESSFULLY", data });
        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err })

        }

    };

    public updatePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateData = req.body as PostDTO;
            const data = await this.postService.updatePost(req.params.id as unknown as number, updateData, req.user.id);
            res.status(200).json({ message: "POSTS UPDATED SUCCESSFULLY", data });
        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err })

        }

    };

    public deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.postService.deletePost(req.params.id as unknown as number, req.user.id);
            res.status(200).json({ message: "POSTS DELETED SUCCESSFULLY", data });
        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err })

        }

    };


}

export default PostController