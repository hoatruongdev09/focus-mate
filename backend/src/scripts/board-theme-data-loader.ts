import { readFile } from 'fs/promises'
import { join } from 'path'

const filePath = join(__dirname, "..", "/csv-configs/theme-config.csv")

const loadBoardThemeData = async () => {
    const content = (await readFile(filePath)).toString()
    const themes = []
    const splits = content.split('\r\n')
    if (!splits || splits.length == 1) {
        throw new Error("Theme config data is not valid")
    }
    const [header, ...lines] = splits
    for (const line of lines) {
        const [id, bg_type, bg_value, fg_value] = line.split(',')
        themes.push({ id: +id, bg_type: +bg_type, bg_value, fg_value })
    }
    return themes
}

export default loadBoardThemeData