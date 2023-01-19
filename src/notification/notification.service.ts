import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserRegisteredEvent } from './event/user-registered.event';

@Injectable()
export class NotificationService {
    constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly registerClient: ClientKafka,
    ) {}

    async sendMail(email: any) {
        this.registerClient.emit('user_registered', new UserRegisteredEvent(email));
    }
}
