import { Injectable } from '@nestjs/common';

/**
 * This decorator injects the `AppService` class into other parts of the application.
 * It marks the class as a service that can be provided by NestJS dependency injection.
 */
@Injectable()
export class AppService {
  /**
   * This method returns a simple greeting message.
   * 
   * @returns {string} - The greeting message "Hello World!".
   */
  getHello(): string {
    return 'Hello World!';
  }
}
