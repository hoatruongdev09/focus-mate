import { RenderLeafProps } from "slate-react"

const LeafElement = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props
    console.log(leaf)
    return (
        <span
            {...attributes}
            // style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}
            className={`
                    ${leaf.bold ? 'font-bold' : ''}
                    ${leaf.underline ? 'underline' : ''}
                    ${leaf.italic ? 'italic' : ''}
                `}
        >
            {children}
        </span>)
}

export default LeafElement