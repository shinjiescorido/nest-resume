import { MigrationController } from '../../../controllers/migration.controller';
import { MigrationService } from '../../../services/migration.service';

/**
 * Unit tests for the MigrationController class.
 */
describe('MigrationController', () => {
  let migrationController: MigrationController;
  let migrationService: MigrationService;

  beforeEach(() => {
    // Create a mock instance of MigrationService
    migrationService = {
      migrateData: jest.fn().mockResolvedValue({ success: true }), // Mock the migrateData method
    } as any;

    // Create an instance of MigrationController with the mock MigrationService
    migrationController = new MigrationController(migrationService);
  });

  /**
   * Test suite for the createData method of the MigrationController class.
   */
  describe('createData', () => {
    /**
     * Test case to verify that MigrationService.migrateData is called.
     */
    it('should call MigrationService.migrateData', async () => {
      // Act
      await migrationController.createData();

      // Assert
      expect(migrationService.migrateData).toHaveBeenCalled();
    });

    /**
     * Test case to verify that the result from MigrationService.migrateData is returned.
     */
    it('should return the result from MigrationService.migrateData', async () => {
      // Arrange
      const expectedResult = { success: true };

      // Act
      const result = await migrationController.createData();

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
