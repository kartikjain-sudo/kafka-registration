import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity]),
  ClientsModule.register([
    {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'notification',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'NOTIFICATION_SERVICE_GROUP',
            },
        },
    },
])],
  controllers: [UserController],
  providers: [UserService, NotificationService]
})
export class UserModule {}