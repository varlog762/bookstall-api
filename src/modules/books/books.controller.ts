import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { BooksService } from './books.service';

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
  async createBook(@Body() bookDto: any) {
    console.dir(bookDto);
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    //const result = await this.booksService.someMethod();
    return this.booksService.createBook(bookDto);
  }

  // // Обновить информацию о книге
  // @Put(':id')
  // async updateBook(@Param('id') id: number, @Body() bookDto: any) {
  //   // необходимо вызвать соответствующий метод сервиса и вернуть результат
  //   //const result = await this.booksService.someMethod();
  // }

  // // Удалить книгу
  // @Delete(':id')
  // async deleteBook(@Param('id') id: number) {
  //   // необходимо вызвать соответствующий метод сервиса и вернуть результат
  //   //const result = await this.booksService.someMethod();
  // }
}
