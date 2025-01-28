import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Получить список всех книг
  @Get()
  async getAllBooks() {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    //const result = await this.booksService.someMethod();
    //return result
    const result = await this.booksService.getAllBooks();
    return result;
  }

  // Получить книгу по ID
  @Get(':id')
  async getBookById(@Param('id') id: number) {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    //const result = await this.booksService.someMethod();
    //return result
    const result = await this.booksService.getBookById(id);
    return result;
  }

  // Создать новую книгу
  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async createBook(@Body() bookDto: CreateBookDto, @Request() req) {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    //const result = await this.booksService.someMethod();
    return this.booksService.createBook(bookDto, req.user.userId);
  }

  // // Обновить информацию о книге
  // @Put(':id')
  // async updateBook(@Param('id') id: number, @Body() bookDto: UpdateBookDto) {
  //   // необходимо вызвать соответствующий метод сервиса и вернуть результат
  //   //const result = await this.booksService.someMethod();
  //   await this.booksService.
  // }

  // // Удалить книгу
  // @Delete(':id')
  // async deleteBook(@Param('id') id: number) {
  //   // необходимо вызвать соответствующий метод сервиса и вернуть результат
  //   //const result = await this.booksService.someMethod();
  // }
}
