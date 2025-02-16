import { BoardActivity } from "../../../types/board-activity.type"
import UserAvatar from "../../user-avatar"

interface Props {
    activity: BoardActivity
}
enum ActivityType {
    CREATE_BOARD = 1,
    UPDATE_BOARD = 2,
    DELETE_BOARD = 3,
    CREATE_CARD = 4,
    UPDATE_CARD = 5,
    DELETE_CARD = 6,
    CREATE_LIST = 7,
    UPDATE_LIST = 8,
    DELETE_LIST = 9,
    MOVE_CARD = 10,
    ARCHIVE_LIST = 11,
    UNARCHIVE_LIST = 12,
    ARCHIVE_CARD = 13,
    UNARCHIVE_CARD = 14,

}

const ActivityItem = (props: Props) => {
    const { activity } = props
    return (
        <div className="flex gap-2 items-start py-1">
            <UserAvatar
                user_id={activity.owner_id}
                className="w-8 h-8"
            />
            <div className="flex flex-col text-zinc-800 gap-1">
                <p className="text-zinc-800">
                    <span className="font-semibold pr-1">{activity.actor.first_name} {activity.actor.last_name}</span>
                    <ActivityContent
                        activity={activity}
                    />
                </p>
                <p className="text-xs">{activity.created_at}</p>
            </div>
        </div>
    )

    function ActivityContent({ activity }: { activity: BoardActivity }) {
        const { actor, action } = activity

        switch (action) {
            case ActivityType.CREATE_BOARD:
                return <span className="text-sm">created this board</span>
            case ActivityType.CREATE_CARD:
                return (
                    <span className="text-sm">
                        added <span className="text-blue-600 hover:underline hover:cursor-pointer">{activity.card?.title}</span> to {activity.list_name}
                    </span>
                )
            case ActivityType.CREATE_LIST:
                return <span className="text-sm">added {activity.list_name} to this board</span>
            case ActivityType.ARCHIVE_CARD:
                return (
                    <span className="text-sm">
                        archived
                        <span className="text-blue-600 hover:underline hover:cursor-pointer px-1">
                            {activity.card?.title}
                        </span>
                    </span>
                )
            case ActivityType.UNARCHIVE_CARD:
                return (
                    <span className="text-sm">
                        sent
                        <span className="text-blue-600 hover:underline hover:cursor-pointer px-1">
                            {activity.card?.title}
                        </span>
                        to the board
                    </span>
                )
            case ActivityType.ARCHIVE_LIST:
                return <span className="text-sm">archived {activity.list_name}</span>
            case ActivityType.UNARCHIVE_LIST:
                return <span className="text-sm">sent {activity.list_name}</span>
            default:
                return <span className="text-sm">unknown action</span>
        }
    }
}

export default ActivityItem