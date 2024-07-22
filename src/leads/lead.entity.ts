import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  whatsapp: string;
}
