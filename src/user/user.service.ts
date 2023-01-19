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

  async register(registerUser: RegisterUserDto): Promise<boolean> {
    const { email, dob, username, password } = registerUser;

    let duplicate = await this.repository.find({
      where: { username: username}
    })
    
    const user = new userEntity();

    user.email = email;
    user.dob = dob;
    user.username = username;
    user.password = password;
 
    // try {
      console.log("i am here");
      
      await this.repository.save(user);

      this.notificationService.sendMail(user.email);

      return true;

    // } catch (error) {
    //   // console.log({error});
    //   if (error.code === '23505') {
    //     console.log("here");
        
    //     throw new ConflictException("Username not available")
    //   } else {
    //     throw new InternalServerErrorException();
    //   }
    // }
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
