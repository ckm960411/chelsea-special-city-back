import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
