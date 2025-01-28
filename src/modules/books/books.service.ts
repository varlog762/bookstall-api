import { ForbiddenException, Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { UsersRepository } from '../users/users.repository';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  // Получить список всех книг
  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  // Получить книгу по ID
  async getBookById(id: number): Promise<Book> {
    return this.booksRepository.findOneOrNotFoundFail(id);
  }

  // Создать новую книгу
  async createBook(dto: CreateBookDto, userId: number): Promise<void> {
    const user = await this.usersRepository.findByIdOrNotFoundFail(userId);

    if (user.age < 18 && dto.ageRestriction >= 18) {
      throw new ForbiddenException('User is too young');
    }

    const book = new Book();
    book.title = dto.title;
    book.ageRestriction = dto.ageRestriction;
    book.author = dto.author;
    book.ownerId = userId;

    await this.booksRepository.save(book);
  }
}
