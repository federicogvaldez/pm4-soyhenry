import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { LoginUserDto } from 'src/auth/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password' | 'orders'>[]> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = await this.usersRepository.find({
      skip: startIndex,
      take: limit,
    });
    return paginatedUsers.map(({ password, orders, ...user }) => user);
  }

  async getUserById(id: string): Promise<Omit<Users, 'password' | 'isAdmin'>> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format. Expected a UUID.');
    }
    const userFind = await this.usersRepository.findOneBy({ id });
    if (!userFind) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });

    const { password, isAdmin, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async postUser(
    data: CreateUserDto,
  ): Promise<Omit<Users, 'password' | 'orders' | 'isAdmin'>> {
    if (
      !data.password ||
      !data.confirm_password ||
      data.password.length === 0 ||
      data.confirm_password.length === 0
    )
      throw new BadRequestException(
        `Password and confirm_password must be completed`,
      );
    if (data.password !== data.confirm_password)
      throw new BadRequestException(`Passwords don't match`);
    const { confirm_password, ...userWithoutConfirm } = data;
    const passwordHashed = await bcrypt.hash(userWithoutConfirm.password, 10);
    const updatePassword = { ...userWithoutConfirm, password: passwordHashed };
    const newUser = await this.usersRepository.save(updatePassword);
    const { password, orders, id, isAdmin, ...userWithoutPassword } = newUser;
    return { id, ...userWithoutPassword };
  }

  async putUser(
    id: string,
    data: CreateUserDto,
  ): Promise<Omit<Users, 'password' | 'orders' | 'isAdmin'>> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format. Expected a UUID.');
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.update(id, data);
    const userUpdate = await this.usersRepository.findOneBy({ id });
    const { password, orders, isAdmin, ...userWithoutPassword } = userUpdate;
    return userWithoutPassword;
  }

  async deleteUser(
    id: string,
  ): Promise<Omit<Users, 'password' | 'orders' | 'isAdmin'>> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format. Expected a UUID.');
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.delete(id);
    const { password, orders, isAdmin, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validateUser(data: LoginUserDto) {
    const authUser = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (!authUser) throw new UnauthorizedException('Invalid credentials');

    const validatePassword = await bcrypt.compare(
      data.password,
      authUser.password,
    );
    if (!validatePassword)
      throw new UnauthorizedException('Invalid credentials');

    const payload = {
      id: authUser.id,
      email: authUser.email,
      isAdmin: authUser.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login Successful',
      token,
    };
  }
}
