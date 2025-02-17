import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "./customer.entity";
import { List } from "./list.entity";
import BoardActivity from "./board-activity.entity";
import UserComment from "./user-comment.entity";
import BoardTheme from "./board-theme.entity";
import Workspace from "./workspace.entity";

@Entity()
export default class Board {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    owner_id: number

    @Column({
        unique: true,
        nullable: false
    })
    name: string

    @Column({ nullable: true })
    description: string

    @Column({ default: false })
    archived: boolean

    @Column({ default: 1 })
    theme_id: number

    @Column()
    workspace_id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @ManyToOne(() => Customer, (customer_id) => customer_id.boards)
    @JoinColumn({ name: 'owner_id' })
    owner: Customer

    @OneToMany(() => List, (list) => list.board)
    lists: List[]

    @OneToMany(() => BoardActivity, (action) => action.board, { cascade: true })
    activities: BoardActivity[]

    @OneToMany(() => UserComment, comment => comment.board, { cascade: true })
    comments: UserComment[]

    @ManyToOne(() => BoardTheme, (bg) => bg.boards)
    @JoinColumn({ name: "theme_id" })
    theme: BoardTheme

    @ManyToOne(() => Workspace, (p) => p.boards)
    @JoinColumn({ name: "workspace_id" })
    workspace: Workspace
}


