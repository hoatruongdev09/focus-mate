import { Repository } from "typeorm";
import BoardActivities from "../entities/board-action.entity";
import dataSource from "../db/data-source";

export default class BoardActivityService {
    private boardActivityRepository: Repository<BoardActivities>

    constructor() {
        this.boardActivityRepository = dataSource.getRepository(BoardActivities)
    }

    async createNewActivity(user_id: number, board_id: number, action: number, task_id?: number, group_id?: number) {
        const activity: BoardActivities = new BoardActivities()
        activity.user_id = user_id
        activity.board_id = board_id
        activity.action = action
        activity.task_id = task_id
        activity.group_id = group_id

        return await this.boardActivityRepository.save(activity)
    }
}