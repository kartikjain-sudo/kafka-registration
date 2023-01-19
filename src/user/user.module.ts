import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity]), 
    NotificationModule
  ],
  controllers: [UserController],
  providers: [UserService] // , NotificationService]
})
export class UserModule {}
