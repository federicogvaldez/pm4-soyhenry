import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  postUser(data: CreateUserDto) {
    return this.usersRepository.postUser(data);
  }

  putUser(id: string, data: CreateUserDto) {
    return this.usersRepository.putUser(id, data);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
