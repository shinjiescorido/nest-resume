import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

/**
 * Controller for handling application-related requests.
 */
@Controller()
export class AppController {
  /**
   * Creates an instance of AppController.
   * @param appService - The AppService instance.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Handler for GET requests to the root endpoint.
   * @returns A string representing a greeting message.
   */
  @Get()
  getHello(): string {
    // Call the getHello method of the AppService instance
    return this.appService.getHello();
  }
}
