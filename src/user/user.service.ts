import { ConflictException, Inject, Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { userEntity } from './entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import isEmail from 'validator/lib/isEmail';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {

  constructor(
      @InjectRepository(userEntity)
      private readonly repository: Repository<userEntity>, 
      // @Inject(NotificationService)
      private readonly notificationService: NotificationService
    ) {}

  async register(registerUser: RegisterUserDto): Promise<any> {
    const { email, dob, username, password } = registerUser;

    const emailCheck = isEmail(email);
    
    const user = new userEntity();

    user.email = email;
    user.dob = dob;
    user.username = username;
    user.password = password;
 
    try {

      if (!emailCheck) {
        throw new NotAcceptableException("Username not available")
      }
      
      await this.repository.save(user);

      this.notificationService.sendMail(user.email);

      // return email;
      return {msg: email, statusCode: 201, success: true}

      // TODO: validation
      // TODO: login
    } catch (error) {
      // console.log({error});
      if (error.code === '23505') {
        
        throw new ConflictException("Username not available")
        // return {msg: error.message, statusCode: error.code, success: false}
      } else {
        throw new InternalServerErrorException();
        // return {msg: error.message, statusCode: 500, success: false}
      }
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<any> {
    const { username, currentPassword, newPassword } = updatePasswordDto;

    let element = await this.repository.findOne({
      where: { username: username}
    })

    try {

      if (element !== null) {

        const match = await argon2.verify(element.password, currentPassword);

        if (match) {
          element.password = await argon2.hash(newPassword, {
            type: argon2.argon2d,
            memoryCost: 2 ** 16,
            hashLength: 50,
          });

          await this.repository.save(element)

          return {msg: "Password Updated", statusCode: 201, success: true}

        } else {
          return {msg: "Invalid Password", statusCode: 201, success: true}
        }
    } else {
      return {msg: "Invalid Username", statusCode: 201, success: true}
    }


    } catch (error) {
      return {msg: error.message, statusCode: 500, success: false}
    }
  }

  // create(createUserDto: RegisterUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
