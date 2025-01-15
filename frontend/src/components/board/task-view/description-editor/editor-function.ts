import { BaseEditor, Editor, Transforms, Element } from "slate"
import { ReactEditor } from "slate-react"
import { ElementType } from "./text-editor-element"

export const isBoldMarkActive = (editor: BaseEditor & ReactEditor) => {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
}

export const isUnderlineMarkActive = (editor: BaseEditor & ReactEditor) => {
    const marks = Editor.marks(editor)
    return marks ? marks.underline === true : false
}

export const isItalicMarkActive = (editor: BaseEditor & ReactEditor) => {
    const marks = Editor.marks(editor)
    return marks ? marks.italic === true : false
}

export const isCodeBlockActive = (editor: BaseEditor & ReactEditor) => {
    const [match] = Editor.nodes(editor, {
        match: (n: any) => n.type === 'code'
    })
    return match
}
export const toggleBoldMark = (editor: BaseEditor & ReactEditor) => {
    const isActive = isBoldMarkActive(editor)
    if (isActive) {
        Editor.removeMark(editor, 'bold')
    } else {
        Editor.addMark(editor, 'bold', true)
    }
}

export const toggleItalic = (editor: BaseEditor & ReactEditor) => {
    const isActive = isItalicMarkActive(editor)
    if (isActive) {
        Editor.removeMark(editor, 'italic')
    } else {
        Editor.addMark(editor, 'italic', true)
    }
}

export const toggleUnderline = (editor: BaseEditor & ReactEditor) => {
    const isActive = isUnderlineMarkActive(editor)
    if (isActive) {
        Editor.removeMark(editor, 'underline')
    } else {
        Editor.addMark(editor, 'underline', true)
    }
}

export const toggleCodeBlock = (editor: BaseEditor & ReactEditor) => {
    const isActive = isCodeBlockActive(editor)
    Transforms.setNodes(
        editor,
        { type: isActive ? ElementType.paragraph : ElementType.code },
        { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    )
}

export const isMarkActive = (editor: BaseEditor & ReactEditor, format: string) => {
    const marks = Editor.marks(editor)
    if (!marks) { return false }
    return marks ? Object(marks)[format] === true : false
}