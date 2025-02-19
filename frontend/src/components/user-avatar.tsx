interface Props {
    user_id: string
    className?: string
}

const UserAvatar = (props: Props) => {
    const { user_id, className } = props
    return (
        <img
            src={`https://avatar.iran.liara.run/public/${user_id}`}
            className={className}
        />
    )
}

export default UserAvatar