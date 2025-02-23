import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Customer from "./customer.entity";
import Board from "./board.entity";
import Card from "./card.entity";
import List from "./list.entity";

@Entity({ name: "board_activity" })
export default class BoardActivity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    board_id: string

    @Column()
    owner_id: string

    @Column({ nullable: true })
    card_id?: string | null

    @Column({ nullable: true })
    list_id?: string | null

    @Column()
    action: number

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => Board, board => board.activities)
    @JoinColumn({ name: "board_id" })
    board: Board

    @ManyToOne(() => Customer, customer_id => customer_id.activities)
    @JoinColumn({ name: "owner_id" })
    actor: Customer

    @ManyToOne(() => Card, card => card.activities)
    @JoinColumn({ name: "card_id" })
    card?: Card

    @ManyToOne(() => List, list => list.activities)
    @JoinColumn({ name: "list_id" })
    list?: List
}