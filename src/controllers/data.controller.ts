import { Controller, Post, Body } from '@nestjs/common';
import { DataService } from '../services/data.service';

/**
 * Controller for handling data-related requests.
 */
@Controller('data')
export class DataController {
  /**
   * Creates an instance of DataController.
   * @param dataService - The DataService instance.
   */
  constructor(private readonly dataService: DataService) {}

  /**
   * Handler for POST requests to the '/data' endpoint.
   * @param data - The data sent in the request body.
   * @returns The result of processing the data.
   */
  @Post()
  createData(@Body() data: any): any {
    // You can handle the incoming data here, e.g., save it to a database
    // Call the create method of the DataService instance
    return this.dataService.create(data);
  }
}
