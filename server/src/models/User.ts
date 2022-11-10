import dayjs from "dayjs";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string
  
  @Column({
    default: false
  })
  admin: boolean
  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  intention?: string

  @Column()
  income?: string

  @CreateDateColumn({
    default: dayjs()
 })
  created_at: Date;
}
