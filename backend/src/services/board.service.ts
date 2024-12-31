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
        return this.groupRepository.find()
    }

    async createGroup(data: CreateGroupDto) {
        const { name, description } = data
        const newGroup = new Group()
        newGroup.name = name
        newGroup.description = description
        const [groups, groupCount] = await this.groupRepository.findAndCount()
        newGroup.order_by = groupCount
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
        return await this.groupRepository.save(group)
    }

    async deleteGroup(id: number) {
        const group = await this.groupRepository.findOne({ where: { id } })
        if (group == null) {
            throw new Error("Group not found")
        }
        await this.taskRepository
            .createQueryBuilder()
            .softDelete()
            .where("groupId = :id", { id: group.id })
            .execute()
        await this.groupRepository.createQueryBuilder()
            .softDelete()
            .where("id = :id", { id })
            .execute()
    }

    async addTask(groupId: number, data: CreateTaskDto) {
        const group = await this.groupRepository.findOne({ where: { id: groupId } })
        if (group == null) {
            throw new Error("Group not found")
        }

        const newTask: Task = new Task()
        newTask.title = data.title
        newTask.description = data.description
        newTask.group = group
        newTask.priority = data.priority
        newTask.estimate = data.estimate

        return await this.taskRepository.save(newTask)
    }

    async getTasks() {
        return await this.taskRepository.find({
            relations: {
                group: true
            },
            select: {
                group: { id: true }
            }
        })
    }

    async updateTask(id: number, data: UpdateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: {
                group: true
            }
        })
        if (task == null) {
            throw new Error("Task not found")
        }

        task.title = data.title
        task.description = data.description
        task.priority = data.priority
        task.estimate = data.estimate

        if (task.group.id != data.column_id) {
            const group = await this.groupRepository.findOne({ where: { id: data.column_id } })

            if (group == null) {
                throw new Error("Group not found")
            }

            task.group = group
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
}