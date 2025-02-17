import { Router } from "express";
import { auth } from "../middlewares/authenticate.middleware";
import * as workspaceController from "../controllers/workspace.controller";
import { mountWorkspaceById, mountWorkspaceByShortName, workspaceAuthorization } from "../middlewares/workspace.middleware";

const workspaceRoute = Router()

workspaceRoute.get('/', auth, workspaceController.getWorkspaces)

workspaceRoute.get('/:workspace_id', auth, mountWorkspaceById, workspaceAuthorization, workspaceController.getWorkspace)
workspaceRoute.post('/:workspace_id', auth, mountWorkspaceById, workspaceAuthorization, workspaceController.updateWorkspace)

workspaceRoute.get('/short-name/:short_name', auth, mountWorkspaceByShortName, workspaceAuthorization, workspaceController.getWorkspaceByShortName)
workspaceRoute.get('/short-name/:short_name/boards', auth, mountWorkspaceByShortName, workspaceAuthorization, workspaceController.getBoardsInWorkspaceByShortname)
workspaceRoute.get('/short-name/:short_name/boards/:board_name', auth, mountWorkspaceByShortName, workspaceAuthorization, workspaceController.getWorkspaceBoardByName)

workspaceRoute.get('/:workspace_id/boards', auth, mountWorkspaceById, workspaceAuthorization, workspaceController.getBoardsInWorkspace)
workspaceRoute.post('/:workspace_id/boards', auth, mountWorkspaceById, workspaceAuthorization, workspaceController.addBoard)

export default workspaceRoute