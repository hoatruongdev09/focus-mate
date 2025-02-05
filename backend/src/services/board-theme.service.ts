import { Repository } from "typeorm";
import BoardTheme from "../entities/board-theme.entity";
import dataSource from "../db/data-source";
import loadBoardThemeData from "../scripts/board-theme-data-loader";
import { resolve } from "path";

export default class BoardThemeService {
    private boardThemeRepository: Repository<BoardTheme>

    constructor() {
        this.boardThemeRepository = dataSource.getRepository(BoardTheme)
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
}