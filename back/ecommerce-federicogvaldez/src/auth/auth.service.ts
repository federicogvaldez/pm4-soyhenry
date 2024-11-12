import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginUserDto } from './auth.dto';
import { CreateUserDto } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  getAuth() {
    return 'Get All Auth';
  }

  signUp(data: CreateUserDto) {
    return this.authRepository.signUp(data);
  }

  singIn(data: LoginUserDto) {
    return this.authRepository.signIn(data);
  }
}
