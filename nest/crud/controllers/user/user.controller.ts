// nest
import { Controller, Get, Post, Body } from '@nestjs/common';

// internal
import { CreateUserDto } from '../../dto';
import { UserService } from '../../services';
import { IUser } from '../../interfaces';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createCatDto: CreateUserDto) {
    this.userService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

}
