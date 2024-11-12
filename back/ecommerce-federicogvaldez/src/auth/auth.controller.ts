import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './auth.dto';
import { CreateUserDto } from 'src/users/users.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signup')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }

  @Post('signin')
  signIn(@Body() data: LoginUserDto) {
    return this.authService.singIn(data);
  }
}
