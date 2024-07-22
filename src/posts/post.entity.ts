import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  summary: string;

  @Column('text')
  description: string;

  @Column()
  skills: string;

  @Column()
  project_link: string;

  @Column()
  repo_link: string;
}
