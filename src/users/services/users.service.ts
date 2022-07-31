import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/users.entity';
import { v4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const now = +Date.now();
    const user = new User({
      id: v4(),
      version: 1,
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: now,
      updatedAt: now,
    });

    await this.usersRepository.save(user);
    return user;
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ id: id });

    if (!user) throw new NotFoundException('User not found');

    if (updatePasswordDto.oldPassword !== user.password)
      throw new ForbiddenException('Password incorrect');

    user.version = user.version + 1;
    user.updatedAt = Date.now();
    user.password = updatePasswordDto.newPassword;

    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.remove(user);
    return user;
  }
}
