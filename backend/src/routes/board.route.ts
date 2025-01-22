import { Router } from "express";
import * as boardController from "../controllers/board.controller";
import { auth } from "../middlewares/authenticate.middleware";

const route = Router()

route.get('/', auth, boardController.getBoards)
route.post('/', auth, boardController.createBoard)
route.get('/:board_id', auth, boardController.getBoard)

route.get('/:board_id', boardController.fetchBoard)
route.get('/:board_id/groups', boardController.getGroups)
route.post('/:board_id/groups', boardController.addGroup)
route.put('/:board_id/groups/:id', boardController.updateGroup)
route.delete('/:board_id/groups/:id', boardController.deleteGroup)
route.post('/:board_id/groups/:id/task', boardController.createTask)
route.get('/:board_id/groups/:id/tasks', boardController.getTaskInColumn)
route.post('/:board_id/groups/:id/archive-or-unarchive', boardController.archiveOrUnarchiveColumn)
route.post('/:board_id/groups/:id/archive-or-unarchive-all-task', boardController.archiveOrUnarchiveTasksInColumn)
route.get('/:board_id/tasks', boardController.getTasks)
route.put('/:board_id/tasks/:id', boardController.updateTask)
route.delete('/:board_id/tasks/:id', boardController.deleteTask)
route.post('/:board_id/tasks/:id/archive-or-unarchive', boardController.archiveOrUnarchiveTask)
export default route