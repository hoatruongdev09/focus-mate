import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import Workspace from "./workspace.entity";
import Customer from "./customer.entity";

@Entity()
export default class WorkspaceMember {
    @PrimaryColumn()
    workspace_id: number

    @PrimaryColumn()
    user_id: number

    @Column({ default: 0 })
    role: number

    @ManyToOne(() => Workspace, p => p.members)
    @JoinColumn({ name: "workspace_id" })
    workspace: Workspace

    @ManyToOne(() => Customer, customer => customer.workspaces)
    @JoinColumn({ name: "user_id" })
    user: Customer
}