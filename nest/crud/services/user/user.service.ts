// nest
import { Inject, Injectable } from '@nestjs/common';

// external
import { Model } from 'mongoose';

// internal
import { IUser } from '../../interfaces';
import { CreateUserDto } from '../../dto';

@Injectable()
export class UserService {

  constructor(@Inject('USER_MODEL') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

}
