import { Module } from "@nestjs/common";
// import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    // ConfigModule,
    TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
      useFactory: () => {
        return {
          type: "postgres",
          host: 'localhost', // configService.get("DB_HOST"),
          port: 5432, //+configService.get("DB_PORT"),
          username: "postgres", //configService.get("DB_USER"),
          password: "postgres", //configService.get("DB_PASSWORD"),
          database: 'register', // configService.get("DATABASE"),
          entities: [__dirname + "/../**/entity/*.entity.{ts,js}"],
          autoLoadEntities: true,
          synchronize: true,
          retryAttempts: 2,
          // ssl: { rejectUnauthorized: false },
        };
      },
    }),
  ],
})
export class DbModule {}

// TypeOrmModule.forRoot({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',//process.env.Username, 
//     password: 'postgres',//process.env.Password,
//     database: 'register',//process.env.Database,
//     entities: [__dirname + './../src/entity/*.entity{.ts,.js}'],
//     synchronize: true,
//     autoLoadEntities: true,
//   }),