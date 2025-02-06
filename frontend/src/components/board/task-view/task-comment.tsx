import { useSelector } from "react-redux"
import { CardComment as Comment } from "../../../types/board-type"
import TextEditor from "../../text-editor/components/text-editor"
import { AppRootState } from "../../../store/store"

interface Props {
    comment: Comment
}

const TaskComment = (props: Props) => {
    const { comment } = props

    const user = useSelector((state: AppRootState) => state.user)

    const timeAgo = (createdAt: Date) => {
        const now = new Date();
        const time = new Date(Date.now()).getTime() - new Date(createdAt).getTime()
        const seconds = Math.floor((time) / 1000);

        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minutes ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} days ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} months ago`;
        const years = Math.floor(days / 365);
        return `${years} years ago`;
    }

    return (
        <div className="flex gap-2">
            <div className="h-10 w-10">
                <img
                    src={`https://avatar.iran.liara.run/public/${comment.user.id ?? 34}`}
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <p className="font-semibold">
                    {comment.user.first_name} {comment.user.last_name}
                    <span className="pl-1 font-light text-sm text-gray-700">
                        {timeAgo(comment.created_at)}
                    </span>
                </p>
                <div className="bg-white shadow-sm rounded px-1 flex-1">
                    <TextEditor
                        value={comment.content}
                        isActive={false}
                        isReadonly={true}
                        placeHolder=""
                    />
                </div>
                {
                    user.data?.id === comment.user.id &&
                    (
                        <div className="flex gap-2 items-center ml-1">
                            <button className="bg-orange-400 w-4 h-4"></button>
                            <p className="font-light text-xs text-gray-700">•</p>
                            <button className="font-light text-xs text-gray-700">Edit</button>
                            <p className="font-light text-xs text-gray-700">•</p>
                            <button className="font-light text-xs text-gray-700">Delete</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TaskComment