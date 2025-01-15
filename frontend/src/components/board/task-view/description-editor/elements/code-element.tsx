import { ReactNode } from "react"

const CodeElement = ({ attributes, children }: {
    attributes: React.HtmlHTMLAttributes<HTMLPreElement>
    children: ReactNode
}) => {
    return (
        <pre {...attributes}>
            <code>{children}</code>
        </pre>
    )
}

export default CodeElement