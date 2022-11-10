import { PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import dayjs from 'dayjs';

export class FgPassMail {
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
   last_requested_at: Date;
}