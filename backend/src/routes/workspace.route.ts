import { Router } from "express";
import { authenticationGuard } from "../middlewares/authentication-guard.middleware";
import * as workspaceController from "../controllers/workspace.controller";
import { mountWorkspaceById, mountWorkspaceByShortName, workspaceAuthorization } from "../middlewares/workspace.middleware";
import { authentication } from "../middlewares/authentication.middleware";

const workspaceRoute = Router()

workspaceRoute.get('/', authenticationGuard, workspaceController.getWorkspaces)

workspaceRoute.get('/:workspace_id', authentication, mountWorkspaceById, workspaceAuthorization, workspaceController.getWorkspace)
workspaceRoute.post('/:workspace_id', authentication, mountWorkspaceById, workspaceAuthorization, workspaceController.updateWorkspace)

workspaceRoute.get('/short-name/:short_name', authentication, mountWorkspaceByShortName, workspaceAuthorization, workspaceController.getWorkspaceByShortName)
workspaceRoute.get('/short-name/:short_name/boards', authentication, mountWorkspaceByShortName, workspaceAuthorization, workspaceController.getBoardsInWorkspaceByShortname)
workspaceRoute.get('/short-name/:short_name/boards/:board_name', authentication, mountWorkspaceByShortName, workspaceAuthorization, workspaceController.getWorkspaceBoardByName)

workspaceRoute.get('/:workspace_id/boards', authentication, mountWorkspaceById, workspaceAuthorization, workspaceController.getBoardsInWorkspace)
workspaceRoute.post('/:workspace_id/boards', authentication, mountWorkspaceById, workspaceAuthorization, workspaceController.addBoard)

export default workspaceRoute