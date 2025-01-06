import { Repository } from "typeorm";
import dataSource from "../db/data-source";
import { Task } from "../entities/task.entity";
import { Group } from "../entities/column.entity";
import CreateGroupDto from "../dto/board/create-group.dto";
import UpdateGroupDto from "../dto/board/update-group.dto";
import CreateTaskDto from "../dto/board/create-task.dto";
import UpdateTaskDto from "../dto/board/update-task.dto";

export default class BoardService {
    private taskRepository: Repository<Task>
    private groupRepository: Repository<Group>

    constructor() {
        this.taskRepository = dataSource.getRepository(Task)
        this.groupRepository = dataSource.getRepository(Group)
    }

    async getGroups() {
        return this.groupRepository
            .createQueryBuilder()
            .select()
            .orderBy("rank", "DESC")
            .getMany()
    }

    private async getGroupTopRank() {
        return await this.groupRepository
            .createQueryBuilder()
            .select()
            .orderBy("rank", "DESC")
            .getOne()
    }

    async createGroup(data: CreateGroupDto) {
        const { name, description } = data
        const newGroup = new Group()

        const topRank = await this.getGroupTopRank()
        newGroup.name = name
        newGroup.description = description
        newGroup.rank = this.midString(topRank?.rank ?? "", "")
        return await this.groupRepository.save(newGroup)
    }

    async updateGroup(id: number, data: UpdateGroupDto) {
        const { name, description } = data
        const group = await this.groupRepository.findOne({ where: { id } })
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
                .where("id in (:...ids)", { ids: [front_id, behind_id].filter(id => id !== null) })
                .getMany()
            const frontGroupRank = front_id ? groups.find(g => g.id == front_id).rank : null
            const behindGroupRank = behind_id ? groups.find(g => g.id == behind_id).rank : null
            group.rank = this.midString(frontGroupRank ?? "", behindGroupRank ?? "")
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

        targetGroup.rank = this.midString(frontGroup?.rank ?? "", behindGroup?.rank ?? "")
        return await this.groupRepository.save(targetGroup)
    }

    async deleteGroup(id: number) {
        const group = await this.groupRepository.findOne({ where: { id } })
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
            .where("id = :id", { id })
            .execute()
    }

    private async getTaskTopRankInColumn(columnId: number) {
        return await this.taskRepository
            .createQueryBuilder()
            .where("group_id = :groupId", { groupId: columnId })
            .orderBy("rank", "DESC")
            .getOne()
    }

    private async getTaskTopRank() {
        return await this.taskRepository
            .createQueryBuilder()
            .orderBy("rank", "DESC")
            .getOne()
    }

    async addTask(groupId: number, data: CreateTaskDto) {

        const group = await this.groupRepository.findOne({ where: { id: groupId } })

        if (group == null) {
            throw new Error("Group not found")
        }

        const topOrder = await this.getTaskTopRank()


        const newTask: Task = new Task()
        newTask.title = data.title
        newTask.description = data.description
        newTask.group = group
        newTask.priority = data.priority
        newTask.estimate = data.estimate
        newTask.rank = this.midString(topOrder?.rank ?? "", "")

        return await this.taskRepository.save(newTask)
    }

    async getTasks() {
        return await this.taskRepository.createQueryBuilder()
            .select(["id", "title", "estimate", "priority", "description", "rank", "group_id"])
            .orderBy("rank", "DESC")
            .execute()
    }

    private async changeTaskColumn(task: Task, columnId: number) {
        const group = await this.groupRepository.findOne({ where: { id: columnId } })
        if (group == null) { throw new Error("Group not found") }
        task.group = group
    }


    async updateTask(id: number, data: UpdateTaskDto) {


        const task = await this.taskRepository.findOne({
            where: { id },
            relations: {
                group: true
            }
        })

        if (task == null) { throw new Error("Task not found") }

        task.title = data.title
        task.description = data.description
        task.priority = data.priority
        task.estimate = data.estimate


        const isChangeGroup = task.group.id != data.group_id
        if (isChangeGroup) {
            await this.changeTaskColumn(task, data.group_id)
        }

        const { front_id, behind_id } = data
        if (!front_id && !behind_id) {
            if (isChangeGroup) {
                // user click change group only or an empty column 
                // -> need to find the top task in that column and place task
                const topRank = await this.getTaskTopRankInColumn(data.group_id)
                if (topRank) {
                    task.rank = this.midString(topRank?.rank ?? "", "")
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
            task.rank = this.midString(frontTask?.rank ?? "", behindTask?.rank ?? "")
        }
        return this.taskRepository.save(task)
    }

    async deleteTask(id: number) {
        await this.taskRepository.createQueryBuilder()
            .softDelete().where("id = :id", { id })
            .execute()
    }

    async getBoard() {
        const columns = await this.groupRepository.find()
        const tasks = await this.taskRepository.find()

        return { tasks, columns }
    }

    async getTasksInColumn(columnId: number) {
        const tasks = await this.taskRepository.find({
            relations: { group: true },
            where: {
                group: {
                    id: columnId
                }
            }
        })
        return tasks
    }

    private midString(prev: string, next: string) {
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