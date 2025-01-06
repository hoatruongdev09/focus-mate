import { ReactNode } from "react";

interface Props {
    children: ReactNode
    onBgClick: () => void
    isShow: boolean
}

function Modal(prop: Props) {
    const { isShow, children, onBgClick } = prop
    if (!isShow) { return <></> }
    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-gray-950 bg-opacity-80"
            onClick={onBgClick}
        >
            {children}
        </div>
    );
}

export default Modal;