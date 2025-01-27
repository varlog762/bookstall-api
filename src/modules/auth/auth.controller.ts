import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Подключает гуарды (передаем ему наш гуард)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.userId);
  }
}
