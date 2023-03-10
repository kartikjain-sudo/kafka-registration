import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('register_user')
  async register(registerUserDto: RegisterUserDto): Promise<any> {
    try {
      const res = await this.userService.register(registerUserDto);
      return res;
    } catch (error) {
      return {msg: error.message, statusCode: error.code, success: false}
    }
  }

  @MessagePattern('update_user_password')
  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<any> {
      return this.userService.updatePassword(updatePasswordDto);
  }

  // @MessagePattern('createUser')
  // create(@Payload() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @MessagePattern('findAllUser')
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @MessagePattern('findOneUser')
  // findOne(@Payload() id: number) {
  //   return this.userService.findOne(id);
  // }

  // @MessagePattern('updateUser')
  // update(@Payload() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(updateUserDto.id, updateUserDto);
  // }

  // @MessagePattern('removeUser')
  // remove(@Payload() id: number) {
  //   return this.userService.remove(id);
  // }
}
