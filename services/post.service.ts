import { Post, PostAttributes } from '../models/Post';
import { PostDTO } from '../dtos/post.dto';
import { User } from '../models/User';

export class PostService {
    public async createPost(data: PostDTO, userId: number): Promise<PostAttributes> {
        const post = await Post.create({
            title: data.title,
            describtion: data.describtion,
            userId,
        });
        return post;
    }

    public async getPosts(): Promise<PostAttributes[]> {
        const posts = await Post.findAll({ attributes: ["id", "title", "createdAt"] });
        return posts;
    }

    public async getPost(id: string): Promise<PostAttributes | null> {
        const post = await Post.findOne({
            where: { id },
            include: [{
                model: User,
                attributes: ["name"],
            }],
        });
        return post;
    }

    public async updatePost(id: number, data: PostDTO, userId: number): Promise<PostAttributes> {
        const post = await Post.findOne({ where: { id } });
        if (!post) {
            throw ({ status: 404, message: "POST NOT FOUND" });
        }
        if (post.userId !== userId) {
            throw ({ status: 403, message: "YOU ARE NOT AUTHORIZED" });

        }
        const updatedPost = await Post.update(data, {
            where: {
                id
            },
            returning: true
        });
        return updatedPost[1][0];
    }

    public async deletePost(id: number, userId: number) {
        const post = await Post.findOne({ where: { id } });
        if (!post) {
            throw ({ status: 404, message: "POST NOT FOUND" });
        }
        if (post.userId !== userId) {
            throw ({ status: 403, message: "YOU ARE NOT AUTHORIZED" });

        }
        const deletedPost = await Post.destroy({ where: { id } });
    }
}