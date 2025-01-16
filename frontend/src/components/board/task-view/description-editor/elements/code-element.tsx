import { ReactNode } from "react"

interface Props {
    attributes: React.HTMLAttributes<HTMLElement>
    children: ReactNode
    align?: string | undefined
}

const CodeElement = (props: Props) => {
    const { attributes, children, align } = props
    let style = {}
    if (align) {
        style = { textAlign: align }
    }
    return (
        <code
            {...attributes}
            style={style}
            className="bg-orange-300 px-1 pb-1 border border-orange-500 rounded text-orange-900"
        >
            {children}
        </code>
    )
}

export default CodeElement