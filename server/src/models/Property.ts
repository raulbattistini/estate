import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, OneToOne, } from "typeorm";
import dayjs from "dayjs";
import { Image } from "./Image";
import { User } from "./User";


@Entity()
export class Property {
  @PrimaryGeneratedColumn("uuid")
  estate_id: string

  @Column()
  name: string

  @CreateDateColumn({
    default: dayjs()
 })
  inclusion_date: Date

  @OneToOne(() => User, (user) => user.email)
  user_poster: string

  @Column()
  value: number

  @Column()
  isSold?: boolean

  @Column()
  isRented?: boolean

  @OneToOne(()=> Image, (image)=> image.originalname)
  @Column()
  media: string

  @Column()
  available_for: string;

}
