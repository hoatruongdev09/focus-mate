import { RenderLeafProps } from "slate-react"

const TextLeaf = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props
    return (
        <span
            {...attributes}
            className={`
                    ${leaf.bold ? 'font-bold' : ''}
                    ${leaf.underline ? 'underline' : ''}
                    ${leaf.italic ? 'italic' : ''}
                `}
        >
            {children}
        </span>)
}

const CodeLeaf = (props: RenderLeafProps) => {
    const { attributes, children } = props
    return (
        <code
            {...attributes}
            className="bg-orange-300 px-1 pb-1 border border-orange-500 rounded text-orange-900"
        >
            {children}
        </code>
    )
}


const LeafElement = (props: RenderLeafProps) => {
    const { leaf } = props
    if (leaf.code) {
        return <CodeLeaf {...props} />
    }
    return (<TextLeaf {...props} />)
}

export default LeafElement