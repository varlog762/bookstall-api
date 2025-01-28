import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';
import { JwtStrategy } from 'src/core/guards/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule],
  providers: [BooksService, BooksRepository, JwtStrategy],
  controllers: [BooksController],
})
export class BooksModule {}
