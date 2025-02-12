import { Router } from "express";
import { auth } from "../middlewares/authenticate.middleware";
import * as workspaceController from "../controllers/workspace.controller";

const workspaceRoute = Router()

workspaceRoute.get('/', auth, workspaceController.getWorkspaces)
workspaceRoute.get('/:workspace_id/boards', auth, workspaceController.getBoards)

export default workspaceRoute