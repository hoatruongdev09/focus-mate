import { Repository } from "typeorm";
import BoardActivity from "../entities/board-activity.entity";
import dataSource from "../db/data-source";

import { defaultObserver } from "../utils/observer";
import {
    AchieveListEventData,
    AchieveCardEventData,
    AddListEventData,
    AddCardEventData,
    BoardActivityEvent,
    CreateBoardEventData
} from "../defines/board-activity-type";
import { ActivityType } from "../enums/activity-type";

export class BoardActivityService {
    private boardActivityRepository: Repository<BoardActivity>

    constructor() {
        this.boardActivityRepository = dataSource.getRepository(BoardActivity)

        defaultObserver.register(BoardActivityEvent.CreateBoard, (data: any) => this.onCreateBoard(data))
        defaultObserver.register(BoardActivityEvent.AddList, (data: any) => this.onAddList(data))
        defaultObserver.register(BoardActivityEvent.AddCard, (data: any) => this.onAddCard(data))
        defaultObserver.register(BoardActivityEvent.UnarchiveCard, (data: any) => this.onUnarchiveCard(data))
        defaultObserver.register(BoardActivityEvent.ArchiveCard, (data: any) => this.onArchiveCard(data))
        defaultObserver.register(BoardActivityEvent.UnarchiveList, (data: any) => this.onUnarchiveList(data))
        defaultObserver.register(BoardActivityEvent.ArchiveList, (data: any) => this.onArchiveList(data))
    }

    getBoardActivityRepository() {
        if (!this.boardActivityRepository) {
            this.boardActivityRepository = dataSource.getRepository(BoardActivity)
        }
        return this.boardActivityRepository
    }

    onArchiveList(data: AchieveListEventData) {
        const { board_id, list_id, customer_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.owner_id = customer_id
        activity.list_id = list_id
        activity.board_id = board_id
        activity.action = ActivityType.ARCHIVE_LIST

        this.getBoardActivityRepository().save(activity)
    }

    onUnarchiveList(data: AchieveListEventData) {
        const { board_id, list_id, customer_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.owner_id = customer_id
        activity.list_id = list_id
        activity.board_id = board_id
        activity.action = ActivityType.UNARCHIVE_LIST
        this.getBoardActivityRepository().save(activity)
    }

    onArchiveCard(data: AchieveCardEventData) {
        const { board_id, list_id, card_id, customer_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.owner_id = customer_id
        activity.list_id = list_id
        activity.card_id = card_id
        activity.board_id = board_id
        activity.action = ActivityType.ARCHIVE_CARD
        this.getBoardActivityRepository().save(activity)
    }

    onUnarchiveCard(data: AchieveCardEventData) {
        const { board_id, list_id, card_id, customer_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.owner_id = customer_id
        activity.list_id = list_id
        activity.card_id = card_id
        activity.board_id = board_id
        activity.action = ActivityType.UNARCHIVE_CARD
        this.getBoardActivityRepository().save(activity)
    }

    onCreateBoard(data: CreateBoardEventData) {
        const { board, customer_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.owner_id = customer_id
        activity.board_id = board.id
        activity.action = ActivityType.CREATE_BOARD
        this.getBoardActivityRepository().save(activity)
    }

    onAddList(data: AddListEventData) {
        const { customer_id, list } = data
        const activity: BoardActivity = new BoardActivity()
        activity.owner_id = customer_id
        activity.list_id = list.id
        activity.board_id = list.board_id
        activity.action = ActivityType.CREATE_LIST
        this.getBoardActivityRepository().save(activity)
    }

    onAddCard(data: AddCardEventData) {
        const { customer_id, card } = data
        const activity: BoardActivity = new BoardActivity()
        activity.owner_id = customer_id
        activity.board_id = card.list.board_id
        activity.card_id = card.id
        activity.list_id = card.list_id
        activity.action = ActivityType.CREATE_CARD
        this.getBoardActivityRepository().save(activity)
    }

    async getBoardActivities(board_id: number) {
        const activities = await this.boardActivityRepository
            .createQueryBuilder("board_activity")
            .leftJoin("board_activity.board", "board")
            .leftJoinAndSelect("board_activity.card", "card")
            .leftJoin("board_activity.list", "list")
            .leftJoin("board_activity.actor", "user")
            .addSelect(["list.name", "board.name", "board.description", "user.first_name", "user.last_name"])
            .where("board_activity.board_id = :board_id", { board_id })
            .orderBy("board_activity.created_at", "DESC")
            .getMany()
        return activities.map(activity => ({
            ...activity,
            list_name: activity.list?.name || null, // Flatten `list.name`
            list: undefined as unknown as never, // Remove original `list` object
        }));
    }
}

export const boardActivityService = new BoardActivityService()