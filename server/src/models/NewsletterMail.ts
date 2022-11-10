import { PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import dayjs from 'dayjs';

export class NewsletterMail {
   @PrimaryGeneratedColumn()
   id: string;

   @Column()
   title: string

   @Column()
   content: string
 
   @Column()
   mail_address: string;

   @CreateDateColumn({
      default: dayjs()
   })
   registered_at: Date;
}