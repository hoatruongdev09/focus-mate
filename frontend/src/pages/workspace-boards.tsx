import { useContext } from "react"
import { useGetBoardsQuery } from "../store/services/board-service"
import { NavLink } from "react-router-dom"
import { useGetWorkspacesQuery } from "../store/services/workspace-service"
import { WorkspaceContext } from "./workspace"
import WorkspaceItem from "../components/workspace-boards/workspace-item"


interface Props {

}

const WorkspaceBoardPage = (props: Props) => {
    const { data: workspaces, isLoading: isLoadingWorkspaces } = useGetWorkspacesQuery()

    if (isLoadingWorkspaces) {
        return <></>
    }
    return (
        <>
            <div className="flex-1 py-10 pr-10 xl:flex-none xl:w-[50%] xl:pr-0">
                <div className="flex">
                    <p className="text-xl font-extrabold leading-none">Your workspaces:</p>
                </div>
                <div className="flex flex-col gap-2 mt-3">

                    {
                        workspaces && workspaces.map(w => (
                            <WorkspaceItem key={`workspace-item-${w.id}`} workspace={w} />
                        ))
                    }
                </div>
                <div className="flex mt-3">
                    <p className="text-xl font-bold leading-none">Guess workspaces:</p>
                </div>
            </div>
        </>
    )
}

export default WorkspaceBoardPage