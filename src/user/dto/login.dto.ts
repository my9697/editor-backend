import { IsNotEmpty, IsString } from 'class-validator';
import { UserType } from '../types';

export class LoginDto {
  // @IsString()
  // @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  password: string;

  phoneNumber: string;

  email: string;

  code: string;

  type: UserType;
}
