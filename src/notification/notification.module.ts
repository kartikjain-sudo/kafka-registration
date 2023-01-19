import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

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
        ])
    ],
    providers: [NotificationService],
    controllers: [],
    exports: [NotificationService]
})
export class NotificationModule {}
