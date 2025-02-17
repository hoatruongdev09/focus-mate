import { In, Repository } from "typeorm";
import dataSource from "../db/data-source";
import { Card } from "../entities/card.entity";
import { List } from "../entities/list.entity";
import CreateListDto from "../dto/board/create-list.dto";
import UpdateListDto from "../dto/board/update-list.dto";
import CreateCardDto from "../dto/board/create-card.dto";
import UpdateCardDto from "../dto/board/update-card.dto";
import Board from "../entities/board.entity";
import Customer from "../entities/customer.entity";
import CreateBoardDto from "../dto/board/create-board.dto";
import UserComment from "../entities/user-comment.entity";
import UpdateBoardDto from "../dto/board/update-board.dto";


export class BoardService {
    private cardRepository: Repository<Card>
    private listRepository: Repository<List>
    private boardRepository: Repository<Board>
    private userCommentRepository: Repository<UserComment>

    constructor() {
        this.cardRepository = dataSource.getRepository(Card)
        this.listRepository = dataSource.getRepository(List)
        this.boardRepository = dataSource.getRepository(Board)
        this.userCommentRepository = dataSource.getRepository(UserComment)
    }

    async getBoards(customer_id: number): Promise<Board[]> {
        return await this.boardRepository.createQueryBuilder("board")
            .leftJoinAndSelect("board.owner", "customer")
            .leftJoinAndSelect("board.theme", "board_theme")
            .where("customer.id = :customer_id", { customer_id })
            .getMany()
    }

    async getBoard(board_id: string, customer_id: number): Promise<Board> {
        return await this.boardRepository.createQueryBuilder("board")
            .leftJoinAndSelect("board.owner", "customer")
            .leftJoinAndSelect("board.theme", "board_theme")
            .where("customer.id = :customer_id AND board.id =:board_id", { customer_id, board_id })
            .getOne()
    }

    async updateBoard(board_id: string, customer_id: number, data: UpdateBoardDto): Promise<Board> {
        const board = await this.boardRepository.createQueryBuilder("board")
            .leftJoinAndSelect("board.owner", "customer")
            .where("customer.id =:customer_id AND board.id =:board_id", { customer_id, board_id })
            .getOne()

        if (!board) {
            throw new Error("Board not found")
        }

        board.name = data.title
        board.description = data.description

        return await this.boardRepository.save(board)

    }

    async createBoard(customer_id: number, data: CreateBoardDto): Promise<Board> {
        const { title, description } = data
        const existBoard = await this.boardRepository.findOne({
            where: {
                owner: {
                    id: customer_id
                },
                name: title
            }
        })

        if (existBoard) {
            throw new Error("Title is exist")
        }

        const newBoard = new Board()
        newBoard.name = title
        newBoard.description = description
        newBoard.owner = { id: customer_id } as Customer

        return await this.boardRepository.save(newBoard)

    }
    async unarchiveCard(board_id: string, list_id: string, card_id: string) {
        const card = await this.cardRepository.findOne({
            where: {
                id: card_id,
                list: {
                    id: list_id,
                    board: {
                        id: board_id
                    }
                }
            }
        })
        if (!card) {
            throw new Error("Card not foud")
        }
        card.archived = false;
        return await this.cardRepository.save(card)
    }
    async archiveCard(board_id: string, list_id: string, card_id: string) {
        const card = await this.cardRepository.findOne({
            where: {
                id: card_id,
                list: {
                    id: list_id,
                    board: {
                        id: board_id
                    }
                }
            }
        })
        if (!card) {
            throw new Error("Card not foud")
        }
        card.archived = true;
        return await this.cardRepository.save(card)
    }


    async archiveList(board_id: string, list_id: string) {
        const list = await this.listRepository.findOne({
            where: {
                id: list_id,
                board: {
                    id: board_id
                }
            }
        })
        if (!list) {
            throw new Error("List not found")
        }
        list.archived = true
        return await this.listRepository.save(list)
    }

    async unarchiveList(board_id: string, list_id: string) {
        const list = await this.listRepository.findOne({
            where: {
                id: list_id,
                board: {
                    id: board_id
                }
            }
        })
        if (!list) {
            throw new Error("List not found")
        }
        list.archived = false
        return await this.listRepository.save(list)
    }

    async archiveOrUnarchiveCardsInList(board_id: string, list_id: string, archived: boolean) {
        const affectedCardIds = await this.cardRepository
            .createQueryBuilder("card")
            .leftJoinAndSelect("card.list", "list")
            .leftJoinAndSelect("list.board", "board")
            .select(["card.id"])
            .where("list.id = :list_id AND board.id = :board_id", { list_id, board_id })
            .getMany()

        if (affectedCardIds?.length != 0) {
            await this.cardRepository
                .createQueryBuilder("card")
                .update()
                .set({ archived: archived })
                .where("card.id IN(:...ids)", { ids: affectedCardIds.map(t => t.id) })
                .execute()
        }


        const cards = await this.cardRepository
            .createQueryBuilder("card")
            .leftJoin("card.list", "list")
            .leftJoin("list.board", "board")
            .where("list.id = :list_id AND board.id = :board_id", { list_id: list_id, board_id })
            .getMany()

        return cards.map(t => {
            const { list, ...card } = t

            return {
                ...card,
                list_id: list.id,
                board_id: list.board.id
            }
        })
    }

    async getLists(board_id: string) {
        const lists: List[] = await this.listRepository
            .createQueryBuilder("list")
            .leftJoinAndSelect("list.board", "board")
            .addSelect(["board.id"])
            .where("board_id = :board_id", { board_id })
            .orderBy("rank", "DESC")
            .getMany()

        return lists.map(g => {
            const { board, ...data } = g
            return {
                ...data,
                board_id: board.id
            }
        })
    }

    async getList(board_id: string, list_id: string) {
        return await this.listRepository.createQueryBuilder("list")
            .leftJoinAndSelect("list.board", "board")
            .where("list.id = :list_id AND board.id = :board_id", { list_id, board_id })
            .getOne()
    }

    private async getListTopRank(board_id: string) {
        return await this.listRepository
            .createQueryBuilder()
            .select()
            .where("board_id = :board_id", { board_id })
            .orderBy("rank", "DESC")
            .getOne()
    }

    private async findBoard(board_id: string): Promise<Board> {
        return await this.boardRepository.createQueryBuilder("board")
            .leftJoin("board.owner", "customer")
            .leftJoinAndSelect("board.theme", "board_theme")
            .select()
            .where("board.id =:board_id", { board_id })
            .getOne()
    }

    async createList(board_id: string, data: CreateListDto) {
        const { name, description } = data

        const board = await this.findBoard(board_id)
        if (!board) {
            throw new Error("Board not found")
        }

        const newList = new List()

        const topRank = await this.getListTopRank(board_id)
        newList.name = name || "Untitled list"
        newList.description = description
        newList.rank = this.findMiddleString(topRank?.rank ?? "", "")
        newList.board = board
        return await this.listRepository.save(newList)
    }

    async updateList(board_id: string, id: string, data: UpdateListDto) {
        const { name, description } = data

        const list = await this.listRepository.findOne({
            where: {
                id,
                board: {
                    id: board_id
                }
            }
        })
        if (list == null) {
            throw new Error("List not found")
        }
        list.name = name
        list.description = description

        const { front_id, behind_id } = data
        if (front_id || behind_id) {
            const lists = await this.listRepository
                .createQueryBuilder()
                .select()
                .where("id in (:...ids) AND board_id = :board_id", { board_id, ids: [front_id, behind_id].filter(id => id !== null) })
                .getMany()
            const frontListRank = front_id ? lists.find(g => g.id == front_id).rank : null
            const behindListRank = behind_id ? lists.find(g => g.id == behind_id).rank : null
            list.rank = this.findMiddleString(frontListRank ?? "", behindListRank ?? "")
        }

        return await this.listRepository.save(list)
    }

    async reorderList(targetId: string, frontId: string | null, behindId: string | null) {
        const lists = await this.listRepository
            .createQueryBuilder()
            .select()
            .where("id in (:...ids)", { ids: [targetId, frontId, behindId].filter(id => id !== null) })
            .getMany()
        const targetList: List = lists.find(g => g.id === targetId)

        if (!frontId && !behindId) {
            return targetList
        }

        const frontList: List | null = frontId ? lists.find(g => g.id === frontId) : null
        const behindList: List | null = behindId ? lists.find(g => g.id === behindId) : null

        targetList.rank = this.findMiddleString(frontList?.rank ?? "", behindList?.rank ?? "")
        return await this.listRepository.save(targetList)
    }

    async deleteList(board_id: string, id: string) {
        const list = await this.listRepository.findOne({
            where: {
                id,
                board: {
                    id: board_id
                }
            }
        })
        if (list == null) {
            throw new Error("list not found")
        }
        await this.cardRepository
            .createQueryBuilder()
            .softDelete()
            .where("list_id = :id", { id: list.id })
            .execute()
        await this.listRepository.createQueryBuilder()
            .softDelete()
            .where("id = :id AND board_id = :board_id", { id, board_id })
            .execute()
    }

    private async getCardLowestRankInList(list_id: string) {
        return await this.cardRepository
            .createQueryBuilder()
            .where("list_id = :list_id", { list_id })
            .orderBy("rank")
            .getOne()
    }

    private async getCardTopRankInList(list_id: string) {
        return await this.cardRepository
            .createQueryBuilder()
            .where("list_id = :list_id", { list_id })
            .orderBy("rank", "DESC")
            .getOne()
    }

    private async getCardLowestRank() {
        return await this.cardRepository
            .createQueryBuilder()
            .orderBy("rank")
            .getOne()
    }

    private async getCardTopRank() {
        return await this.cardRepository
            .createQueryBuilder()
            .orderBy("rank", "DESC")
            .getOne()
    }

    async addCard(board_id: string, list_id: string, data: CreateCardDto) {

        const list = await this.listRepository.findOne({
            where: {
                id: list_id,
                board: {
                    id: board_id
                }
            }
        })

        if (list == null) {
            throw new Error("List not found")
        }


        const newCard: Card = new Card()
        newCard.title = data.title
        newCard.description = data.description
        newCard.list = list
        newCard.priority = data.priority
        newCard.estimate = data.estimate
        if (list) {
            const lowestRank = await this.getCardLowestRankInList(list_id)
            newCard.rank = this.findMiddleString("", lowestRank?.rank ?? "")
        } else {
            const lowestRank = await this.getCardLowestRank()
            newCard.rank = this.findMiddleString("", lowestRank?.rank ?? "")
        }
        return await this.cardRepository.save(newCard)
    }

    async getCards(board_id: string) {

        const cards = await this.cardRepository
            .createQueryBuilder("card")
            .leftJoin("card.list", "list")
            .leftJoin("list.board", "board")
            .select(["card", "list.id", "board.id"])
            .where("board.id = :board_id", { board_id })
            .orderBy("card.rank", "DESC")
            .getMany();
        return cards.map(t => {
            const { list, ...card } = t
            return {
                ...card,
                list_id: list.id,
                board_id: list.board.id
            }
        })
    }

    private async changeCardList(card: Card, board_id: string, list_id: string) {
        const list = await this.getList(board_id, list_id)
        if (list == null) { throw new Error("List not found") }
        card.list = list
    }


    async updateCard(board_id: string, card_id: string, data: UpdateCardDto) {

        const card = await this.cardRepository.createQueryBuilder("card")
            .leftJoinAndSelect("card.list", "list")
            .leftJoinAndSelect("list.board", "board")
            .where("board.id = :board_id AND card.id = :card_id", { board_id, card_id })
            .getOne()

        if (card == null) { throw new Error("Card not found") }
        card.title = data.title
        card.description = data.description
        card.priority = data.priority
        card.estimate = data.estimate
        card.cover_type = data.cover_type
        card.cover_value = data.cover_value
        card.layout_type = data.layout_type

        const isChangeList = card.list.id != data.list_id
        if (isChangeList) {
            await this.changeCardList(card, board_id, data.list_id)
        }

        const { front_id, behind_id } = data
        if (!front_id && !behind_id) {
            if (isChangeList) {
                // user click change list only or an empty column 
                // -> need to find the top card in that column and place card
                const topRank = await this.getCardTopRankInList(data.list_id)
                if (topRank) {
                    card.rank = this.findMiddleString(topRank?.rank ?? "", "")
                }
            }

        } else {
            // user drag into column 
            // -> do like reorder column
            const cards = await this.cardRepository
                .createQueryBuilder()
                .select()
                .where("id in (:...ids)", { ids: [front_id, behind_id].filter(id => id !== null) })
                .getMany()
            const frontCard = front_id ? cards.find(t => t.id === front_id) : null
            const behindCard = behind_id ? cards.find(t => t.id === behind_id) : null
            card.rank = this.findMiddleString(frontCard?.rank ?? "", behindCard?.rank ?? "")
        }
        const newCard = await this.cardRepository.save(card)
        const { title, estimate, priority, description, rank, list } = newCard
        return {
            id: card_id,
            title,
            estimate,
            priority,
            description,
            rank,
            list_id: list.id,
            board_id: list.board.id
        }
    }

    async deleteCard(board_id: string, card_id: string) {
        const card = await this.cardRepository.createQueryBuilder("card")
            .leftJoin("card.list", "list")
            .leftJoin("list.board", "board")
            .where("card.id = :card_id AND board.id = :board_id", { card_id, board_id })
            .getOne()

        if (!card) { return }
        if (!card.archived) {
            throw new Error("Card is not archived yet")
        }
        await this.cardRepository.softRemove(card)
    }

    async getBoardListsAndCards(board_id: string) {
        const lists = await this.listRepository.find({
            where: {
                board: {
                    id: board_id
                }
            }
        })
        const cards = await this.cardRepository.find({
            where: {
                list: {
                    id: In([lists.map(col => col.id)])
                }
            }
        })

        return { cards, lists }
    }

    async getCardsInList(board_id: string, list_id: string) {
        const cards = await this.cardRepository.find({
            relations: { list: true },
            where: {
                list: {
                    id: list_id,
                    board: {
                        id: board_id
                    }
                }
            }
        })
        return cards
    }

    async getCard(board_id: string, list_id: string, card_id: string) {
        return await this.cardRepository.findOne({
            where: {
                id: card_id,
                list: {
                    id: list_id,
                    board: {
                        id: board_id
                    }
                }
            }
        })
    }

    async postComment(board_id: string, list_id: string, card_id: string, customer_id: number, content: string) {
        const comment: UserComment = new UserComment()
        comment.board_id = board_id
        comment.card_id = card_id
        comment.list_id = list_id
        comment.customer_id = customer_id
        comment.content = content

        const { id: comment_id } = await this.userCommentRepository.save(comment)

        const result = await this.userCommentRepository.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.customer", "customer")
            .where("comment.board_id = :board_id AND comment.list_id = :list_id AND comment.card_id = :card_id AND comment.id = :comment_id",
                { board_id, list_id, card_id, comment_id }
            )
            .select(["comment", "customer.id", "customer.first_name", "customer.last_name"])
            .getOne()
        return result
    }

    async getComments(board_id: string, list_id: string, card_id: string) {
        return await this.userCommentRepository.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.customer", "customer")
            .where("comment.board_id = :board_id AND comment.list_id = :list_id AND comment.card_id = :card_id",
                { board_id, list_id, card_id }
            )
            .orderBy("comment.created_at", "DESC")
            .select(["comment", "customer.id", "customer.first_name", "customer.last_name"])
            .getMany()
    }

    async getArchivedCards(board_id: string) {
        return await this.cardRepository.createQueryBuilder("card")
            .leftJoin("card.list", "list")
            .leftJoin("list.board", "board")
            .where("card.archived = true AND board.id =:board_id", { board_id })
            .getMany()
    }

    async getArchivedLists(board_id: string) {
        return await this.listRepository.createQueryBuilder("list")
            .leftJoin("list.board", "board")
            .where("board.id = :board_id AND list.archived", { board_id })
            .getMany()
    }

    private findMiddleString(prev: string, next: string) {
        var p, n, pos, str;
        for (pos = 0; p == n; pos++) {               // find leftmost non-matching character
            p = pos < prev.length ? prev.charCodeAt(pos) : 96;
            n = pos < next.length ? next.charCodeAt(pos) : 123;
        }
        str = prev.slice(0, pos - 1);                // copy identical part of string
        if (p == 96) {                               // prev string equals beginning of next
            while (n == 97) {                        // next character is 'a'
                n = pos < next.length ? next.charCodeAt(pos++) : 123;  // get char from next
                str += 'a';                          // insert an 'a' to match the 'a'
            }
            if (n == 98) {                           // next character is 'b'
                str += 'a';                          // insert an 'a' to match the 'b'
                n = 123;                             // set to end of alphabet
            }
        }
        else if (p + 1 == n) {                       // found consecutive characters
            str += String.fromCharCode(p);           // insert character from prev
            n = 123;                                 // set to end of alphabet
            while ((p = pos < prev.length ? prev.charCodeAt(pos++) : 96) == 122) {  // p='z'
                str += 'z';                          // insert 'z' to match 'z'
            }
        }
        return str + String.fromCharCode(Math.ceil((p + n) / 2)); // append middle character
    }
}

export const boardService = new BoardService()