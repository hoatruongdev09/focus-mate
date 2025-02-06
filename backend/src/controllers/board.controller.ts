import { Request, Response } from 'express'
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


export const getBoards = async (req: Request, res: Response) => {
    const { customer_id } = req
    try {
        const boards = await boardService.getBoards(customer_id)
        res.status(200).json(boards)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const createBoard = async (req: Request, res: Response) => {
    const { customer_id } = req
    try {
        const board = await boardService.createBoard(customer_id, req.body)
        const eventData: CreateBoardEventData = {
            customer_id, board
        }
        defaultObserver.publish(BoardActivityEvent.CreateBoard, eventData)
        res.status(200).json(board)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const fetchBoard = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const board = await boardService.getBoardListsAndCards(+board_id)
        res.status(200).json(board)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getBoard = async (req: Request, res: Response) => {
    const { customer_id } = req
    const { board_id } = req.params

    try {
        const board = await boardService.getBoard(+board_id, +customer_id)
        res.status(200).json(board)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const updateBoard = async (req: Request, res: Response) => {
    const { customer_id } = req
    const { board_id } = req.params
    const data: UpdateBoardDto = req.body
    try {
        const board = await boardService.updateBoard(+board_id, +customer_id, data)
        res.status(200).json(board)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}


export const addList = async (req: Request, res: Response) => {
    try {
        const { customer_id } = req
        const { board_id } = req.params
        const list = await boardService.createList(+board_id, req.body)
        const eventData: AddListEventData = {
            customer_id,
            list
        }
        defaultObserver.publish(BoardActivityEvent.AddList, eventData)
        res.status(200).json(list)
    } catch (e) {
        res.status(500).json(e)
    }
}

export const updateList = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        const data: UpdateListDto = req.body
        const list = await boardService.updateList(+board_id, +id, data)
        res.status(200).json(list)
    } catch (e) {
        res.status(500).json(e)
    }
}

export const getLists = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const data = await boardService.getLists(+board_id)
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json(e)
    }
}

export const deleteList = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        await boardService.deleteList(+board_id, +id)
        res.status(200).json("ok")
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const createCard = async (req: Request, res: Response) => {
    try {
        const { customer_id } = req
        const { board_id, list_id } = req.params
        const data: CreateCardDto = req.body
        const card = await boardService.addCard(+board_id, +list_id, data)
        const eventData: AddCardEventData = {
            customer_id,
            card
        }
        defaultObserver.publish(BoardActivityEvent.AddCard, eventData)
        res.status(200).json(card)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const getCards = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const cards = await boardService.getCards(+board_id)
        res.status(200).json(cards)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const updateCard = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        const data: UpdateCardDto = req.body
        const updatedCard = await boardService.updateCard(+board_id, +id, data)
        res.status(200).json(updatedCard)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const deleteCard = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        await boardService.deleteCard(+board_id, +id)
        res.status(200).json("oke")
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getCardInList = async (req: Request, res: Response) => {
    try {
        const { board_id, list_id } = req.params
        const cards = await boardService.getCardsInList(+board_id, +list_id)
        res.status(200).json(cards)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const reorderList = async (req: Request, res: Response) => {
    try {
        const { targetId, frontId, behindId }:
            {
                targetId: number
                frontId: number | null
                behindId: number | null
            } = req.body
        const card = await boardService.reorderList(targetId, frontId, behindId)
        res.status(200).json(card)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const archiveOrUnarchiveCard = async (req: Request, res: Response) => {
    try {
        const { customer_id } = req
        const { board_id, list_id, card_id } = req.params
        const card = await boardService.getCard(+board_id, +list_id, +card_id)
        const eventData: AchieveCardEventData = {
            customer_id,
            board_id: +board_id,
            card_id: +card_id,
            list_id: +list_id,
        }
        if (card.archived) {
            defaultObserver.publish(BoardActivityEvent.UnarchiveCard, eventData)
            res.status(200).json(await boardService.unarchiveCard(+board_id, +list_id, +card_id))
        }
        else {
            defaultObserver.publish(BoardActivityEvent.ArchiveCard, eventData)
            res.status(200).json(await boardService.archiveCard(+board_id, +list_id, +card_id))
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}


export const archiveOrUnarchiveList = async (req: Request, res: Response) => {
    try {
        const { customer_id } = req
        const { board_id, id } = req.params
        const list = await boardService.getList(+board_id, +id);
        const eventData: AchieveListEventData = {
            customer_id,
            board_id: +board_id,
            list_id: +id
        }
        if (!list.archived) {
            defaultObserver.publish(BoardActivityEvent.ArchiveList, eventData)
            res.status(200).json(await boardService.archiveList(+board_id, +id))
        }
        else {
            defaultObserver.publish(BoardActivityEvent.UnarchiveList, eventData)
            res.status(200).json(await boardService.unarchiveList(+board_id, +id))
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const archiveOrUnarchiveCardsInList = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        const { action } = req.body
        await boardService.archiveOrUnarchiveCardsInList(+board_id, +id, action)
        res.status(200).json({ message: "oke" })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const customerCommentCard = async (req: Request, res: Response) => {
    try {
        const { board_id, list_id, card_id } = req.params
        const { content } = req.body
        const { customer_id } = req
        const comment = await boardService.postComment(+board_id, +list_id, +card_id, customer_id, content)
        res.status(200).json(comment)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getCardComments = async (req: Request, res: Response) => {
    try {
        const { board_id, list_id, card_id } = req.params
        const comments = await boardService.getComments(+board_id, +list_id, +card_id)
        res.status(200).json(comments)
    }
    catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getArchivedCards = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const cards = await boardService.getArchivedCards(+board_id)
        res.status(200).json(cards)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getArchivedLists = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const cards = await boardService.getArchivedLists(+board_id)
        res.status(200).json(cards)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getBoardActivities = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const activities = await boardActivityService.getBoardActivities(+board_id)
        res.status(200).json(activities)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

