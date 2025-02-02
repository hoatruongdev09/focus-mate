import { AlignType } from "../text-editor-element"

interface Props {
    attributes: React.HTMLAttributes<HTMLHeadingElement>
    children?: React.ReactNode | undefined
    align?: string | undefined
}

const Heading2Element = (props: Props) => {
    const { attributes, children, align } = props
    let style = {}
    if (align) {
        style = { textAlign: align }
    }
    return (
        <h2
            style={style}
            {...attributes}
            className="text-4xl font-bold leading-none tracking-tight"
        >
            {children}
        </h2>
    )
}

export default Heading2Element