import { BaseEditor, Editor, Transforms, Element } from "slate"
import { ReactEditor } from "slate-react"
import { EditorElement, ElementType, TEXT_ALIGN_TYPES } from "./text-editor-element"


export const isMarkActive = (editor: BaseEditor & ReactEditor, format: string) => {
    const marks = Editor.marks(editor)
    if (!marks) { return false }
    return marks ? Object(marks)[format] === true : false
}

export const toggleMark = (editor: BaseEditor & ReactEditor, format: string) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}


export const isBlockActive = (editor: BaseEditor & ReactEditor, format: string, blockType = 'type'): boolean => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                Object(n)[blockType] === format,
        })
    )
    return !!match
}

export const toggleBlock = (editor: BaseEditor & ReactEditor, format: string) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    let newProperties: Partial<EditorElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            type: isActive ? ElementType.paragraph : format,
        }
    }
    Transforms.setNodes<EditorElement>(editor, newProperties)

}