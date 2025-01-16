import { ReactNode } from "react"
import { useSlate } from "slate-react"
import { isBlockActive } from "../editor-function"
import { TEXT_ALIGN_TYPES } from "../text-editor-element"

interface Props {
    children: ReactNode
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement> | undefined
    format: string
}

const BlockButton = (props: Props) => {
    const { children, onMouseDown, format } = props
    const editor = useSlate()

    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    return (
        <button
            onMouseDown={onMouseDown}
            className={`hover:bg-slate-200 p-1 rounded ${isActive ? 'bg-slate-200' : ''}`}
        >
            {children}
        </button>
    )
}

export default BlockButton