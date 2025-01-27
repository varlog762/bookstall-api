import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructs a LocalStrategy object.
   * @param authService The AuthService to delegate to when validating users.
   */
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * Validate a user by their email and password.
   * @param email The user's email address.
   * @param password The user's password.
   * @returns The user's ID.
   * @throws UnauthorizedException If the user is not valid.
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    return user;
  }
}
