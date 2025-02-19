import { Router } from "express";
import * as boardController from "../controllers/board.controller";
import { authenticationGuard } from "../middlewares/authentication-guard.middleware";

const boardRoute = Router()

boardRoute.get('/', authenticationGuard, boardController.getBoards)
boardRoute.post('/', authenticationGuard, boardController.createBoard)

boardRoute.get('/:board_id/activities', authenticationGuard, boardController.getBoardActivities)
boardRoute.get('/:board_id', authenticationGuard, boardController.getBoard)
boardRoute.post('/:board_id', authenticationGuard, boardController.updateBoard)

boardRoute.get('/:board_id/archived-cards', authenticationGuard, boardController.getArchivedCards)
boardRoute.get('/:board_id/archived-lists', authenticationGuard, boardController.getArchivedLists)

boardRoute.get('/:board_id/lists', authenticationGuard, boardController.getLists)
boardRoute.post('/:board_id/lists', authenticationGuard, boardController.addList)
boardRoute.put('/:board_id/lists/:id', authenticationGuard, boardController.updateList)
boardRoute.delete('/:board_id/lists/:id', authenticationGuard, boardController.deleteList)
boardRoute.post('/:board_id/lists/:list_id/card', authenticationGuard, boardController.createCard)
boardRoute.get('/:board_id/lists/:list_id/cards', authenticationGuard, boardController.getCardInList)
boardRoute.post('/:board_id/lists/:id/archive-or-unarchive', authenticationGuard, boardController.archiveOrUnarchiveList)
boardRoute.post('/:board_id/lists/:id/archive-or-unarchive-all-card', authenticationGuard, boardController.archiveOrUnarchiveCardsInList)
boardRoute.get('/:board_id/cards', authenticationGuard, boardController.getCards)
boardRoute.put('/:board_id/cards/:id', authenticationGuard, boardController.updateCard)
boardRoute.delete('/:board_id/cards/:id', authenticationGuard, boardController.deleteCard)
boardRoute.post('/:board_id/:list_id/cards/:card_id/archive-or-unarchive', authenticationGuard, boardController.archiveOrUnarchiveCard)
boardRoute.post('/:board_id/:list_id/cards/:card_id/comment', authenticationGuard, boardController.customerCommentCard)
boardRoute.get('/:board_id/:list_id/cards/:card_id/comments', authenticationGuard, boardController.getCardComments)

export default boardRoute