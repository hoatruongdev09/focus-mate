import { NextFunction, Request, Response } from 'express'
import UpdateListDto from '../dto/board/update-list.dto'
import CreateCardDto from '../dto/board/create-card.dto'
import UpdateCardDto from '../dto/board/update-card.dto'
import UpdateBoardDto from '../dto/board/update-board.dto'
import {
    AchieveListEventData,
    AchieveCardEventData,
    AddListEventData,
    AddCardEventData,
    BoardActivityEvent,
    CreateBoardEventData
} from '../defines/board-activity-type'
import { defaultObserver } from '../utils/observer'

import { boardService } from '../services/board.service'
import { boardActivityService } from '../services/board-activity.service'


export const getBoards = async (req: Request, res: Response, next: NextFunction) => {
    const { customer_id } = req
    try {
        res.locals.data = await boardService.getBoards(customer_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { customer_id } = req
    try {
        const board = await boardService.createBoard(customer_id, req.body)
        const eventData: CreateBoardEventData = {
            customer_id, board
        }
        defaultObserver.publish(BoardActivityEvent.CreateBoard, eventData)
        res.locals.data = board
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const fetchBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id } = req.params
        res.locals.data = await boardService.getBoardListsAndCards(board_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { customer_id } = req
    const { board_id } = req.params

    try {
        res.locals.data = await boardService.getBoard(board_id, +customer_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { customer_id } = req
    const { board_id } = req.params
    const data: UpdateBoardDto = req.body
    try {
        res.locals.data = await boardService.updateBoard(board_id, +customer_id, data)
    } catch (error) {
        res.locals.error = error
    }
    next()
}


export const addList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { customer_id } = req
        const { board_id } = req.params
        const list = await boardService.createList(board_id, req.body)
        const eventData: AddListEventData = {
            customer_id,
            list
        }
        defaultObserver.publish(BoardActivityEvent.AddList, eventData)
        res.locals.data = list
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const updateList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id, id } = req.params
        const data: UpdateListDto = req.body
        const list = await boardService.updateList(board_id, id, data)
        res.locals.data = list
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id } = req.params
        res.locals.data = await boardService.getLists(board_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id, id } = req.params
        await boardService.deleteList(board_id, id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { customer_id } = req
        const { board_id, list_id } = req.params
        const data: CreateCardDto = req.body
        const card = await boardService.addCard(board_id, list_id, data)
        const eventData: AddCardEventData = {
            customer_id,
            card
        }
        defaultObserver.publish(BoardActivityEvent.AddCard, eventData)
        res.locals.data = card
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id } = req.params
        res.locals.data = await boardService.getCards(board_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const updateCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id, id } = req.params
        const data: UpdateCardDto = req.body
        res.locals.data = await boardService.updateCard(board_id, id, data)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id, id } = req.params
        await boardService.deleteCard(board_id, id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getCardInList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id, list_id } = req.params
        res.locals.data = await boardService.getCardsInList(board_id, list_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const reorderList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { targetId, frontId, behindId }:
            {
                targetId: string
                frontId: string | null
                behindId: string | null
            } = req.body
        res.locals.data = await boardService.reorderList(targetId, frontId, behindId)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const archiveOrUnarchiveCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { customer_id } = req
        const { board_id, list_id, card_id } = req.params
        const card = await boardService.getCard(board_id, list_id, card_id)
        const eventData: AchieveCardEventData = {
            customer_id,
            board_id: board_id,
            card_id: card_id,
            list_id: list_id,
        }
        if (card.archived) {
            defaultObserver.publish(BoardActivityEvent.UnarchiveCard, eventData)
            res.locals.data = await boardService.unarchiveCard(board_id, list_id, card_id)
        }
        else {
            defaultObserver.publish(BoardActivityEvent.ArchiveCard, eventData)
            res.locals.data = await boardService.archiveCard(board_id, list_id, card_id)
        }
    } catch (error) {
        res.locals.error = error
    }
    next()
}


export const archiveOrUnarchiveList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { customer_id } = req
        const { board_id, id } = req.params
        const list = await boardService.getList(board_id, id);
        const eventData: AchieveListEventData = {
            customer_id,
            board_id: board_id,
            list_id: id
        }
        if (!list.archived) {
            defaultObserver.publish(BoardActivityEvent.ArchiveList, eventData)
            res.locals.data = await boardService.archiveList(board_id, id)
        }
        else {
            defaultObserver.publish(BoardActivityEvent.UnarchiveList, eventData)
            res.locals.data = await boardService.unarchiveList(board_id, id)
        }
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const archiveOrUnarchiveCardsInList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id, id } = req.params
        const { action } = req.body
        await boardService.archiveOrUnarchiveCardsInList(board_id, id, action)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const customerCommentCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id, list_id, card_id } = req.params
        const { content } = req.body
        const { customer_id } = req
        res.locals.data = await boardService.postComment(board_id, list_id, card_id, customer_id, content)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getCardComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id, list_id, card_id } = req.params
        res.locals.data = await boardService.getComments(board_id, list_id, card_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getArchivedCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id } = req.params
        res.locals.data = await boardService.getArchivedCards(board_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getArchivedLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id } = req.params
        res.locals.data = await boardService.getArchivedLists(board_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getBoardActivities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id } = req.params
        res.locals.data = await boardActivityService.getBoardActivities(board_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

