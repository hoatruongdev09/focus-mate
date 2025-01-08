import { ReactNode } from "react";

interface Props {
    children: ReactNode
    onBgClick: () => void
    isShow: boolean
}

function Modal(prop: Props) {
    const { isShow, children, onBgClick } = prop
    if (!isShow) { return <></> }

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget !== e.target) { return }
        onBgClick()
    }
    return (
        <>
            <div
                className="fixed inset-0 bg-gray-950 bg-opacity-80 z-30"
                onClick={e => onClick(e)}
            >
                {children}
            </div>
        </>
    );
}

export default Modal;