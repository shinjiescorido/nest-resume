/**
 * Imports the `Module` decorator from `@nestjs/common` for defining NestJS modules.
 */
import { Module  } from '@nestjs/common';

/**
 * Imports the `MongooseModule` from `@nestjs/mongoose` for interacting with MongoDB.
 */
import { MongooseModule } from '@nestjs/mongoose';

/**
 * Imports the `ConfigModule` from the `config` directory likely containing configuration logic.
 */
import { ConfigModule } from '../config/config.module';

/**
 * Imports the `ConfigService` from the `config` directory providing access to configuration settings.
 */
import { ConfigService } from '../config/config.service';

/**
 * Imports controllers from their respective files:
 * - `AppController` - Handles application-level routes.
 * - `DataController` - Handles data-related routes (potentially).
 * - `ResumeController` - Handles resume-related routes.
 * - `MigrationController` - Handles migration-related routes (data migration, backups, etc.).
 */
import { AppController } from '../controllers/app.controller';
import { DataController } from '../controllers/data.controller';
import { ResumeController } from '../controllers/resume.controller';
import { MigrationController } from '../controllers/migration.controller';

/**
 * Imports services from their respective files:
 * - `AppService` - Provides application-level logic.
 * - `DataService` - Provides data-related logic (potentially).
 * - `ResumeService` - Provides resume-related logic (CRUD operations, etc.).
 * - `MigrationService` - Provides migration-related logic (data migration, backups, etc.).
 */
import { AppService } from '../services/app.service';
import { DataService } from '../services/data.service';
import { ResumeService } from '../services/resume.service';
import { MigrationService } from '../services/migration.service';

/**
 * Imports Mongoose Schemas for various models:
 * - `ResumeSchema` - Defines the structure of a resume document.
 * - `ExperienceSchema` - Defines the structure of an experience document.
 * - `EducationSchema` - Defines the structure of an education document.
 * - `ContactSchema` - Defines the structure of a contact document.
 */
import { ResumeSchema } from '../models/resume.model';
import { ExperienceSchema } from '../models/experience.model';
import { EducationSchema } from '../models/education.model';
import { ContactSchema } from '../models/contact.model';

/**
 * This class defines the main NestJS application module (`AppModule`).
 * It configures imports, controllers, providers, and database connection.
 */
@Module({
  imports: [
    /**
     * Imports the `ConfigModule` to access configuration settings.
     */
    ConfigModule,

    /**
     * Configures asynchronous Mongoose connection using the `forRootAsync` method.
     * - Imports `ConfigModule` to make the `ConfigService` available for injection.
     * - Uses a factory function to dynamically construct the connection URI from the `ConfigService`.
     */
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here to inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getDbHost(),
      }),
      inject: [ConfigService],
    }),

    /**
     * Configures Mongoose for feature models (Resume, Experience, Education, Contact).
     * - Defines the name and schema for each model.
     */
    MongooseModule.forFeature([
      { name: 'Resume', schema: ResumeSchema },
      { name: 'Experience', schema: ExperienceSchema },
      { name: 'Education', schema: EducationSchema },
      { name: 'Contact', schema: ContactSchema },
    ]),
  ],
  controllers: [
    AppController,
    DataController,
    ResumeController,
    MigrationController,
  ],
  providers: [
    AppService,
    DataService,
    ResumeService,
    MigrationService,
    ConfigService,
  ],
})
export class AppModule {}
