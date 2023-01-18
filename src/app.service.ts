import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { userEntity } from './entity/user.entity';
import { UserRegisteredEvent } from './event/user-registered.event';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(userEntity)
    private readonly repository: Repository<userEntity>, 
    @Inject('NOTIFICATION_SERVICE') private readonly registerClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async register(registerUser: RegisterUserDto): Promise<boolean> {
    const { email, dob, username, password } = registerUser;

    const user = new userEntity();

    user.email = email;
    user.dob = dob;
    user.username = username;
    user.password = password;

    await this.repository.save(user);
    console.log({registerUser});
    

    this.registerClient.emit('user_registered', new UserRegisteredEvent(user.email));

    return true;
  }
}
