import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { userEntity } from './entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';

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

    let duplicate = await this.repository.find({
      where: { username: username}
    })
    
    const user = new userEntity();

    user.email = email;
    user.dob = dob;
    user.username = username;
    user.password = password;
 
    try {
      
      await this.repository.save(user);

      this.notificationService.sendMail(user.email);

      // return email;
      return {msg: email, statusCode: 201, success: true}

      // TODO: argon2
      // TODO: validation
      // TODO: exception handling
      // TODO: login
      // TODO: update password
    } catch (error) {
      // console.log({error});
      if (error.code === '23505') {
        
        // throw new ConflictException("Username not available")
        return {msg: error.message, statusCode: error.code, success: false}
      } else {
        // throw new InternalServerErrorException();
        return {msg: error.message, statusCode: 500, success: false}
      }
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
