import { Router } from "express";
import { addGroup, createTask, deleteGroup, deleteTask, fetchBoard, getGroups, getTaskInColumn, getTasks, updateGroup, updateTask } from "../controllers/board.controller";

const route = Router()
route.get('/', fetchBoard)
route.get('/groups', getGroups)
route.post('/groups', addGroup)
route.put('/groups/:id', updateGroup)
route.delete('/groups/:id', deleteGroup)
route.post('/groups/:id/task', createTask)
route.get('/groups/:id/tasks', getTaskInColumn)
route.get('/tasks', getTasks)
route.put('/tasks/:id', updateTask)
route.delete('/tasks/:id', deleteTask)

export default route