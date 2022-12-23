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

  @Column({nullable: true})
  intention?: string

  @Column({nullable: true})
  income?: string

  @CreateDateColumn({
    default: dayjs()
 })
  created_at: Date;
}
