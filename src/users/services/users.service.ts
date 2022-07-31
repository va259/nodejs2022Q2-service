import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/users.entity';
import { v4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import InMemoryDB from '../../db/db.service';

@Injectable()
export class UsersService {
  constructor(public db: InMemoryDB) {}
  // private users: Array<User> = [];

  async findAll(): Promise<User[]> {
    return this.db.users;
  }

  async findOne(id: string): Promise<User> {
    const user: User = this.db.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User({
      id: v4(),
      version: 1,
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: +Date.now(),
      updatedAt: +Date.now(),
    });

    this.db.users.push(user);
    return user;
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const index: number = this.db.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('User not found');

    if (updatePasswordDto.oldPassword !== this.db.users[index].password)
      throw new ForbiddenException('Password incorrect');

    const updatedUser = new User({
      ...this.db.users[index],
      id: this.db.users[index].id,
      version: this.db.users[index].version + 1,
      updatedAt: Date.now(),
      password: updatePasswordDto.newPassword,
    });

    this.db.users[index] = updatedUser;
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const user: User = this.db.users.find((user) => user.id === id);
    const index: number = this.db.users.findIndex((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    this.db.users.splice(index, 1);
    return user;
  }
}
