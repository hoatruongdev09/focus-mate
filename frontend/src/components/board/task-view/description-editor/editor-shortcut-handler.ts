import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { toggleBoldMark, toggleCodeBlock } from "./editor-function";

const shortCutHandler = (e: React.KeyboardEvent<HTMLDivElement>, editor: BaseEditor & ReactEditor) => {
    if (!(e.ctrlKey)) {
        return
    }
    switch (e.key) {
        case '`':
            e.preventDefault()
            toggleCodeBlock(editor)
            break
        case 'b':
            e.preventDefault()
            toggleBoldMark(editor)
            break
    }
}

export default shortCutHandler