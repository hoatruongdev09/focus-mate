interface Props {
    isActive: boolean
    hide: () => void
}

const CoverChangeDialog = (props: Props) => {
    const { isActive, hide } = props
    if (!isActive) {
        return <></>
    }
    return (
        <div className="w-72 h-96 bg-white rounded-md p-3 relative shadow-xl border z-10">

        </div>
    )
}

export default CoverChangeDialog