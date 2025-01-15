export enum ElementType {
    paragraph = "paragraph",
    heading1 = "heading1",
    heading2 = "heading2",
    heading3 = "heading3",
    code = "code"
}

export type EditorElement = {
    type: ElementType
    children: EditorText[]
}

export type EditorText = {
    text: string
    bold?: boolean | undefined
    italic?: boolean | undefined
    underline?: boolean | undefined
}

