import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';
// import { HttpExceptionsFilterTsFilter } from './common/filters/http-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.useGlobalFilters(new HttpExceptionsFilterTsFilter());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  await app.listen(3070);
}
bootstrap();
