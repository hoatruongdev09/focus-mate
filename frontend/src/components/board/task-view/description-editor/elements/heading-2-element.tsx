interface Props {
    attributes: React.HTMLAttributes<HTMLHeadingElement>,
    children?: React.ReactNode | undefined
}

const Heading2Element = (props: Props) => {
    const { attributes, children } = props
    return (
        <h2 {...attributes}>
            {children}
        </h2>
    )
}

export default Heading2Element