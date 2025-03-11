import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
