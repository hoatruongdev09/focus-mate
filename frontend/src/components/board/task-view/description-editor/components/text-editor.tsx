// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { BaseEditor, createEditor, Descendant, Operation } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps } from 'slate-react'
import { EditorElement, EditorText } from '../text-editor-element';
import LeafElement from '../elements/leaf-element';
import { toggleBoldMark, toggleItalic, toggleUnderline, toggleCodeBlock, isMarkActive } from '../editor-function';
import RenderElement from './renderer';
import shortCutHandler from '../editor-shortcut-handler';
import { BoldIcon, H1Icon, H2Icon, H3Icon, ItalicIcon, UnderlineIcon, CodeBracketIcon } from '@heroicons/react/24/solid';
import ToolbarButton from './toolbar-button';


declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: EditorElement
        Text: EditorText
    }
}

interface Props {
    value: string,
    onChange: (value: string) => void
    onFocus: () => void
}

function DescriptionTextEditor(props: Props) {

    const { value, onChange, onFocus } = props

    const [isFocus, setIsFocus] = useState(false)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        return () => {
            setIsActive(false)
        }
    }, [])

    const [editor] = useState(() => withReact(createEditor()))
    const initialValue = useMemo(() => {
        if (!value) {
            return [
                {
                    type: 'paragraph',
                    children: [{ text: '' }],
                }
            ]
        }
        return JSON.parse(value) || [
            {
                type: 'paragraph',
                children: [{ text: 'A line of text in a paragraph.' }],
            }
        ]
    }, [value])

    const renderElement = useCallback(RenderElement, [])
    const handleShortcut = useCallback(shortCutHandler, [editor])
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        handleShortcut(e, editor)
    }, [handleShortcut, editor])

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return (<LeafElement {...props} />)
    }, [])

    const handleOnChange = useCallback((value: Descendant[]) => {
        const isAstChange = editor.operations.some((op: Operation) => {
            return op.type !== 'set_selection'
        })
        if (!isAstChange) { return }
        const content = JSON.stringify(value)
        onChange(content)
    }, [editor])

    const handleOnFocus = useCallback(() => {
        onFocus()
        setIsFocus(true)
        setIsActive(true)
    }, [setIsFocus, setIsActive])

    const handleOnBlur = useCallback(() => {
        onFocus()
        setIsFocus(false)
    }, [setIsFocus])

    return (
        <Slate
            editor={editor}
            initialValue={initialValue}
            onChange={handleOnChange}
        >
            <div className={`flex flex-col gap-3 ${isActive ? 'outline outline-2 rounded-sm bg-white' : ''}  ${isFocus ? 'outline-blue-600' : ''}`}>
                <div className={`flex gap-2 items-center bg-white p-1 h-8 rounded-t-sm shadow-md ${isActive ? 'block' : 'hidden'}`}>
                    <div className='flex gap-1 items-center'>
                        <ToolbarButton
                            onMouseDown={event => {
                                event.preventDefault()
                                toggleBoldMark(editor)
                            }}
                            format='heading1'
                        >
                            <H1Icon className='size-4' />
                        </ToolbarButton>
                        <button
                            className='hover:bg-slate-200 p-1 rounded'

                        >
                            <H2Icon className='size-4' />
                        </button>
                        <button
                            className='hover:bg-slate-200 p-1 rounded'
                        >
                            <H3Icon className='size-4' />
                        </button>
                    </div>
                    <div className='w-px h-full bg-gray-400' />
                    <div className='flex gap-1 items-center'>
                        <ToolbarButton
                            onMouseDown={event => {
                                event.preventDefault()
                                toggleBoldMark(editor)
                            }}
                            format='bold'
                        >

                            <BoldIcon className='size-4' />
                        </ToolbarButton>
                        <button
                            className='hover:bg-slate-200 p-1 rounded'
                        >
                        </button>
                        <ToolbarButton
                            onMouseDown={event => {
                                event.preventDefault()
                                toggleItalic(editor)
                            }}
                            format='italic'
                        >
                            <ItalicIcon className='size-4' />
                        </ToolbarButton>

                        <ToolbarButton
                            onMouseDown={event => {
                                event.preventDefault()
                                toggleUnderline(editor)
                            }}
                            format='underline'
                        >
                            <UnderlineIcon className='size-4' />
                        </ToolbarButton>
                    </div>
                    <div className='w-px h-full bg-gray-400' />
                    <ToolbarButton
                        onMouseDown={event => {
                            event.preventDefault()
                            toggleCodeBlock(editor)
                        }}
                        format='code'
                    >

                        <CodeBracketIcon className='size-4' />
                    </ToolbarButton>

                </div>
                <Editable
                    placeholder='Add a more detailed description'
                    className='outline-none p-2 rounded-b-sm'
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={handleKeyDown}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
            </div>
        </Slate>
    )
}

export default DescriptionTextEditor;