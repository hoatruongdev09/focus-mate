
interface Props {
    attributes: React.HTMLAttributes<HTMLHeadingElement>,
    children?: React.ReactNode | undefined
    align?: string | undefined
}

const Heading1Element = (props: Props) => {
    const { attributes, children, align } = props
    let style = {}
    if (align) {
        style = { textAlign: align }
    }
    return (
        <h1
            style={style}
            {...attributes}
            className="text-5xl font-extrabold leading-none tracking-tight"
        >
            {children}
        </h1>
    )
}

export default Heading1Element