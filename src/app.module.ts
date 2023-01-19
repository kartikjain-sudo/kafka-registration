import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './user/entities/user.entity';
import { DbModule } from './db/db.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
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
    ]),
    TypeOrmModule.forFeature([userEntity]),
    DbModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
