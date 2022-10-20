import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn("uuid")
  img_id: string;
  
  @Column()
  originalname: string;

  @Column()
  location: string;

  @Column()
  key: string;

  @Column()
  size: number;
}
