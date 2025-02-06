import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'process';

async function bootstrap() {
  const port = process.env.APP_PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  console.log(`APP LAUNCHED ON ${port}`);
  await app.listen(port);
}
bootstrap();
