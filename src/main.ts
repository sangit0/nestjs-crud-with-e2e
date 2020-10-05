import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DatabaseConfigService } from './config/database/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: DatabaseConfigService = app.get('DatabaseConfigService');

  console.log(appConfig.dbURL);

  const options = new DocumentBuilder()
    .setTitle('Crud example swagger')
    .setDescription('The crud API description')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
