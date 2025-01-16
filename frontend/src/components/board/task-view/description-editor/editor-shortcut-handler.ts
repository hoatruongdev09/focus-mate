import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { toggleMark } from "./editor-function";
import { MarkType } from "./text-editor-element";

const shortCutHandler = (e: React.KeyboardEvent<HTMLDivElement>, editor: BaseEditor & ReactEditor) => {
    if (!(e.ctrlKey)) {
        return
    }
    switch (e.key) {
        case '`':
            e.preventDefault()
            toggleMark(editor, MarkType.code)
            break
        case 'b':
            e.preventDefault()
            toggleMark(editor, MarkType.bold)
            break
    }
}

export default shortCutHandler