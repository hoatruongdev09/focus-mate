import { AlignType } from "../text-editor-element"

interface Props {
    attributes: React.HTMLAttributes<HTMLHeadingElement>,
    children?: React.ReactNode | undefined
    align?: string | undefined
}

const Heading4Element = (props: Props) => {
    const { attributes, children, align } = props
    let style = {}
    if (align) {
        style = { textAlign: align }
    }
    return (
        <h3
            style={style}
            {...attributes}
            className="text-2xl font-bold leading-none tracking-tight"
        >
            {children}
        </h3>
    )
}

export default Heading4Element