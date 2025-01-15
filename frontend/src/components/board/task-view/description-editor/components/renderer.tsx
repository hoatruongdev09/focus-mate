import { RenderElementProps } from "slate-react"
import CodeElement from "../elements/code-element"
import ParagraphElement from "../elements/paragraph-element"
import { ElementType } from "../text-editor-element"

const RenderElement = (props: RenderElementProps) => {
    switch (props.element.type) {
        case ElementType.code:
            return <CodeElement {...props} />
        case ElementType.paragraph:
            return <ParagraphElement {...props} />
        default:
            return <></>
    }
}

export default RenderElement