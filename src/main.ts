import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './shared/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [`${config.FRONTEND_URL}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: false,
  });
  await app.listen(config.PORT.APP_PORT, () => {
    console.log(`Server started on ${config.PORT.APP_PORT}`);
  });
}
bootstrap();
