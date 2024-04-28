
import { Injectable } from '@nestjs/common';

/**
 * This decorator injects the `DataService` class into other parts of the application.
 * It marks the class as a service that can be provided by NestJS dependency injection.
 */
@Injectable()
export class DataService {
  /**
   * This method creates a new data entry.
   * 
   * @param {any} data - The data to be created. The exact type of data may vary depending on your implementation.
   * @returns {any} - An object containing a success message and the created data (potentially modified).
   *                 The actual return type might be more specific depending on your data structure.
   */
  create(data: any): any {
    // Implement your logic to handle the creation of data, e.g., save it to a database
    return { message: 'Data created successfully', data };
  }
}

