import { Router } from "express";
import * as boardController from "../controllers/board.controller";
import { auth } from "../middlewares/authenticate.middleware";

const boardRoute = Router()

boardRoute.get('/', auth, boardController.getBoards)
boardRoute.post('/', auth, boardController.createBoard)

boardRoute.get('/:board_id/activities', auth, boardController.getBoardActivities)
boardRoute.get('/:board_id', auth, boardController.getBoard)
boardRoute.post('/:board_id', auth, boardController.updateBoard)

boardRoute.get('/:board_id/archived-cards', auth, boardController.getArchivedCards)
boardRoute.get('/:board_id/archived-lists', auth, boardController.getArchivedLists)

boardRoute.get('/:board_id/lists', auth, boardController.getLists)
boardRoute.post('/:board_id/lists', auth, boardController.addList)
boardRoute.put('/:board_id/lists/:id', auth, boardController.updateList)
boardRoute.delete('/:board_id/lists/:id', auth, boardController.deleteList)
boardRoute.post('/:board_id/lists/:list_id/card', auth, boardController.createCard)
boardRoute.get('/:board_id/lists/:list_id/cards', auth, boardController.getCardInList)
boardRoute.post('/:board_id/lists/:id/archive-or-unarchive', auth, boardController.archiveOrUnarchiveList)
boardRoute.post('/:board_id/lists/:id/archive-or-unarchive-all-card', auth, boardController.archiveOrUnarchiveCardsInList)
boardRoute.get('/:board_id/cards', auth, boardController.getCards)
boardRoute.put('/:board_id/cards/:id', auth, boardController.updateCard)
boardRoute.delete('/:board_id/cards/:id', auth, boardController.deleteCard)
boardRoute.post('/:board_id/:list_id/cards/:card_id/archive-or-unarchive', auth, boardController.archiveOrUnarchiveCard)
boardRoute.post('/:board_id/:list_id/cards/:card_id/comment', auth, boardController.customerCommentCard)
boardRoute.get('/:board_id/:list_id/cards/:card_id/comments', auth, boardController.getCardComments)

export default boardRoute