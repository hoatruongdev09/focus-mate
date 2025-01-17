// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { BaseEditor, createEditor, Descendant, Operation } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, } from 'slate-react'
import { EditorElement, EditorText, ElementType } from '../text-editor-element';
import LeafElement from '../elements/leaf-element';
import RenderElement from './renderer';
import shortCutHandler from '../editor-shortcut-handler';
import PlaceHolder from '../elements/place-holder';
import Toolbar from './toolbar';


declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: EditorElement
        Text: EditorText
    }

}

type CustomDescendant = Descendant | EditorElement

interface Props {
    isActive: boolean
    setIsActive: (active: boolean) => void
    value: string
    onChange: (value: string) => void
    onFocus: () => void
}

function DescriptionTextEditor(props: Props) {

    const { value, onChange, onFocus, isActive, setIsActive } = props

    const [isFocus, setIsFocus] = useState(false)

    const [editor] = useState(() => withReact(createEditor()))
    const initialValue = useMemo(() => {
        const defaultValue: EditorElement[] = [
            {
                type: ElementType.paragraph,
                children: [{ text: '' }],
            }
        ]
        if (!value) {
            return defaultValue
        }
        return JSON.parse(value) || defaultValue
    }, [value])

    const renderElement = useCallback(RenderElement, [])
    const handleShortcut = useCallback(shortCutHandler, [editor])
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        handleShortcut(e, editor)
    }, [handleShortcut, editor])

    const renderPlaceHolder = useCallback(PlaceHolder, [])

    const renderLeaf = useCallback(LeafElement, [])

    const handleOnChange = useCallback((value: CustomDescendant[]) => {
        const isAstChange = editor.operations.some((op: Operation) => {
            return op.type !== 'set_selection'
        })
        if (!isAstChange) { return }
        console.log(value)
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
                <Toolbar
                    isActive={isActive}
                    editor={editor}
                />
                <Editable
                    renderPlaceholder={renderPlaceHolder}
                    placeholder='Add a more detailed description'
                    className='outline-none p-2 pb-4 rounded-b-sm placeholder:pt-10 placeholder:font-bold'
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={handleKeyDown}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
            </div>
        </Slate >
    )
}

export default DescriptionTextEditor;