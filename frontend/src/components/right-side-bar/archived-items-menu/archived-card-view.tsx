import { Task } from "../../../types/board-type"
import ArchivedCard from "./archived-card"

interface Props {
    isShow: boolean
    tasks: Task[] | undefined
}

const ArchivedCardsView = (props: Props) => {
    const { isShow, tasks } = props

    return (
        <div
            className={`absolute inset-0 overflow-y-scroll flex flex-col items-center mt-2 gap-2 ${isShow ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
        >
            {
                tasks && tasks.map(t => (
                    <ArchivedCard key={`archived-card-${t.id}`} task={t} />
                ))
            }

        </div>
    )
}

export default ArchivedCardsView