import { Repository } from "typeorm";
import BoardTheme from "../entities/board-theme.entity";
import dataSource from "../db/data-source";
import loadBoardThemeData from "../scripts/board-theme-data-loader";
import Board from "../entities/board.entity";

export class BoardThemeService {

    private boardThemeRepository: Repository<BoardTheme>
    private boardRepository: Repository<Board>

    constructor() {
        this.boardThemeRepository = dataSource.getRepository(BoardTheme)
        this.boardRepository = dataSource.getRepository(Board)
    }

    async initBoard() {
        try {
            if (!dataSource.isInitialized) {
                await dataSource.initialize()
            }
            const data = await loadBoardThemeData()
            const existThemes = await this.boardThemeRepository
                .createQueryBuilder("board_theme")
                .select("board_theme.id")
                .getMany()
            const themeIds = existThemes.map(t => t.id)
            const shouldInsertConfig = data.filter(c => !themeIds.includes(c.id))
            const shouldUpdateConfig = data.filter(c => themeIds.includes(c.id))
            await this.boardThemeRepository.insert(shouldInsertConfig)
            const promises = []
            for (let config of shouldUpdateConfig) {
                promises.push(this.boardThemeRepository.createQueryBuilder()
                    .update(BoardTheme)
                    .set({ bg_type: config.bg_type, bg_value: config.bg_value })
                    .where("id =:id", { id: config.id })
                    .execute()
                )
            }
            await Promise.all(promises)
        } catch (err) {
            console.error(err)
        }
    }

    async getAllThemes() {
        return await this.boardThemeRepository.find()
    }

    async changeBoardTheme(board_id: number, theme_id: number) {
        const board = await this.boardRepository.findOne({
            where: {
                id: board_id
            }
        })
        if (!board) {
            throw new Error("Board not found")
        }
        const themeData = await this.boardThemeRepository.findOne({
            where: {
                id: theme_id
            }
        })
        if (!themeData) {
            throw new Error("Theme is not found")
        }
        board.theme_id = theme_id
        board.theme = themeData

        return await this.boardRepository.save(board)
    }
}

export const boardThemeService = new BoardThemeService()
boardThemeService.initBoard()