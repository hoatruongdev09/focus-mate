import { BaseEditor } from "slate"
import { ReactEditor } from "slate-react"
import BlockButton from "./toolbar-block-button"
import { AlignType, ElementType, MarkType } from "../text-editor-element"
import { toggleBlock, toggleMark } from "../editor-function"
import { BoldIcon, H1Icon, H2Icon, H3Icon, ItalicIcon, UnderlineIcon, CodeBracketIcon, Bars3BottomLeftIcon, Bars3Icon, Bars3BottomRightIcon, Bars4Icon } from '@heroicons/react/24/solid';
import MarkButton from "./toolbar-mark-button"

interface Props {
    editor: BaseEditor & ReactEditor
    isActive: boolean
}

const Toolbar = (props: Props) => {
    const { editor, isActive } = props
    return (
        <div className={`flex gap-2 items-center bg-white p-1 h-8 rounded-t-sm shadow-md ${isActive ? 'block' : 'hidden'}`}>
            <div className='flex gap-1 items-center'>
                <BlockButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleBlock(editor, ElementType.heading1)
                    }}
                    format={ElementType.heading1}
                >
                    <H1Icon className='size-4' />
                </BlockButton>
                <BlockButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleBlock(editor, ElementType.heading2)
                    }}
                    format={ElementType.heading2}
                >
                    <H2Icon className='size-4' />
                </BlockButton>

                <BlockButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleBlock(editor, ElementType.heading3)
                    }}
                    format={ElementType.heading3}
                >
                    <H3Icon className='size-4' />
                </BlockButton>
            </div>
            <div className='w-px h-full bg-gray-400' />
            <div className='flex gap-1 items-center'>
                <MarkButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleMark(editor, MarkType.bold)
                    }}
                    format={MarkType.bold}
                >

                    <BoldIcon className='size-4' />
                </MarkButton>
                <MarkButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleMark(editor, MarkType.italic)
                    }}
                    format={MarkType.italic}
                >
                    <ItalicIcon className='size-4' />
                </MarkButton>

                <MarkButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleMark(editor, MarkType.underline)
                    }}
                    format={MarkType.underline}
                >
                    <UnderlineIcon className='size-4' />
                </MarkButton>
            </div>
            <div className='flex gap-1 items-center'>
                <BlockButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleBlock(editor, AlignType.left)
                    }}
                    format={AlignType.left}
                >
                    <Bars3BottomLeftIcon className="size-4" />
                </BlockButton>
                <BlockButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleBlock(editor, AlignType.center)
                    }}
                    format={AlignType.center}
                >
                    <Bars3Icon className="size-4" />
                </BlockButton>
                <BlockButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleBlock(editor, AlignType.right)
                    }}
                    format={AlignType.right}
                >
                    <Bars3BottomRightIcon className="size-4" />
                </BlockButton>
                <BlockButton
                    onMouseDown={event => {
                        event.preventDefault()
                        toggleBlock(editor, AlignType.justify)
                    }}
                    format={AlignType.justify}
                >
                    <Bars4Icon className="size-4" />
                </BlockButton>
            </div>
            <div className='w-px h-full bg-gray-400' />
            <MarkButton
                onMouseDown={event => {
                    event.preventDefault()
                    toggleMark(editor, MarkType.code)
                }}
                format={MarkType.code}
            >
                <CodeBracketIcon className='size-4' />
            </MarkButton>

        </div>
    )
}

export default Toolbar