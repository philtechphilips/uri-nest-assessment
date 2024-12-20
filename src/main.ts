import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './shared/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sawggerConfig = new DocumentBuilder()
    .setTitle('Task Manager documentation')
    .setDescription('Contains all API related to the task manager')
    .setVersion('v1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, sawggerConfig);
  SwaggerModule.setup('/v1', app, document);

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
