import { IsString, Length } from 'class-validator'

export class PostDTO {
    @IsString()
    title: string;

    @IsString()
    describtion: string;
}
