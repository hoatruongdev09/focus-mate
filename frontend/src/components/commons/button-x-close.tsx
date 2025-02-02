import { XMarkIcon } from "@heroicons/react/16/solid"

interface Props {
    onClick: () => void
    buttonClassName?: string
    iconClassName?: string
}

const ButtonXClose = (props: Props) => {
    const { onClick, buttonClassName, iconClassName } = props
    return (
        <button
            className={`p-1 hover:bg-white hover:bg-opacity-25 rounded ${buttonClassName}`}
            onClick={onClick}
        >
            <XMarkIcon className={`size-6 ${iconClassName}`} />
        </button>
    )
}

export default ButtonXClose;