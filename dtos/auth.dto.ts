import { IsEmail, IsString, Length, isEmail } from 'class-validator'

export class SignupDTO {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    @Length(8)
    password: string;

}

export class LoginDTO {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8)
    password: string;

}
