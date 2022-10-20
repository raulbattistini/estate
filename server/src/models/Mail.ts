import { PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";


export class Mail {
   @PrimaryGeneratedColumn()
   mail_id: string;
 
   @Column()
   title: string;
 
   @Column()
   description: string;
 
   @CreateDateColumn()
   created_at: Date;
}