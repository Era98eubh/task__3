import { Entity, Column, PrimaryGeneratedColumn ,ManyToOne,JoinColumn,BaseEntity} from "typeorm"
import { Nuser } from "./Nuser"

@Entity()
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    userid!: string

    @Column()
    message!: string

    @ManyToOne(() => Nuser, (nuser) => nuser.notifications)
    nuser!: Nuser
}