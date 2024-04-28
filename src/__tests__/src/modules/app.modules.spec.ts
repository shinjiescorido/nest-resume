import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../modules/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

// Mocking MongooseModule.forRootAsync
jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual('@nestjs/mongoose'),
  MongooseModule: {
    ...jest.requireActual('@nestjs/mongoose').MongooseModule,
    forRootAsync: jest.fn().mockImplementation(() => ({
      useFactory: async () => ({
        uri: 'mocked-uri', // Provide a mock URI
      }),
    })),
    forFeature: jest.fn(),
  },
}));

// Setting up MongoDB in memory
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Injecting the test database URI into MongooseModule.forRootAsync
  (MongooseModule.forRootAsync as jest.Mock).mockReturnValue({
    useFactory: async () => ({
      uri,
    }),
  });
});

// Stopping MongoDB in memory
afterAll(async () => {
  await mongod.stop();
});

/**
 * Unit tests for the AppModule class.
 */
describe('AppModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    // Creating a testing module for the AppModule
    app = await Test.createTestingModule({
      providers: [AppModule],
    }).compile();
  });

  /**
   * Test case to validate the AppModule.
   */
  it('should validate the app module', () => {
    expect(app).toBeDefined();
  });
});
