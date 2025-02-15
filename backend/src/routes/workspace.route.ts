import { Router } from "express";
import { auth } from "../middlewares/authenticate.middleware";
import * as workspaceController from "../controllers/workspace.controller";

const workspaceRoute = Router()

workspaceRoute.get('/', auth, workspaceController.getWorkspaces)

workspaceRoute.get('/:workspace_id', auth, workspaceController.getWorkspace)
workspaceRoute.post('/:workspace_id', auth, workspaceController.updateWorkspace)

workspaceRoute.get('/short-name/:short_name', auth, workspaceController.getWorkspaceByShortName)
workspaceRoute.get('/short-name/:short_name/boards', auth, workspaceController.getBoardsInWorkspaceByShortname)

workspaceRoute.get('/:workspace_id/boards', auth, workspaceController.getBoardsInWorkspace)
workspaceRoute.post('/:workspace_id/boards', auth, workspaceController.addBoard)

export default workspaceRoute