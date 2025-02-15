import { useContext, useState } from "react"
import { Workspace } from "../../../types/workspace"
import { HomeWorkspaceContext } from "../../../pages/home-workspace-boards-page"
import { UpdateWorkspaceData } from "../../../types/update-workspace-data"
import { useUpdateWorkspaceMutation } from "../../../store/services/workspace-service"


function WorkspaceInfoEditForm({ workspace }: { workspace: Workspace | null | undefined }) {
    const [formState, setFormState] = useState<UpdateWorkspaceData>({
        name: workspace?.name || "",
        description: workspace?.description || "",
        short_name: workspace?.short_name || ""
    })

    const [updateWorkspace] = useUpdateWorkspaceMutation()

    const homeWorkspaceContext = useContext(HomeWorkspaceContext)

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const onSaveInfo = async () => {
        if (!workspace) { return }

        try {
            await updateWorkspace({
                workspace_id: workspace.id,
                data: formState
            })
            homeWorkspaceContext.handleSetEditInfo(false)
        } catch (error) {
            console.error(error)
        }

    }
    const onDiscardInfo = () => {
        homeWorkspaceContext.handleSetEditInfo(false)
    }

    return (
        <div className="flex flex-col gap-3 px-4 w-full md:w-[50%]">
            <div className="flex flex-col gap-1">
                <p className="text-zinc-800 font-semibold text-sm">
                    Name <span className="text-red-500 text-sm">*</span>
                </p>
                <input
                    name="name"
                    className="border rounded px-3 py-1 border-zinc-500"
                    type="text"
                    value={formState.name}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-zinc-800 font-semibold text-sm">
                    Short name <span className="text-red-500 text-sm">*</span>
                </p>
                <input
                    name="short_name"
                    className="border rounded px-3 py-1 border-zinc-500"
                    type="text"
                    value={formState.short_name}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-zinc-800 font-semibold text-sm">
                    Description (optional)
                </p>
                <textarea
                    name="description"
                    className="border rounded px-3 py-2 border-zinc-500 text-sm"
                    rows={3}
                    value={formState.description}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="flex gap-1">
                <button
                    onClick={onSaveInfo}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 text-sm rounded-sm"
                >
                    Save
                </button>

                <button
                    onClick={onDiscardInfo}
                    className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 px-3 py-1 text-sm rounded-sm"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default WorkspaceInfoEditForm