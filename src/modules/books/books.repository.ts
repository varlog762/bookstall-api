import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book)
    private booksOrmRepository: Repository<Book>,
  ) {}
}
