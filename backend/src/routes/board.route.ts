import { Router } from "express";
import * as boardController from "../controllers/board.controller";

const route = Router()
route.get('/', boardController.fetchBoard)
route.get('/groups', boardController.getGroups)
route.post('/groups', boardController.addGroup)
route.put('/groups/:id', boardController.updateGroup)
route.delete('/groups/:id', boardController.deleteGroup)
route.post('/groups/:id/task', boardController.createTask)
route.get('/groups/:id/tasks', boardController.getTaskInColumn)
route.get('/tasks', boardController.getTasks)
route.put('/tasks/:id', boardController.updateTask)
route.delete('/tasks/:id', boardController.deleteTask)
route.post('/tasks/archive-or-unarchive/:task_id', boardController.archiveOrUnarchiveTask)
export default route