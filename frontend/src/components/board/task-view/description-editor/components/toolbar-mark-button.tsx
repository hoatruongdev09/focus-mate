import { ReactNode } from "react"
import { useSlate } from "slate-react"
import { isMarkActive } from "../editor-function"

interface Props {
    children: ReactNode
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement> | undefined
    format: string
}

const MarkButton = (props: Props) => {
    const { children, onMouseDown, format } = props
    const editor = useSlate()

    const isActive = isMarkActive(editor, format)
    return (
        <button
            onMouseDown={onMouseDown}
            className={`hover:bg-slate-200 p-1 rounded ${isActive ? 'bg-slate-200' : ''}`}
        >
            {children}
        </button>
    )
}

export default MarkButton