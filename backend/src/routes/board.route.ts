import { Router } from "express";
import * as boardController from "../controllers/board.controller";
import { auth } from "../middlewares/authenticate.middleware";

const route = Router()

route.get('/', auth, boardController.getBoards)
route.post('/', auth, boardController.createBoard)
route.get('/:board_id', auth, boardController.getBoard)

route.get('/:board_id/groups', auth, boardController.getGroups)
route.post('/:board_id/groups', auth, boardController.addGroup)
route.put('/:board_id/groups/:id', auth, boardController.updateGroup)
route.delete('/:board_id/groups/:id', auth, boardController.deleteGroup)
route.post('/:board_id/groups/:id/task', auth, boardController.createTask)
route.get('/:board_id/groups/:id/tasks', auth, boardController.getTaskInColumn)
route.post('/:board_id/groups/:id/archive-or-unarchive', auth, boardController.archiveOrUnarchiveColumn)
route.post('/:board_id/groups/:id/archive-or-unarchive-all-task', auth, boardController.archiveOrUnarchiveTasksInColumn)
route.get('/:board_id/tasks', auth, boardController.getTasks)
route.put('/:board_id/tasks/:id', auth, boardController.updateTask)
route.delete('/:board_id/tasks/:id', auth, boardController.deleteTask)
route.post('/:board_id/:group_id/tasks/:task_id/archive-or-unarchive', auth, boardController.archiveOrUnarchiveTask)
route.post('/:board_id/:group_id/tasks/:task_id/comment', auth, boardController.userCommentTask)
route.get('/:board_id/:group_id/tasks/:task_id/comments', auth, boardController.getTaskComments)
route.get('/theme')
export default route