// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './register-user.dto';

import { IsNotEmpty, IsString } from "class-validator";

// export class UpdateUserDto extends PartialType(CreateUserDto) {
//   id: number;
// }

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    currentPassword: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}