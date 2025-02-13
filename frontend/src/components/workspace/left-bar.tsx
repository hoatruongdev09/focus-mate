import { ChevronDownIcon, DocumentTextIcon, UsersIcon } from "@heroicons/react/24/outline"
import { ReactNode, useEffect, useState } from "react"
import { useGetWorkspacesQuery } from "../../store/services/workspace-service"
import { Link, useLocation } from "react-router-dom"

const LeftBar = () => {
    const location = useLocation()
    const [expandedWs, setExpandedWs] = useState<boolean[]>([])
    const {
        data: workspaces,
        isLoading: isFetchingWorkspaces,
        isError: isFetchWorkspaceError,
        error: fetchWorkspaceError
    } = useGetWorkspacesQuery()

    useEffect(() => {
        if (!workspaces) { return }
        setExpandedWs(workspaces.map((w) => false))
    }, [workspaces])

    if (isFetchingWorkspaces) {
        return null
    }




    const handleMyWorkSpaceClicked = (index: number) => {
        const ws = [...expandedWs]
        ws[index] = !expandedWs[index]
        setExpandedWs(ws);
    }

    return (
        <div className="w-72 py-10 flex flex-col px-2">
            <ul>
                <ListItem
                    isActive={location.pathname.endsWith('/home/boards')}
                    className="rounded">
                    <div className="py-2 rounded-md px-2 flex gap-2 items-center">
                        <div className="p-0.5"><DocumentTextIcon className="size-5" /></div>
                        <p className="text-sm font-semibold">Boards</p>
                    </div>
                </ListItem>
            </ul>
            <div className="h-px bg-zinc-600 rounded mt-3" />


            <p className="font-semibold text-sm text-zinc-800 ml-3 py-2 mt-2">Workspaces</p>

            <ul className="mt-2">
                {
                    workspaces?.map((w, index) => (
                        <div key={`workspace-li-${w.id}`}>
                            <ListItem
                                className="rounded"
                                onClick={() => handleMyWorkSpaceClicked(index)}
                            >
                                <div className="flex items-center gap-2 px-2 py-2 justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 bg-red-500 rounded flex items-center justify-center">
                                            <p className="text-sm font-bold text-white">M</p>
                                        </div>
                                        <span className="font-semibold text-zinc-800">{w.name}</span>
                                    </div>
                                    <ChevronDownIcon
                                        className={`size-5 ${expandedWs[index] ? "rotate-180" : "rotate-0"} transition-transform duration-150`}
                                    />
                                </div>
                            </ListItem>
                            <ul className={`mt-2 ${expandedWs[index] ? "block" : "hidden"}`}>
                                <ListItem
                                    className="rounded my-1"
                                >
                                    <Link
                                        className="flex items-center pl-10 py-2 gap-4"
                                        to={`w/${w.id}`}
                                    >
                                        <DocumentTextIcon className="size-4" />
                                        <span className="text-sm">Boards</span>
                                    </Link>
                                </ListItem>
                                <ListItem className="rounded my-1">
                                    <div className="flex items-center pl-10 py-2 gap-4">
                                        <UsersIcon className="size-4" />
                                        <span className="text-sm">Members</span>
                                    </div>
                                </ListItem>
                            </ul>
                        </div>
                    ))
                }


            </ul>

        </div >
    )

    function ListItem({
        isActive,
        children,
        className,
        onClick
    }:
        {
            isActive?: boolean,
            children: ReactNode,
            className?: string,
            onClick?: () => void
        }) {
        return (
            <li
                className={`${isActive ? "bg-blue-50 text-blue-700" : ""} hover:bg-zinc-300 hover:cursor-pointer  ${className}`}
                onClick={onClick}
            >
                {
                    children
                }
            </li>
        )
    }
}

export default LeftBar