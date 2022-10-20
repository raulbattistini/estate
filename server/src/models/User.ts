import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string
  
  @Column()
  admin?: boolean
  
  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at?: Date;
}
