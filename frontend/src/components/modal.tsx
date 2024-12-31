
interface ModalProps {
    isOpen: boolean
    onCancel: () => void
    children: React.ReactNode
}

function Modal({ isOpen, onCancel, children }: ModalProps) {
    return (
        <div className={`fixed left-0 top-0 right-0 bottom-0 bg-slate-900 bg-opacity-35 z-50 ${isOpen ? "block" : "hidden"}`}>
            <button
                className="fixed left-0 top-0 right-0 bottom-0 z-40 cursor-default "
                onClick={e => onCancel()}
            ></button>
            {children}
        </div>
    );
}

export default Modal;