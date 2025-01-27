import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate a user by their email and password.
   * @param email The user's email address.
   * @param password The user's password.
   * @returns The user's ID.
   * @throws UnauthorizedException If the user is not valid.
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<{ userId: number }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Error: User is unauthorized');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException(); // Вернет код 401
    }
    return {
      userId: user.id,
    };
  }

  /**
   * Create a JWT token for the given user ID.
   * @param userId The ID of the user to be logged in.
   * @returns An object containing the JWT token.
   */
  login(userId: string): { accessToken: string } {
    const accessToken = this.jwtService.sign({ userId });

    return { accessToken };
  }
}
