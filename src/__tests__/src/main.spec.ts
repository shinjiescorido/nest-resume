/**
 * Imports the NestFactory class from the `@nestjs/core` package.
 * This class is used to create NestJS applications.
 */
import { NestFactory } from '@nestjs/core';

/**
 * Imports the `AppModule` class from the `app.module` file.
 * This module contains the main configuration for your NestJS application.
 */
import { AppModule } from '../../modules/app.module';

/**
 * Imports the `bootstrap` function from the `main` file.
 * This function is responsible for bootstrapping the NestJS application.
 */
import { bootstrap } from '../../main'; // Import the bootstrap function

// Mock the create method of NestFactory
jest.mock('@nestjs/core', () => ({
  ...jest.requireActual('@nestjs/core'), // Preserve the actual implementation
  NestFactory: {
    ...jest.requireActual('@nestjs/core').NestFactory, // Preserve other properties/methods
    create: jest.fn().mockResolvedValue({
      // Mock the return value of create method
      listen: jest.fn(), // Mock the listen method if needed
    }),
  },
}));

/**
 * This describes the test suite for the `main.ts` file.
 */
describe('main.ts', () => {
  /**
   * This function is called after each test in the suite.
   * It clears all the mocks used in the tests.
   */
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  /**
   * This test case verifies if the `bootstrap` function bootstraps the application correctly.
   */
  it('should bootstrap the application', async () => {
    // Call the bootstrap function
    await bootstrap();

    // Assertions
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    // You can add more assertions here if needed
  });
});
