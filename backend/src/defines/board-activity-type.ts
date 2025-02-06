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
    customer_id: number
    board: Board
}

export type AddListEventData = {
    customer_id: number
    list: List
}

export type RemoveListEventData = {
    customer_id: number
    list_id: number
}

export type AddCardEventData = {
    customer_id: number
    card: Card
}

export type RemoveCardEventData = {
    customer_id: number
    list_id: number
    card_id: number
}

export type AchieveCardEventData = {
    customer_id: number
    list_id: number
    board_id: number
    card_id: number
}

export type AchieveListEventData = {
    customer_id: number
    board_id: number
    list_id: number
}