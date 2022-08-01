import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: 1 })
  version: number; // integer number, increments on update

  @Column('bigint', {
    transformer: { to: (value) => value, from: (value) => parseInt(value) },
  })
  createdAt: number; // timestamp of creation

  @Column('bigint', {
    transformer: { to: (value) => value, from: (value) => parseInt(value) },
  })
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
