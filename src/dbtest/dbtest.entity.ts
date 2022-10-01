import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dbtest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;
}
