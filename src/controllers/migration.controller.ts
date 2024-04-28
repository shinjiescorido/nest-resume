import { Controller, Get } from '@nestjs/common';
import { MigrationService } from '../services/migration.service';

/**
 * Controller for handling migration-related requests.
 */
@Controller('migrate')
export class MigrationController {
  /**
   * Creates an instance of MigrationController.
   * @param migrationService - The MigrationService instance.
   */
  constructor(private readonly migrationService: MigrationService) {}

  /**
   * Handler for GET requests to the '/migrate' endpoint.
   * @returns The result of data migration process.
   */
  @Get()
  createData(): any {
    // Call the migrateData method of the MigrationService instance
    return this.migrationService.migrateData();
  }
}
