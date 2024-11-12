import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNumber,
  IsNotEmpty,
  Matches,
  IsDefined,
  IsOptional,
  IsEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Password must be 8-15 characters long, contain uppercase, lowercase, number, and special character (!@#$%^&*)',
    },
  )
  password: string;

  @IsString()
  confirm_password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNumber()
  @IsDefined()
  phone: number;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  country: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  city: string;

  @IsEmpty()
  @ApiHideProperty()
  isAdmin: boolean;
}
