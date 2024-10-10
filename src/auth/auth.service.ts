// auth.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
      },
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      // Generate JWT (implement JWT service here)
      return { message: 'Login successful', userId: user.id };
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
