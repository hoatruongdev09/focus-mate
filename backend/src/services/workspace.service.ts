import { Repository } from "typeorm";
import Workspace from "../entities/workspace.entity";
import dataSource from "../db/data-source";
import WorkspaceMember from "../entities/workspace-member.entity";
import WorkspaceRole from "../enums/workspace-role";
import Board from "../entities/board.entity";
import CreateBoardDto from "../dto/board/create-board.dto";
import UpdateWorkspaceDto from "../dto/workspace/update-workspace-dto";


export class WorkspaceService {
    private workspaceRepository: Repository<Workspace>
    private workspaceMemberRepository: Repository<WorkspaceMember>
    private boardRepository: Repository<Board>

    constructor() {
        this.workspaceRepository = dataSource.getRepository(Workspace)
        this.workspaceMemberRepository = dataSource.getRepository(WorkspaceMember)
        this.boardRepository = dataSource.getRepository(Board)
    }

    async createWorkspace(user_id: number, short_name: string, name: string, description: string) {
        const workspace = new Workspace()
        workspace.name = name
        workspace.short_name = short_name
        workspace.description = description

        const newWorkspace = await this.workspaceRepository.save(workspace)
        const member = new WorkspaceMember()
        member.user_id = user_id
        member.workspace_id = newWorkspace.id
        member.role = WorkspaceRole.Owner

        await this.workspaceMemberRepository.save(member)

        return await this.getWorkspace(newWorkspace.id)
    }
    async getWorkspace(id: number) {
        return this.workspaceRepository
            .createQueryBuilder("workspace")
            .leftJoinAndSelect("workspace.members", "workspace_member")
            .leftJoinAndSelect("workspace_member.user", "user")
            .where("workspace.id = :id", { id })
            .getOne()
    }

    async getByShortName(short_name: string) {
        return this.workspaceRepository
            .createQueryBuilder("workspace")
            .where("workspace.short_name = :short_name", { short_name })
            .getOne()
    }

    async updateWorkspace(workspace_id: number, data: UpdateWorkspaceDto) {
        const workspace = await this.getWorkspace(workspace_id)
        if (!workspace) {
            throw new Error("Work space not found")
        }
        if (workspace.short_name != data.short_name) {
            const workspaceWithShortName = await this.getByShortName(data.short_name)
            if (workspaceWithShortName) {
                throw new Error("Short name is already taken")
            }
        }

        const { name, short_name, description } = data

        await this.workspaceRepository.createQueryBuilder()
            .update({
                name, short_name, description
            }).where("id =:id", { id: workspace.id })
            .execute()

        return await this.getWorkspace(workspace_id)
    }

    async getBoardsInWorkspace(workspace_id: number, customer_id: number) {
        const boards = await this.boardRepository.createQueryBuilder("board")
            .leftJoin("board.workspace", "workspace")
            .leftJoinAndSelect("board.owner", "customer")
            .leftJoinAndSelect("board.theme", "board_theme")
            .where("workspace.id = :workspace_id", { workspace_id })
            .orderBy("board.created_at")
            .getMany()
        return boards
    }

    async getBoardsInWorkspaceByShortname(short_name: string, customer_id: number) {
        const boards = await this.boardRepository.createQueryBuilder("board")
            .leftJoin("board.workspace", "workspace")
            .leftJoinAndSelect("board.owner", "customer")
            .leftJoinAndSelect("board.theme", "board_theme")
            .where("workspace.short_name = :short_name", { short_name })
            .orderBy("board.created_at")
            .getMany()
        return boards
    }

    async getWorkspaces(user_id: number) {
        return await this.workspaceRepository.createQueryBuilder("workspace")
            .leftJoinAndSelect("workspace.members", "workspace_member")
            .leftJoinAndSelect("workspace_member.user", "user")
            .where("user.id =:user_id", { user_id })
            .orderBy({
                "workspace_member.role": "DESC",
                "workspace.name": "ASC"
            })
            .getMany()
    }

    async addBoard(customer_id: number, workspace_id: number, data: CreateBoardDto) {
        const { title, description } = data

        let board = await this.boardRepository.createQueryBuilder("board")
            .leftJoin("board.workspace", "workspace")
            .leftJoin("board.owner", "user")
            .where("workspace.id = :workspace_id AND user.id = :customer_id and board.name = :title", { workspace_id, customer_id, title })
            .getOne()

        if (board) {
            throw new Error("Title is exist")
        }

        board = new Board()
        board.name = title
        board.description = description
        board.owner_id = customer_id
        board.workspace_id = workspace_id

        return await this.boardRepository.save(board)
    }


}

export const workspaceService: WorkspaceService = new WorkspaceService()
