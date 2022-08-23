import { Entity, Column, PrimaryGeneratedColumn,ManyToOne,BaseEntity } from "typeorm"
import { Counter } from "./Counter"
import { Nuser } from "./Nuser"

@Entity()
export class Issue extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 100,
    })
    name!: string

    @Column()
    tel!: number

    @Column()
    email!: string

    @Column("text")
    issue!: string

    @Column()
    queue_num!: number

    @Column({default:false})
    isCalled!: Boolean

    @Column({default:false})
    isDone!: Boolean

    @ManyToOne(() => Nuser, (nuser) => nuser.issues)
    nuser!: Nuser

    @ManyToOne(() => Counter, (counter) => counter.issues)
    counter!: Counter



   
}