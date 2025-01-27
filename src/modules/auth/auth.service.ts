import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ userId: number }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Error: User is unauthorized');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!user) {
      throw new UnauthorizedException(); // Вернет код 401
    }

    return {
      userId: user.id,
    };
  }
}
