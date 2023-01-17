import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, 
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'REGISTRATION_SERVICE',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'REGISTRATION_SERVICE_GROUP',
        },
      },
    });
  await app.listen();
}
bootstrap();
