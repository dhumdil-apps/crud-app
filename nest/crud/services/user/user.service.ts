// nest
import { Injectable } from '@nestjs/common';

// internal
import { User, UserModel } from '../../models/user/user.model';

@Injectable()
export class UserService {

  async count(): Promise<number> {
    return await UserModel.countDocuments({}).exec();
  }

  async list(): Promise<User[]> {
    return await UserModel.find().exec();
  }
  async create(user: User): Promise<User> {
    const userModel = new UserModel(user);
    return await userModel.save();
  }

  async read(id: string): Promise<User> {
    return await UserModel.findOne({ _id: id });
  }

  async update(id: string, user: User): Promise<User> {
    return await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: user},
      { new: true, upsert: true, runValidators: true },
    );
  }

  async delete(id: string): Promise<User> {
    return await UserModel.findOneAndDelete({ _id: id });
  }

}
