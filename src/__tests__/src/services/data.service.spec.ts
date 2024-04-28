import { DataService } from '../../../services/data.service';

/**
 * Unit tests for the DataService class.
 */
describe('DataService', () => {
  let dataService: DataService;

  beforeEach(() => {
    // Create a new instance of DataService before each test
    dataService = new DataService();
  });

  /**
   * Test case to verify that the DataService is defined.
   */
  it('should be defined', () => {
    // Check if the service is defined
    expect(dataService).toBeDefined();
  });

  /**
   * Test case to verify the behavior of the create method.
   */
  it('should return message and data when create method is called', () => {
    // Arrange
    // Define a sample data object
    const testData = { name: 'John Doe', age: 30 };

    // Act
    // Call the create method with the sample data
    const result = dataService.create(testData);

    // Assert
    // Check if the result contains the expected message and data
    expect(result).toEqual({
      message: 'Data created successfully',
      data: testData,
    });
  });
});
