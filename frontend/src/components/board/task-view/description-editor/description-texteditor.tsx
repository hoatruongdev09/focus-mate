// Import React dependencies.
import React, { ReactNode, useCallback, useState } from 'react'
// Import the Slate editor factory.
import { BaseEditor, createEditor, Descendant, Editor, Transforms, Element } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, RenderElementProps } from 'slate-react'

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type CustomText = { text: string }

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
        children: [{ text: 'A line of text in a paragraph.' }],
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

const Leaf = ({ attributes, children }:
    {
        attributes: React.HTMLAttributes<HTMLSpanElement>,
        children: React.ReactNode
    }) => {
    <span {...attributes}>
        {children}
    </span>
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

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!e.ctrlKey) {
            return
        }
        switch (e.key) {
            case '`':
                e.preventDefault()
                // Determine whether any of the currently selected blocks are code blocks.
                const [match] = Editor.nodes(editor, {
                    match: (n: any) => n.type === 'code',
                })
                // Otherwise, set the currently selected blocks type to "code".
                Transforms.setNodes(
                    editor,
                    { type: match ? 'paragraph' : 'code' },
                    { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
                )
                break
            case 'b':
                e.preventDefault()
                Editor.addMark(editor, 'bold', true)
                break
        }
    }, [])

    return (
        <Slate
            editor={editor}
            initialValue={initialValue}
        >
            <Editable
                renderElement={renderElement}
                onKeyDown={handleKeyDown}
            />
        </Slate>
    )
}

export default DescriptionTextEditor;