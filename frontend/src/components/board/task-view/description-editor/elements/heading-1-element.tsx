interface Props {
    attributes: React.HTMLAttributes<HTMLHeadingElement>,
    children?: React.ReactNode | undefined
}

const Heading1Element = (props: Props) => {
    const { attributes, children } = props
    return (
        <h1 {...attributes}>
            {children}
        </h1>
    )
}

export default Heading1Element