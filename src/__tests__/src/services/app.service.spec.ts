import { AppService } from '../../../services/app.service';

/**
 * Unit tests for the AppService class.
 */
describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
    // Create a new instance of AppService before each test
    appService = new AppService();
  });

  /**
   * Test case to verify that the AppService is defined.
   */
  it('should be defined', () => {
    // Check if the service is defined
    expect(appService).toBeDefined();
  });

  /**
   * Test case to verify that the getHello method returns 'Hello World!'.
   */
  it('should return "Hello World!"', () => {
    // Call the getHello method and check if it returns 'Hello World!'
    expect(appService.getHello()).toEqual('Hello World!');
  });
});
