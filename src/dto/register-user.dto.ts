import { IsDate, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    email: string;

    @IsDate()
    @IsNotEmpty()
    dob: Date;

    @IsString()
    @IsNotEmpty()
    username: string;

    @MinLength(8)
    password: string;
}