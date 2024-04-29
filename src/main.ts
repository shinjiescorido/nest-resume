// Import necessary modules
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from './config/config.service';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// Async function for bootstrapping
export async function bootstrap() {
  // Create configuration service instance
  const config = new ConfigService();

  // Create NestJS application instance from AppModule
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors();
  // Start listening on the port defined in environment variable
  await app.listen(config.get('NODE_PORT'));
}

// Call bootstrap function to start the application
bootstrap();
