import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

// Load environment variables from .env file
dotenv.config();

/**
 * Injectable service for accessing configuration variables.
 */
@Injectable()
export class ConfigService {
  // Store parsed environment variables
  /**
   * Get the value of a specific environment variable.
   * @param key - The name of the environment variable.
   * @returns The value of the environment variable.
   */
  get(key: string): string {
    return process.env[key];
  }

  /**
   * Get the MongoDB connection URI using environment variables.
   * @returns The MongoDB connection URI.
   */
  getDbHost(): string {
    // Extract database connection details from environment variables
    const DB_HOST = process.env.DB_HOST;
    const DB_PORT = process.env.DB_PORT;
    const DB_NAME = process.env.DB_NAME;
    // Construct and return the MongoDB connection URI
    return `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}
