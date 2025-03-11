import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Ativos - Home Broker')
    .setDescription('API para gerenciar ativos e preços')
    .setVersion('1.0')
    .addTag('assets')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Rota onde o Swagger estará disponível

  app.enableCors({
    origin: 'http://localhost:3001', // Permite o frontend Next.js
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // Se você precisar enviar cookies ou credenciais
  });

  // const assetsService = app.get(AssetsService);
  // assetsService.subscribeEvents().subscribe((event) => {
  //   console.log(event);
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
