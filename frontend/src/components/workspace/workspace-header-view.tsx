import { createContext, useState } from "react"
import WorkspaceInfoEditForm from "../home/workspace-boards-page/workspace-info-edit-form"
import WorkspaceInfoView from "../home/workspace-boards-page/workspace-info-view"
import { Workspace } from "../../types/workspace.type"

interface Props {
    workspace: Workspace
}

export const HomeWorkspaceContext = createContext({
    isEditInfo: false,
    handleSetEditInfo: (value: boolean) => { }
})

const WorkspaceHeaderView = (props: Props) => {
    const { workspace } = props
    const [isEditInfo, setIsEditInfo] = useState(false)
    const handleSetEditInfo = (value: boolean) => {
        setIsEditInfo(value)
    }
    return (
        <HomeWorkspaceContext.Provider value={{ isEditInfo, handleSetEditInfo }}>
            {
                isEditInfo ?
                    <WorkspaceInfoEditForm workspace={workspace} /> :
                    <WorkspaceInfoView workspace={workspace} />
            }
        </HomeWorkspaceContext.Provider>
    )
}

export default WorkspaceHeaderView