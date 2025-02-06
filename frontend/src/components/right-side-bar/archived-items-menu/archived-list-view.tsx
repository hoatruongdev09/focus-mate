import { EyeIcon } from "@heroicons/react/24/outline"
import { Group } from "../../../types/board-type"

interface Props {
    isShow: boolean
    groups: Group[]
}

const ArchivedListsView = (props: Props) => {
    const { isShow } = props

    return (
        <div
            className={`absolute inset-0 overflow-y-scroll flex flex-col items-center mt-2 gap-2 ${isShow ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
        >
            <div className="flex w-72 flex-col">
                <div className="h-8 rounded-t-lg bg-blue-500 border-t border-l border-r"></div>
                <div className="flex flex-col gap-2 p-2 bg-white rounded-b-lg border-b border-l border-r">

                    <p>[api] for moving note between list askdf lasjdnf</p>
                    <div className="flex gap-2">
                        <EyeIcon className="size-3" />
                    </div>
                </div>
            </div>
            <div className="flex w-72 flex-col">
                <div className="h-8 rounded-t-lg bg-blue-500 border-t border-l border-r"></div>
                <div className="flex flex-col gap-2 p-2 bg-white rounded-b-lg border-b border-l border-r">

                    <p>[api] for moving note between list askdf lasjdnf</p>
                    <div className="flex gap-2">
                        <EyeIcon className="size-3" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArchivedListsView