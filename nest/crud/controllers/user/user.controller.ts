// nest
import { Body, Controller, Param, Post } from '@nestjs/common';

// internal
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';

@Controller('api/v1/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('/count')
  async count(): Promise<number> {
    return this.userService.count();
  }

  @Post('/list')
  async list(@Body() model: User): Promise<User[]> {
    return this.userService.list();
  }

  @Post('/create')
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Post('/read/:id')
  async read(@Param('id') id: string): Promise<User> {
    return this.userService.read(id);
  }

  @Post('/update/:id')
  async update(@Body() user: User, @Param('id') id: string): Promise<User> {
    return this.userService.update(id, user);
  }

  @Post('/delete/:id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

}
