import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/core/entity/base.entity';

@Entity('book')
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  ageRestriction: number;

  @Column({ nullable: true })
  ownerId: number;

  @Column({ nullable: true })
  image?: string;
}
