interface Props {
    attributes: React.HTMLAttributes<HTMLParagraphElement>,
    children?: React.ReactNode | undefined
}

const ParagraphElement = (props: Props) => {
    const { attributes, children } = props
    return (
        <p {...attributes}>
            {children}
        </p>
    )
}

export default ParagraphElement