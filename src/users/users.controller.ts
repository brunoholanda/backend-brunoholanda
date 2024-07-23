import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {
    this.logger.log('UsersController initialized');
  }

  @Post('create')
  async createUser(@Body('username') username: string, @Body('password') password: string) {
    this.logger.log(`Creating user: ${username}`);
    return this.usersService.create(username, password);
  }
}
