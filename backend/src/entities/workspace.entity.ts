import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Board from "./board.entity";
import WorkspaceMember from "./workspace-member.entity";

@Entity()
export default class Workspace {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    short_name: string

    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @OneToMany(() => Board, board => board.workspace)
    boards: Board[]

    @OneToMany(() => WorkspaceMember, member => member.workspace)
    members: WorkspaceMember[]
}