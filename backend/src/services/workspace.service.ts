import { Repository } from "typeorm";
import Workspace from "../entities/workspace.entity";
import dataSource from "../db/data-source";
import WorkspaceMember from "../entities/workspace-member.entity";
import WorkspaceRole from "../enums/workspace-role";


export class WorkspaceService {
    private workspaceRepository: Repository<Workspace>
    private workspaceMemberRepository: Repository<WorkspaceMember>

    constructor() {
        this.workspaceRepository = dataSource.getRepository(Workspace)
        this.workspaceMemberRepository = dataSource.getRepository(WorkspaceMember)
    }

    async createBoard(user_id: number, name: string, description: string) {
        const workspace = new Workspace()
        workspace.name = name
        workspace.description = description

        const newWorkspace = await this.workspaceRepository.save(workspace)
        const member = new WorkspaceMember()
        member.user_id = user_id
        member.workspace_id = newWorkspace.id
        member.role = WorkspaceRole.Owner

        await this.workspaceMemberRepository.save(member)

        return await this.getWorkspace(newWorkspace.id)
    }

    async getBoardsInWorkspace(workspace_id: number) {
        const workspace = await this.workspaceRepository.createQueryBuilder("workspace")
            .leftJoinAndSelect("workspace.boards", "board")
            .where("workspace.id =:workspace_id", { workspace_id })
            .getOne()
        if (!workspace) {
            throw new Error("Workspace not found")
        }
        return workspace.boards
    }

    async getJoinedWorkspaces(user_id: number) {
        return await this.workspaceRepository.createQueryBuilder("workspace")
            .leftJoinAndSelect("workspace.members", "workspace_member")
            .leftJoinAndSelect("workspace_member.user", "user")
            .where("user.id =:user_id", { user_id })
            .getMany()
    }


    async getWorkspace(id: number) {
        return await this.workspaceRepository
            .createQueryBuilder("workspace")
            .leftJoinAndSelect("workspace.members", "workspace_member")
            .leftJoinAndSelect("workspace_member.user", "user")
            .where("workspace.id = :id", { id })
            .getOne()
    }


}

export const workspaceService: WorkspaceService = new WorkspaceService()
