import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/interceptors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class-validator 를 전역으로 적용
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: true, // true: 전체 허용 / 개발이 끝나면 어떤 특정 url 에서 접근이 가능할지 써주어야 함
    credentials: true,
  });

  await app.listen(process.env.PORT, () => {
    console.log(`app is listening at ${process.env.PORT}`);
  });
}
bootstrap();
