import { forwardRef, KeyboardEvent } from "react";
import useClickOutside from "../custom-hooks/use-click-outside";

export interface Props {
    outOfFocus: () => void
    value: string
    onChange: (str: string) => void
    visible: boolean
    inputRef: React.RefObject<HTMLTextAreaElement>
}
type TextAreaProps = React.HTMLProps<HTMLTextAreaElement>
const CustomTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => (
    <textarea
        ref={ref}
        {...props}
    />
))


function NewTaskInput(props: Props) {
    const { outOfFocus, value, onChange, visible, inputRef } = props

    const discardRef = useClickOutside(outOfFocus, [value, outOfFocus])


    function detectEnterKeyPress(e: KeyboardEvent<HTMLTextAreaElement>): void {
        if (e.key.toLowerCase() == "enter") {
            e.preventDefault();
            outOfFocus()
        }
    }

    return (
        <div className={visible ? "block" : "hidden"} >
            <div ref={discardRef} className="p-2 bg-white shadow-sm shadow-gray-700 min-h-16 rounded flex flex-col">
                <CustomTextArea
                    ref={inputRef}
                    className=""
                    placeholder="Enter a title"
                    value={value}
                    onChange={e => onChange((e.target as HTMLTextAreaElement).value)}
                    onKeyDown={e => detectEnterKeyPress(e)}

                />
            </div>
        </div>
    );
}

export default NewTaskInput