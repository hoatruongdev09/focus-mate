export enum MarkType {
    bold = "bold",
    italic = "italic",
    underline = "underline",
    code = "code"
}
export enum ElementType {
    paragraph = "paragraph",
    heading1 = "heading1",
    heading2 = "heading2",
    heading3 = "heading3",
    heading4 = "heading4",
    heading5 = "heading5",
    heading6 = "heading6",
}

export enum AlignType {
    left = 'left',
    center = 'center',
    right = 'right',
    justify = 'justify'
}

export const TEXT_ALIGN_TYPES = [
    AlignType.left.toString(),
    AlignType.center.toString(),
    AlignType.right.toString(),
    AlignType.justify.toString()
]

export type EditorElement = {
    type: string
    children: EditorText[]
    align?: string | undefined
}

export type EditorText = {
    text: string
    bold?: boolean | undefined
    italic?: boolean | undefined
    underline?: boolean | undefined
    code?: boolean | undefined
}

