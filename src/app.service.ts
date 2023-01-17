import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { userEntity } from './entity/user.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(userEntity)
    private readonly repository: Repository<userEntity>, 
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

    return true;
  }
}
