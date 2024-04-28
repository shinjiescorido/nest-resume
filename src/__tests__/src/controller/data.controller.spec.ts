import { DataController } from '../../../controllers/data.controller';
import { DataService } from '../../../services/data.service';

/**
 * Unit tests for the DataController class.
 */
describe('DataController', () => {
  let dataController: DataController;
  let dataService: DataService;

  beforeEach(() => {
    // Mock DataService
    dataService = new DataService();
    dataController = new DataController(dataService);
  });

  /**
   * Test suite for the createData method of the DataController class.
   */
  describe('createData', () => {
    /**
     * Test case to verify that DataService.create is called with the provided data.
     */
    it('should call DataService.create with the provided data', () => {
      // Arrange
      const testData = { name: 'John', age: 30 };
      const createSpy = jest
        .spyOn(dataService, 'create')
        .mockReturnValue(testData);

      // Act
      const result = dataController.createData(testData);

      // Assert
      expect(createSpy).toHaveBeenCalledWith(testData);
      expect(result).toEqual(testData);
    });
  });
});
