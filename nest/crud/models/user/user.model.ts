import { prop, Typegoose } from 'typegoose';

export class User extends Typegoose {

  @prop({
    required: true,
    unique: true,
    validate: value => {
      return (typeof value === 'string') && (value.length > 0);
    },
  })
  name: string;

  @prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: /\S+@\S+\.\S+/,
  })
  email: string;

}

export const UserModel = new User().getModelForClass(User);
