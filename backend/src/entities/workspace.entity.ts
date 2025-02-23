import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Board from "./board.entity";
import WorkspaceMember from "./workspace-member.entity";
import { removeDashes } from "../utils/uuid-transformer";



@Entity()
export default class Workspace {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    short_name: string

    @Column()
    name: string

    @Column({ nullable: true })
    invite_id: string

    @Column({ nullable: true })
    description: string

    @OneToMany(() => Board, board => board.workspace)
    boards: Board[]

    @OneToMany(() => WorkspaceMember, member => member.workspace)
    members: WorkspaceMember[]
}