import { Repository } from "typeorm";
import Workspace from "../entities/workspace.entity";
import dataSource from "../db/data-source";
import WorkspaceMember from "../entities/workspace-member.entity";
import WorkspaceRole from "../enums/workspace-role";
import Board from "../entities/board.entity";
import CreateBoardDto from "../dto/board/create-board.dto";
import UpdateWorkspaceDto from "../dto/workspace/update-workspace-dto";
import { generateUUID } from "../utils/uuid-generate";
import Customer from "../entities/customer.entity";


export class WorkspaceService {
    private workspaceRepository: Repository<Workspace>
    private workspaceMemberRepository: Repository<WorkspaceMember>
    private boardRepository: Repository<Board>


    constructor() {
        this.workspaceRepository = dataSource.getRepository(Workspace)
        this.workspaceMemberRepository = dataSource.getRepository(WorkspaceMember)
        this.boardRepository = dataSource.getRepository(Board)
    }

    async createWorkspace(user_id: string, short_name: string, name: string, description: string) {
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

        return await this.getById(newWorkspace.id)
    }
    async getById(id: string) {
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
            .leftJoinAndSelect("workspace.members", "workspace_member")
            .leftJoinAndSelect("workspace_member.user", "user")
            .where("workspace.short_name = :short_name", { short_name })
            .getOne()
    }

    async updateWorkspace(workspace_id: string, data: UpdateWorkspaceDto) {
        const workspace = await this.getById(workspace_id)
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

        return await this.getById(workspace_id)
    }

    async getBoardsInWorkspace(workspace_id: string, customer_id: string) {
        const boards = await this.boardRepository.createQueryBuilder("board")
            .leftJoin("board.workspace", "workspace")
            .leftJoinAndSelect("board.owner", "customer")
            .leftJoinAndSelect("board.theme", "board_theme")
            .where("workspace.id = :workspace_id", { workspace_id })
            .orderBy("board.created_at")
            .getMany()
        return boards
    }

    async getBoardsInWorkspaceByShortname(short_name: string, customer_id: string) {
        const boards = await this.boardRepository.createQueryBuilder("board")
            .leftJoin("board.workspace", "workspace")
            .leftJoinAndSelect("board.owner", "customer")
            .leftJoinAndSelect("board.theme", "board_theme")
            .where("workspace.short_name = :short_name", { short_name })
            .orderBy("board.created_at")
            .getMany()
        return boards
    }

    async getWorkspaces(user_id: string) {
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

    async addBoard(customer_id: string, workspace_id: string, data: CreateBoardDto) {
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

    async getBoardByName(short_name: string, board_name: string) {
        const board = await this.boardRepository
            .createQueryBuilder("board")
            .leftJoin("board.workspace", "workspace")
            .leftJoinAndSelect("board.owner", "user")
            .leftJoinAndSelect("board.theme", "board_theme")
            .where("workspace.short_name = :short_name AND board.name LIKE :board_name", { short_name, board_name })
            .getOne()

        return board
    }

    async getMemberRoleInWorkspace(member_id: string, workspace_id: string) {
        return await this.workspaceMemberRepository
            .createQueryBuilder("workspace_member")
            .where("workspace_id = :workspace_id AND user_id = :member_id", { workspace_id, member_id })
            .getOne()
    }

    async getWorkspaceMember(workspace_id: string) {
        return await this.workspaceMemberRepository
            .createQueryBuilder("workspace_member")
            .leftJoinAndSelect("workspace_member.user", "user")
            .where("workspace_id = :workspace_id", { workspace_id })
            .getMany()
    }

    async createInviteLink(workspace_id: string) {
        await this.workspaceRepository
            .createQueryBuilder("workspace")
            .update()
            .set({
                invite_id: generateUUID().replace("-", "")
            })
            .where("workspace.id = :workspace_id", { workspace_id })
            .execute()

        return await this.workspaceRepository
            .createQueryBuilder("workspace")
            .where("workspace.id = :workspace_id", { workspace_id })
            .getOne()
    }

    async disableInviteLink(workspace_id: string) {
        await this.workspaceRepository
            .createQueryBuilder("workspace")
            .update()
            .set({
                invite_id: null
            })
            .where("workspace.id = :workspace_id", { workspace_id })
            .execute()
        return await this.workspaceRepository
            .createQueryBuilder("workspace")
            .where("workspace.id = :workspace_id", { workspace_id })
            .getOne()
    }

    async inviteByLink(workspace_id: string, invite_id: string, customer_id: string) {
        const workspace = await this.workspaceRepository
            .createQueryBuilder("workspace")
            .where("workspace.id = :workspace_id AND workspace.invite_id = :invite_id", { workspace_id, invite_id })
            .getOne()
        if (!workspace) {
            throw new Error("Invite link is not valid")
        }
        const member = await this.workspaceMemberRepository
            .createQueryBuilder("workspace_member")
            .where("workspace_member.workspace_id = :workspace_id AND workspace_member.user_id = :customer_id", { workspace_id, customer_id })
            .getOne()
        console.log(`has member: ${customer_id}`, member)
        if (member) {
            return
        }
        await this.workspaceMemberRepository
            .createQueryBuilder("workspace_member")
            .insert()
            .values({
                user_id: customer_id,
                workspace_id: workspace_id,
                role: WorkspaceRole.Member
            })
            .execute()
    }
}



export const workspaceService: WorkspaceService = new WorkspaceService()
