interface Props {
    attributes: React.HTMLAttributes<HTMLParagraphElement>,
    children?: React.ReactNode | undefined
    align?: string | undefined
}

const ParagraphElement = (props: Props) => {
    const { attributes, children, align } = props
    let style = {}
    if (align) {
        style = { textAlign: align }
    }
    return (
        <p
            style={style}
            {...attributes}
        >
            {children}
        </p>
    )
}

export default ParagraphElement