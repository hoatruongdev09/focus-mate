import { Repository } from "typeorm";
import BoardActivity from "../entities/board-activity.entity";
import dataSource from "../db/data-source";

import { defaultObserver } from "../utils/observer";
import { AchieveGroupEventData, AchieveTaskEventData, AddGroupEventData, AddTaskEventData, BoardActivityEvent, CreateBoardEventData } from "../defines/board-activity-type";
import { ActivityType } from "../enums/activity-type";

export default class BoardActivityService {
    private boardActivityRepository: Repository<BoardActivity>

    constructor() {
        this.boardActivityRepository = dataSource.getRepository(BoardActivity)

        defaultObserver.register(BoardActivityEvent.CreateBoard, this.onCreateBoard)
        defaultObserver.register(BoardActivityEvent.AddList, this.onAddList)
        defaultObserver.register(BoardActivityEvent.AddTask, this.onAddTask)
        defaultObserver.register(BoardActivityEvent.UnarchiveTask, this.onUnarchiveTask);
        defaultObserver.register(BoardActivityEvent.ArchiveTask, this.onArchiveTask)
        defaultObserver.register(BoardActivityEvent.UnarchiveColumn, this.onUnarchiveColumn)
        defaultObserver.register(BoardActivityEvent.ArchiveColumn, this.onArchiveColumn)
    }

    onArchiveColumn(data: AchieveGroupEventData) {
        const { board_id, group_id, user_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.user_id = user_id
        activity.group_id = group_id
        activity.board_id = board_id
        activity.action = ActivityType.ARCHIVE_COLUMN
        this.boardActivityRepository.save(activity)
    }

    onUnarchiveColumn(data: AchieveGroupEventData) {
        const { board_id, group_id, user_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.user_id = user_id
        activity.group_id = group_id
        activity.board_id = board_id
        activity.action = ActivityType.UNARCHIVE_COLUMN
        this.boardActivityRepository.save(activity)
    }

    onArchiveTask(data: AchieveTaskEventData) {
        const { board_id, group_id, task_id, user_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.user_id = user_id
        activity.group_id = group_id
        activity.task_id = task_id
        activity.board_id = board_id
        activity.action = ActivityType.ARCHIVE_TASK
        this.boardActivityRepository.save(activity)
    }

    onUnarchiveTask(data: AchieveTaskEventData) {
        const { board_id, group_id, task_id, user_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.user_id = user_id
        activity.group_id = group_id
        activity.task_id = task_id
        activity.board_id = board_id
        activity.action = ActivityType.UNARCHIVE_TASK
        this.boardActivityRepository.save(activity)
    }

    onCreateBoard(data: CreateBoardEventData) {
        const { board, user_id } = data
        const activity: BoardActivity = new BoardActivity()
        activity.user_id = user_id
        activity.board_id = board.id
        activity.action = ActivityType.CREATE_BOARD
        this.boardActivityRepository.save(activity)
    }

    onAddList(data: AddGroupEventData) {
        const { user_id, group } = data
        const activity: BoardActivity = new BoardActivity()
        activity.user_id = user_id
        activity.group_id = group.id
        activity.board_id = group.board_id
        activity.action = ActivityType.CREATE_GROUP
        this.boardActivityRepository.save(activity)
    }

    onAddTask(data: AddTaskEventData) {
        const { user_id, task } = data
        const activity: BoardActivity = new BoardActivity()
        activity.user_id = user_id
        activity.board_id = task.group.board.id
        activity.task_id = task.id
        activity.group_id = task.group_id
        activity.action = ActivityType.CREATE_TASK
        this.boardActivityRepository.save(activity)
    }


}