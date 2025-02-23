import { useGetWorkspacesQuery } from "../store/services/workspace-service"
import WorkspaceItem from "../components/workspace-boards/workspace-item"
import { WorkspaceRole } from "../types/workspace.type"
import { useSelector } from "react-redux"
import { AppRootState } from "../store/store"
import { Navigate } from "react-router-dom"


const HomeBoardsPage = () => {
    const user = useSelector((state: AppRootState) => state.user.data)
    if (!user) {
        return <Navigate to={"/unauthorize"} />
    }
    const {
        data: workspaces,
        isLoading: isLoadingWorkspaces,
        isError: isLoadWorkspaceError,
        error: loadWorkspaceError
    } = useGetWorkspacesQuery()

    if (isLoadingWorkspaces) {
        return <>Loading</>
    }

    if (isLoadWorkspaceError) {
        return <>{JSON.stringify(loadWorkspaceError)}</>
    }

    const yourWorkspace = workspaces?.data.find(w => w.members.filter(m => m.role == WorkspaceRole.Owner).map(m => m.user_id).includes(user?.id))
    const guestWorkspace = workspaces?.data.filter(w => w.id != yourWorkspace?.id)
    return (
        <>
            <div className="flex-1 py-10 px-10 pr-10 xl:flex-none xl:w-[50%] xl:pr-0 overflow-y-scroll">
                {
                    yourWorkspace && <>
                        <div className="flex">
                            <p className="text-xl font-extrabold leading-none">Your workspaces:</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <WorkspaceItem key={`workspace-item-${yourWorkspace.id}`} workspace={yourWorkspace} />
                        </div>
                    </>
                }
                <div className="flex mt-3">
                    <p className="text-xl font-bold leading-none">Guess workspaces:</p>
                </div>
                <div className="flex flex-col gap-2 mt-3">

                    {
                        guestWorkspace && guestWorkspace.map(w => (
                            <WorkspaceItem key={`workspace-item-${w.id}`} workspace={w} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default HomeBoardsPage