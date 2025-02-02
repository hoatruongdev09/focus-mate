import { RenderPlaceholderProps } from "slate-react";

const PlaceHolder = (props: RenderPlaceholderProps) => {
    const { attributes, children } = props
    const { style, ...attr } = attributes
    return (
        <span
            style={{ userSelect: 'none' }}
            {...attr}
            className='absolute block max-w-full opacity-30 pointer-events-none font-normal not-italic no-underline'
        >
            {children}
        </span>
    )
}

export default PlaceHolder