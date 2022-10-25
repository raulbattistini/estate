import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import dayjs from 'dayjs';

@Entity()
export class Post {

   @PrimaryGeneratedColumn("uuid")
   post_id: string

   @Column()
   title: string

   @Column({
      type: 'text'
   })
   content: string

   @CreateDateColumn({
      default: dayjs()
   })
   created_at: Date
}