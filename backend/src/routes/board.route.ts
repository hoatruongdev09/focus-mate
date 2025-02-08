import { Router } from "express";
import * as boardController from "../controllers/board.controller";
import { auth } from "../middlewares/authenticate.middleware";

const route = Router()

route.get('/', auth, boardController.getBoards)
route.post('/', auth, boardController.createBoard)

route.get('/:board_id/activities', auth, boardController.getBoardActivities)
route.get('/:board_id', auth, boardController.getBoard)
route.post('/:board_id', auth, boardController.updateBoard)

route.get('/:board_id/archived-cards', auth, boardController.getArchivedCards)
route.get('/:board_id/archived-lists', auth, boardController.getArchivedLists)

route.get('/:board_id/lists', auth, boardController.getLists)
route.post('/:board_id/lists', auth, boardController.addList)
route.put('/:board_id/lists/:id', auth, boardController.updateList)
route.delete('/:board_id/lists/:id', auth, boardController.deleteList)
route.post('/:board_id/lists/:list_id/card', auth, boardController.createCard)
route.get('/:board_id/lists/:list_id/cards', auth, boardController.getCardInList)
route.post('/:board_id/lists/:id/archive-or-unarchive', auth, boardController.archiveOrUnarchiveList)
route.post('/:board_id/lists/:id/archive-or-unarchive-all-card', auth, boardController.archiveOrUnarchiveCardsInList)
route.get('/:board_id/cards', auth, boardController.getCards)
route.put('/:board_id/cards/:id', auth, boardController.updateCard)
route.delete('/:board_id/cards/:id', auth, boardController.deleteCard)
route.post('/:board_id/:list_id/cards/:card_id/archive-or-unarchive', auth, boardController.archiveOrUnarchiveCard)
route.post('/:board_id/:list_id/cards/:card_id/comment', auth, boardController.customerCommentCard)
route.get('/:board_id/:list_id/cards/:card_id/comments', auth, boardController.getCardComments)

export default route