import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import { CreateUserDto } from 'src/users/users.dto';

// No se procederá al login si faltan alguna de las dos credenciales.

@Injectable()
export class AuthRepository {
  constructor(private readonly usersRepository: UsersRepository) {}

  signUp(data: CreateUserDto) {
    return this.usersRepository.postUser(data);
  }

  signIn(data: LoginUserDto) {
    return this.usersRepository.validateUser(data);
  }
}
