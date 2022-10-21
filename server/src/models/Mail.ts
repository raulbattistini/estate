import { PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import dayjs from 'dayjs';

export class Mail {
   @PrimaryGeneratedColumn()
   mail_id: string;
 
   @Column()
   title: string;
 
   @Column()
   description: string;
 
   @CreateDateColumn({
      default: dayjs()
   })
   created_at: Date;
}