/**
 * The ConfigModule provides access to configuration settings for your application.
 *
 * It imports and exports the `ConfigService` which likely interacts with your configuration files or environment variables.
 */

import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],  // Provides the ConfigService for injection within this module
  exports: [ConfigService],     // Makes the ConfigService available for injection in other modules
})
export class ConfigModule {}
