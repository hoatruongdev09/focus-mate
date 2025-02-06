interface SubPageProps {
    isShow: boolean
    children: React.ReactNode
}

const MenuSubPage = (props: SubPageProps) => {
    const { isShow, children } = props
    return (
        <div className={`absolute inset-0 transition-all duration-100 overflow-y-scroll ${isShow ? "opacity-100 -translate-x-0 z-10" : "opacity-0 translate-x-96 z-0"} `}>
            {
                children
            }
        </div>
    )
}

export default MenuSubPage