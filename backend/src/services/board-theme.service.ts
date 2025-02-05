import { Repository } from "typeorm";
import BoardTheme from "../entities/board-theme.entity";
import dataSource from "../db/data-source";
import loadBoardThemeData from "../scripts/board-theme-data-loader";
import Board from "../entities/board.entity";

export default class BoardThemeService {
    private boardThemeRepository: Repository<BoardTheme>
    private boardRepository: Repository<Board>

    constructor() {
        this.boardThemeRepository = dataSource.getRepository(BoardTheme)
        this.boardRepository = dataSource.getRepository(Board)
        this.initBoard()
    }

    private async initBoard() {
        try {
            while (!dataSource.isInitialized) {
                await new Promise(resolve => setTimeout(resolve, 100))
            }
            const existedThemes = await this.boardThemeRepository.find()
            if (existedThemes.length > 0) { return }
            const data = await loadBoardThemeData()
            await this.boardThemeRepository.insert(data)
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