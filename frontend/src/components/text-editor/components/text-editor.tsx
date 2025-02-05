// Import React dependencies.
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { BaseEditor, createEditor, Descendant, Operation, Transforms } from 'slate'

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
export type EditorRef = {
    clear: () => void
    setValue: (value: string) => void
}
export type CustomDescendant = Descendant | EditorElement

interface Props {
    isActive: boolean
    setIsActive?: (active: boolean) => void
    value: string
    onChange?: (value: string) => void
    onRawValueChange?: (value: CustomDescendant[]) => void
    onBlur?: () => void
    isReadonly?: boolean
    placeHolder?: string
}

const TextEditor = forwardRef<EditorRef | undefined | null, Props>((props: Props, ref: any) => {
    const { value,
        onChange,
        onBlur,
        isActive,
        setIsActive,
        onRawValueChange,
        isReadonly,
        placeHolder } = props
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

    useImperativeHandle(ref, () => ({
        clear() {
            editor.children = [{ type: ElementType.paragraph, children: [{ text: '' }] }];
            Transforms.select(editor, { path: [0, 0], offset: 0 });
            editor.onChange();
        },
        setValue(value: string) {
            const defaultValue: EditorElement[] = [
                {
                    type: ElementType.paragraph,
                    children: [{ text: '' }],
                }
            ]
            if (!value) {
                return defaultValue
            }
            editor.children = JSON.parse(value) || defaultValue
            Transforms.select(editor, { path: [0, 0], offset: 0 });
            editor.onChange();
        }
    }))

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
        onRawValueChange && onRawValueChange(value);
        const content = JSON.stringify(value)
        onChange && onChange(content)
    }, [editor])

    const handleOnFocus = useCallback(() => {
        setIsFocus(true)
        setIsActive && setIsActive(true)
    }, [setIsFocus, setIsActive])

    const handleOnBlur = useCallback(() => {
        onBlur && onBlur()
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
                    readOnly={isReadonly}
                    renderPlaceholder={renderPlaceHolder}
                    placeholder={placeHolder}
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
})

export default TextEditor;