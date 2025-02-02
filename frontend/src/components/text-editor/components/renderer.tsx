import { RenderElementProps } from "slate-react"
import ParagraphElement from "../elements/paragraph-element"
import { ElementType } from "../text-editor-element"
import Heading1Element from "../elements/heading-1-element"
import Heading2Element from "../elements/heading-2-element"
import Heading3Element from "../elements/heading-3-element"

const RenderElement = (props: RenderElementProps) => {
    const { type, align } = props.element
    switch (type) {
        case ElementType.paragraph:
            return <ParagraphElement align={align} {...props} />
        case ElementType.heading1:
            return <Heading1Element align={align} {...props} />
        case ElementType.heading2:
            return <Heading2Element align={align} {...props} />
        case ElementType.heading3:
            return <Heading3Element align={align} {...props} />
        default:
            return <></>
    }
}

export default RenderElement