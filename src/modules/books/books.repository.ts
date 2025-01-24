import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';

@Injectable()
export class BooksRepository {
  /**
   * Constructs a new instance of the BooksRepository.
   *
   * @param booksOrmRepository - An instance of the TypeORM Repository for the Book entity,
   * injected via dependency injection, used for performing database operations on books.
   */
  constructor(
    @InjectRepository(Book)
    private booksOrmRepository: Repository<Book>,
  ) {}

  /**
   * Saves a book to the database.
   *
   * @param book - The book to be saved.
   *
   * @returns The saved book.
   */
  async save(book: Book): Promise<Book> {
    return this.booksOrmRepository.save(book);
  }

  /**
   * Retrieves all books from the database.
   *
   * @returns An array of books.
   */
  async findAll(): Promise<Book[]> {
    return this.booksOrmRepository.find();
  }

  /**
   * Finds a book by its ID or throws a NotFoundException if not found.
   *
   * @param id - The ID of the book to be retrieved.
   *
   * @returns The book entity if found.
   *
   * @throws NotFoundException - If the ID is invalid or the book is not found.
   * @throws Error - If the database query fails.
   */
  async findOneOrNotFoundFail(id: number): Promise<Book> {
    if (id === null || id === undefined) {
      throw new NotFoundException('Invalid book ID');
    }

    let result: Book | null = null;
    try {
      result = await this.booksOrmRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Database query failed');
    }

    if (!result) {
      throw new NotFoundException('Book not found');
    }

    return result;
  }

  /**
   * Removes a book from the database by its ID.
   *
   * @param id - The ID of the book to be removed.
   *
   * @returns void
   *
   * @throws Error - If the database deletion fails.
   */
  async remove(id: number): Promise<void> {
    await this.booksOrmRepository.delete(id);
  }
}
