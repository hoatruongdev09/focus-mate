// Import React dependencies.
import React, { ReactNode, useCallback, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { BaseEditor, createEditor, Descendant, Editor, Transforms, Element } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react'

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type CustomText = {
    text: string
    bold?: boolean | undefined
}

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{
            text: 'A line of text in a paragraph.',
            bold: false
        }],
    },
]

const CodeElement = ({ attributes, children }: {
    attributes: React.HtmlHTMLAttributes<HTMLPreElement>
    children: ReactNode
}) => {
    return (
        <pre {...attributes}>
            <code>{children}</code>
        </pre>
    )
}

const DefaultElement = ({ attributes, children }: {
    attributes: React.HTMLAttributes<HTMLParagraphElement>,
    children?: React.ReactNode | undefined
}) => {
    return (<p {...attributes}>
        {children}
    </p>)
}

const Leaf = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props
    console.log(leaf)
    return (
        <span
            {...attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {children}
        </span>)
}

function DescriptionTextEditor() {
    const [editor] = useState(() => withReact(createEditor()))

    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])



    const customEditor = {
        isBoldMarkActive(editor: BaseEditor & ReactEditor) {
            const marks = Editor.marks(editor)
            return marks ? marks.bold === true : false
        },
        isCodeBlockActive(editor: BaseEditor & ReactEditor) {
            const [match] = Editor.nodes(editor, {
                match: (n: any) => n.type === 'code'
            })
            return match
        },
        toggleBoldMark(editor: BaseEditor & ReactEditor) {
            const isActive = customEditor.isBoldMarkActive(editor)
            if (isActive) {
                Editor.removeMark(editor, 'bold')
            } else {
                Editor.addMark(editor, 'bold', true)
            }
        },
        toggleCodeBlock(editor: BaseEditor & ReactEditor) {
            const isActive = customEditor.isCodeBlockActive(editor)
            Transforms.setNodes(
                editor,
                { type: isActive ? 'paragraph' : 'code' },
                { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
            )
        }
    }

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!(e.ctrlKey)) {
            return
        }
        switch (e.key) {
            case '`':
                e.preventDefault()
                customEditor.toggleCodeBlock(editor)
                break
            case 'b':
                e.preventDefault()
                customEditor.toggleBoldMark(editor)
                break
        }
    }, [customEditor])

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return (
            <Leaf {...props} />
        )
    }, [])

    return (
        <Slate
            editor={editor}
            initialValue={initialValue}
        ><div>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        customEditor.toggleBoldMark(editor)
                    }}
                >
                    Bold
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        customEditor.toggleCodeBlock(editor)
                    }}
                >
                    Code Block
                </button>
            </div>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={handleKeyDown}
            />
        </Slate>
    )
}

export default DescriptionTextEditor;