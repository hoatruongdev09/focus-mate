import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Board {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

}


