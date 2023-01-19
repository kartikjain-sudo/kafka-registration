import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SentMailEvent } from './event/sent-email.event';

@Injectable()
export class NotificationService {
    constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientKafka,
    ) {}

    async sendMail(email: any) {
        this.notificationClient.emit('user_registered', new SentMailEvent(email));
    }
}
