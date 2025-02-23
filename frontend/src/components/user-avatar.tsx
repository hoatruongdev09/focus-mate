interface Props {
    user_avatar?: string | null
    className?: string
}

const UserAvatar = (props: Props) => {
    const { user_avatar, className } = props
    return (
        <img
            src={user_avatar ?? `https://avatar.iran.liara.run/public/31`}
            className={className}
        />
    )
}

export default UserAvatar