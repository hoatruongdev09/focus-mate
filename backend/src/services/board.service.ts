import { In, Repository } from "typeorm";
import dataSource from "../db/data-source";
import { Task } from "../entities/task.entity";
import { Group } from "../entities/column.entity";
import CreateGroupDto from "../dto/board/create-group.dto";
import UpdateGroupDto from "../dto/board/update-group.dto";
import CreateTaskDto from "../dto/board/create-task.dto";
import UpdateTaskDto from "../dto/board/update-task.dto";
import Board from "../entities/board.entity";
import User from "../entities/user.entity";
import CreateBoardDto from "../dto/board/create-board.dto";
import UserComment from "../entities/user-comment.entity";
import UpdateBoardDto from "../dto/board/update-board.dto";


export default class BoardService {
    private taskRepository: Repository<Task>
    private groupRepository: Repository<Group>
    private boardRepository: Repository<Board>
    private userCommentRepository: Repository<UserComment>

    constructor() {
        this.taskRepository = dataSource.getRepository(Task)
        this.groupRepository = dataSource.getRepository(Group)
        this.boardRepository = dataSource.getRepository(Board)
        this.userCommentRepository = dataSource.getRepository(UserComment)
    }

    async getBoards(user_id: number): Promise<Board[]> {
        return await this.boardRepository.createQueryBuilder("board")
            .leftJoinAndSelect("board.owner", "user")
            .leftJoinAndSelect("board.theme", "board_theme")
            .where("user.id = :user_id", { user_id })
            .getMany()
    }

    async getBoard(board_id: number, user_id: number): Promise<Board> {
        return await this.boardRepository.createQueryBuilder("board")
            .leftJoinAndSelect("board.owner", "user")
            .leftJoinAndSelect("board.theme", "board_theme")
            .where("user.id = :user_id AND board.id =:board_id", { user_id, board_id })
            .getOne()
    }

    async updateBoard(board_id: number, user_id: number, data: UpdateBoardDto): Promise<Board> {
        const board = await this.boardRepository.createQueryBuilder("board")
            .leftJoinAndSelect("board.owner", "user")
            .where("user.id =:user_id AND board.id =:board_id", { user_id, board_id })
            .getOne()

        if (!board) {
            throw new Error("Board not found")
        }

        board.name = data.title
        board.description = data.description

        return await this.boardRepository.save(board)

    }

    async createBoard(user_id: number, data: CreateBoardDto): Promise<Board> {
        const { title, description } = data
        const existBoard = await this.boardRepository.findOne({
            where: {
                owner: {
                    id: user_id
                },
                name: title
            }
        })
        if (existBoard) {
            throw new Error("Title is exist")
        }

        const newBoard = new Board()
        newBoard.name = title
        newBoard.description = description
        newBoard.owner = { id: user_id } as User

        return await this.boardRepository.save(newBoard)
    }
    async unarchiveTask(board_id: number, group_id: number, task_id: number) {
        const task = await this.taskRepository.findOne({
            where: {
                id: task_id,
                group: {
                    id: group_id,
                    board: {
                        id: board_id
                    }
                }
            }
        })
        if (!task) {
            throw new Error("Task not foud")
        }
        task.archived = false;
        return await this.taskRepository.save(task)
    }
    async archiveTask(board_id: number, group_id: number, task_id: number) {
        const task = await this.taskRepository.findOne({
            where: {
                id: task_id,
                group: {
                    id: group_id,
                    board: {
                        id: board_id
                    }
                }
            }
        })
        if (!task) {
            throw new Error("Task not foud")
        }
        task.archived = true;
        return await this.taskRepository.save(task)
    }


    async archiveColumn(board_id: number, column_id: number) {
        const column = await this.groupRepository.findOne({
            where: {
                id: column_id, board: {
                    id: board_id
                }
            }
        })
        if (!column) {
            throw new Error("Column not found")
        }
        column.archived = true
        console.log(`archived columnnnn`)
        return await this.groupRepository.save(column)
    }

    async unarchiveColumn(board_id: number, column_id: number) {
        const column = await this.groupRepository.findOne({
            where: {
                id: column_id, board: {
                    id: board_id
                }
            }
        })
        if (!column) {
            throw new Error("Column not found")
        }
        column.archived = false
        return await this.groupRepository.save(column)
    }

    async archiveOrUnarchiveTasksInColumn(board_id: number, column_id: number, archived: boolean) {
        const affectedTaskIds = await this.taskRepository
            .createQueryBuilder("task")
            .leftJoinAndSelect("task.group", "group")
            .leftJoinAndSelect("group.board", "board")
            .select(["task.id"])
            .where("group.id = :column_id AND board.id = :board_id", { column_id, board_id })
            .getMany()

        if (affectedTaskIds?.length != 0) {
            await this.taskRepository
                .createQueryBuilder("task")
                .update()
                .set({ archived: archived })
                .where("task.id IN(:...ids)", { ids: affectedTaskIds.map(t => t.id) })
                .execute()
        }


        const tasks = await this.taskRepository
            .createQueryBuilder("task")
            .leftJoin("task.group", "group")
            .leftJoin("group.board", "board")
            .where("group.id = :column_id AND board.id = :board_id", { column_id, board_id })
            .getMany()

        return tasks.map(t => {
            const { group, ...task } = t

            return {
                ...task,
                group_id: group.id,
                board_id: group.board.id
            }
        })
    }

    async getGroups(board_id: number) {
        const groups: Group[] = await this.groupRepository
            .createQueryBuilder("group")
            .leftJoinAndSelect("group.board", "board")
            .addSelect(["board.id"])
            .where("board_id = :board_id", { board_id })
            .orderBy("rank", "DESC")
            .getMany()

        return groups.map(g => {
            const { board, ...data } = g
            return {
                ...data,
                board_id: board.id
            }
        })
    }

    async getGroup(board_id: number, group_id: number) {
        return await this.groupRepository.createQueryBuilder("group")
            .leftJoinAndSelect("group.board", "board")
            .where("group.id = :group_id AND board.id = :board_id", { group_id, board_id })
            .getOne()
    }

    private async getGroupTopRank(board_id: number) {
        return await this.groupRepository
            .createQueryBuilder()
            .select()
            .where("board_id = :board_id", { board_id })
            .orderBy("rank", "DESC")
            .getOne()
    }

    private async findBoard(board_id: number): Promise<Board> {
        return await this.boardRepository.createQueryBuilder("board")
            .leftJoin("board.owner", "user")
            .leftJoinAndSelect("board.theme", "board_theme")
            .select()
            .where("board.id =:board_id", { board_id })
            .getOne()
    }

    async createGroup(board_id: number, data: CreateGroupDto) {
        const { name, description } = data

        const board = await this.findBoard(board_id)
        if (!board) {
            throw new Error("Board not found")
        }

        const newGroup = new Group()

        const topRank = await this.getGroupTopRank(board_id)
        newGroup.name = name || "Untitled list"
        newGroup.description = description
        newGroup.rank = this.findMiddleString(topRank?.rank ?? "", "")
        newGroup.board = board
        return await this.groupRepository.save(newGroup)
    }

    async updateGroup(board_id: number, id: number, data: UpdateGroupDto) {
        const { name, description } = data

        const group = await this.groupRepository.findOne({
            where: {
                id,
                board: {
                    id: board_id
                }
            }
        })
        if (group == null) {
            throw new Error("Group not found")
        }
        group.name = name
        group.description = description

        const { front_id, behind_id } = data
        if (front_id || behind_id) {
            const groups = await this.groupRepository
                .createQueryBuilder()
                .select()
                .where("id in (:...ids) AND board_id = :board_id", { board_id, ids: [front_id, behind_id].filter(id => id !== null) })
                .getMany()
            const frontGroupRank = front_id ? groups.find(g => g.id == front_id).rank : null
            const behindGroupRank = behind_id ? groups.find(g => g.id == behind_id).rank : null
            group.rank = this.findMiddleString(frontGroupRank ?? "", behindGroupRank ?? "")
        }

        return await this.groupRepository.save(group)
    }

    async reorderGroup(targetId: number, frontId: number | null, behindId: number | null) {
        const groups = await this.groupRepository
            .createQueryBuilder()
            .select()
            .where("id in (:...ids)", { ids: [targetId, frontId, behindId].filter(id => id !== null) })
            .getMany()
        const targetGroup: Group = groups.find(g => g.id === targetId)

        if (!frontId && !behindId) {
            return targetGroup
        }

        const frontGroup: Group | null = frontId ? groups.find(g => g.id === frontId) : null
        const behindGroup: Group | null = behindId ? groups.find(g => g.id === behindId) : null

        targetGroup.rank = this.findMiddleString(frontGroup?.rank ?? "", behindGroup?.rank ?? "")
        return await this.groupRepository.save(targetGroup)
    }

    async deleteGroup(board_id: number, id: number) {
        const group = await this.groupRepository.findOne({
            where: {
                id,
                board: {
                    id: board_id
                }
            }
        })
        if (group == null) {
            throw new Error("Group not found")
        }
        await this.taskRepository
            .createQueryBuilder()
            .softDelete()
            .where("group_id = :id", { id: group.id })
            .execute()
        await this.groupRepository.createQueryBuilder()
            .softDelete()
            .where("id = :id AND board_id = :board_id", { id, board_id })
            .execute()
    }

    private async getTaskLowestRankInColumn(columnId: number) {
        return await this.taskRepository
            .createQueryBuilder()
            .where("group_id = :groupId", { groupId: columnId })
            .orderBy("rank")
            .getOne()
    }

    private async getTaskTopRankInColumn(columnId: number) {
        return await this.taskRepository
            .createQueryBuilder()
            .where("group_id = :groupId", { groupId: columnId })
            .orderBy("rank", "DESC")
            .getOne()
    }

    private async getTaskLowestRank() {
        return await this.taskRepository
            .createQueryBuilder()
            .orderBy("rank")
            .getOne()
    }

    private async getTaskTopRank() {
        return await this.taskRepository
            .createQueryBuilder()
            .orderBy("rank", "DESC")
            .getOne()
    }

    async addTask(board_id: number, groupId: number, data: CreateTaskDto) {

        const group = await this.groupRepository.findOne({
            where: {
                id: groupId, board: {
                    id: board_id
                }
            }
        })

        if (group == null) {
            throw new Error("Group not found")
        }


        const newTask: Task = new Task()
        newTask.title = data.title
        newTask.description = data.description
        newTask.group = group
        newTask.priority = data.priority
        newTask.estimate = data.estimate
        if (group) {
            const lowestRank = await this.getTaskLowestRankInColumn(groupId)
            newTask.rank = this.findMiddleString("", lowestRank?.rank ?? "")
        } else {
            const lowestRank = await this.getTaskLowestRank()
            newTask.rank = this.findMiddleString("", lowestRank?.rank ?? "")
        }
        return await this.taskRepository.save(newTask)
    }

    async getTasks(board_id: number) {

        const tasks = await this.taskRepository
            .createQueryBuilder("task")
            .leftJoin("task.group", "group")
            .leftJoin("group.board", "board")
            .select(["task", "group.id", "board.id"])
            .where("board.id = :board_id", { board_id })
            .orderBy("task.rank", "DESC")
            .getMany();
        return tasks.map(t => {
            const { group, ...task } = t
            return {
                ...task,
                group_id: group.id,
                board_id: group.board.id
            }
        })
    }

    private async changeTaskColumn(task: Task, board_id: number, columnId: number) {
        const group = await this.getGroup(board_id, columnId)
        if (group == null) { throw new Error("Group not found") }
        task.group = group
    }


    async updateTask(board_id: number, id: number, data: UpdateTaskDto) {

        const task = await this.taskRepository.createQueryBuilder("task")
            .leftJoinAndSelect("task.group", "group")
            .leftJoinAndSelect("group.board", "board")
            .where("board.id = :board_id AND task.id = :id", { board_id, id })
            .getOne()

        if (task == null) { throw new Error("Task not found") }
        task.title = data.title
        task.description = data.description
        task.priority = data.priority
        task.estimate = data.estimate
        task.cover_type = data.cover_type
        task.cover_value = data.cover_value
        task.layout_type = data.layout_type

        const isChangeGroup = task.group.id != data.group_id
        if (isChangeGroup) {
            await this.changeTaskColumn(task, board_id, data.group_id)
        }

        const { front_id, behind_id } = data
        if (!front_id && !behind_id) {
            if (isChangeGroup) {
                // user click change group only or an empty column 
                // -> need to find the top task in that column and place task
                const topRank = await this.getTaskTopRankInColumn(data.group_id)
                if (topRank) {
                    task.rank = this.findMiddleString(topRank?.rank ?? "", "")
                }
            }

        } else {
            // user drag into column 
            // -> do like reorder column
            const tasks = await this.taskRepository
                .createQueryBuilder()
                .select()
                .where("id in (:...ids)", { ids: [front_id, behind_id].filter(id => id !== null) })
                .getMany()
            const frontTask = front_id ? tasks.find(t => t.id === front_id) : null
            const behindTask = behind_id ? tasks.find(t => t.id === behind_id) : null
            task.rank = this.findMiddleString(frontTask?.rank ?? "", behindTask?.rank ?? "")
        }
        const newTask = await this.taskRepository.save(task)
        const { title, estimate, priority, description, rank, group } = newTask
        return {
            id,
            title,
            estimate,
            priority,
            description,
            rank,
            group_id: group.id,
            board_id: group.board.id
        }
    }

    async deleteTask(board_id: number, id: number) {
        const task = await this.taskRepository.createQueryBuilder("task")
            .leftJoin("task.group", "group")
            .leftJoin("group.board", "board")
            .where("task.id = :id AND board.id = :board_id", { id, board_id })
            .getOne()

        if (!task) { return }
        if (!task.archived) {
            throw new Error("Task is not archived yet")
        }
        await this.taskRepository.softRemove(task)
    }

    async getBoardColumnsAndTasks(board_id: number) {
        const columns = await this.groupRepository.find({
            where: {
                board: {
                    id: board_id
                }
            }
        })
        const tasks = await this.taskRepository.find({
            where: {
                group: {
                    id: In([columns.map(col => col.id)])
                }
            }
        })

        return { tasks, columns }
    }

    async getTasksInColumn(board_id: number, columnId: number) {
        const tasks = await this.taskRepository.find({
            relations: { group: true },
            where: {
                group: {
                    id: columnId,
                    board: {
                        id: board_id
                    }
                }
            }
        })
        return tasks
    }

    async getTask(board_id: number, column_id: number, task_id: number) {
        return await this.taskRepository.findOne({
            where: {
                id: task_id,
                group: {
                    id: column_id,
                    board: {
                        id: board_id
                    }
                }
            }
        })
    }

    async postComment(board_id: number, group_id: number, task_id: number, user_id: number, content: string) {
        const comment: UserComment = new UserComment()
        comment.board_id = board_id
        comment.task_id = task_id
        comment.group_id = group_id
        comment.user_id = user_id
        comment.content = content

        const { id } = await this.userCommentRepository.save(comment)

        const result = await this.userCommentRepository.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.user", "user")
            .where("comment.board_id = :board_id AND comment.group_id = :group_id AND comment.task_id = :task_id AND comment.id = :comment_id", { board_id, group_id, task_id, comment_id: id })
            .select(["comment", "user.id", "user.first_name", "user.last_name"])
            .getOne()
        return result
    }

    async getComments(board_id: number, group_id: number, task_id: number) {
        return await this.userCommentRepository.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.user", "user")
            .where("comment.board_id = :board_id AND comment.group_id = :group_id AND comment.task_id = :task_id", { board_id, group_id, task_id })
            .orderBy("comment.created_at", "DESC")
            .select(["comment", "user.id", "user.first_name", "user.last_name"])
            .getMany()
    }

    async getArchivedCards(board_id: number) {
        return await this.taskRepository.createQueryBuilder("task")
            .leftJoin("task.group", "group")
            .leftJoin("group.board", "board")
            .where("task.archived = true AND board.id =:board_id", { board_id })
            .getMany()
    }

    async getArchivedLists(board_id: number) {
        return await this.groupRepository.createQueryBuilder("group")
            .leftJoin("group.board", "board")
            .where("board.id = :board_id AND group.archived", { board_id })
            .getMany()
    }

    private findMiddleString(prev: string, next: string) {
        var p, n, pos, str;
        for (pos = 0; p == n; pos++) {               // find leftmost non-matching character
            p = pos < prev.length ? prev.charCodeAt(pos) : 96;
            n = pos < next.length ? next.charCodeAt(pos) : 123;
        }
        str = prev.slice(0, pos - 1);                // copy identical part of string
        if (p == 96) {                               // prev string equals beginning of next
            while (n == 97) {                        // next character is 'a'
                n = pos < next.length ? next.charCodeAt(pos++) : 123;  // get char from next
                str += 'a';                          // insert an 'a' to match the 'a'
            }
            if (n == 98) {                           // next character is 'b'
                str += 'a';                          // insert an 'a' to match the 'b'
                n = 123;                             // set to end of alphabet
            }
        }
        else if (p + 1 == n) {                       // found consecutive characters
            str += String.fromCharCode(p);           // insert character from prev
            n = 123;                                 // set to end of alphabet
            while ((p = pos < prev.length ? prev.charCodeAt(pos++) : 96) == 122) {  // p='z'
                str += 'z';                          // insert 'z' to match 'z'
            }
        }
        return str + String.fromCharCode(Math.ceil((p + n) / 2)); // append middle character
    }
}

