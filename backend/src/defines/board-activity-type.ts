import Board from "../entities/board.entity"
import { List } from "../entities/list.entity"
import { Card } from "../entities/card.entity"

export enum BoardActivityEvent {
    CreateBoard = "CreateBoard",
    AddList = "AddList",
    AddCard = "AddCard",
    ArchiveCard = "ArchiveCard",
    UnarchiveCard = "UnarchiveCard",
    ArchiveList = "ArchiveList",
    UnarchiveList = "UnarchiveList",
    DeleteCard = "DeleteCard",
    DeleteList = "DeleteList"
}

export type CreateBoardEventData = {
    customer_id: string
    board: Board
}

export type AddListEventData = {
    customer_id: string
    list: List
}

export type RemoveListEventData = {
    customer_id: string
    list_id: string
}

export type AddCardEventData = {
    customer_id: string
    card: Card
}

export type RemoveCardEventData = {
    customer_id: string
    list_id: string
    card_id: string
}

export type AchieveCardEventData = {
    customer_id: string
    list_id: string
    board_id: string
    card_id: string
}

export type AchieveListEventData = {
    customer_id: string
    board_id: string
    list_id: string
}