import { useSelector } from "react-redux"
import { AppRootState } from "../../../store/store"
import { useGetActivitiesQuery } from "../../../store/services/board-service"
import ActivityItem from "./activity-item"

const ActivityMenu = () => {
    const board = useSelector((state: AppRootState) => state.boardView.board)
    if (!board) { return null }

    const { data: activites, isLoading, isError, refetch } = useGetActivitiesQuery(board.id)
    if (isLoading) {
        return <div className="w-full h-full flex items-center justify-center">Loading activities...</div>
    }

    if (isError) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-red-500">
                <p>Failed to load activities.</p>
                <button
                    onClick={refetch}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Retry
                </button>
            </div>
        )
    }
    return (
        <div className="w-full h-full flex flex-col px-4">
            <div className="w-full flex flex-col gap-2 overflow-y-scroll mt-2">
                {
                    activites?.map(activity => (
                        <ActivityItem
                            key={`activity-item-${activity.id}`}
                            activity={activity}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ActivityMenu