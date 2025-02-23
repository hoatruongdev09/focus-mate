import { useSelector } from "react-redux"
import WorkspaceHeaderView from "../components/workspace/workspace-header-view"
import { AppRootState } from "../store/store"
import { useCreateWorkspaceInviteLinkMutation, useDisableWorkspaceInviteLinkMutation, useGetWorkspaceMembersQuery } from "../store/services/workspace-service"
import { MagnifyingGlassIcon, XMarkIcon, CheckCircleIcon, LinkIcon } from "@heroicons/react/24/outline"
import UserAvatar from "../components/user-avatar"
import { WorkspaceRole } from "../types/workspace.type"
import { useEffect, useState } from "react"


const WorkspaceMembersView = () => {
    const workspace = useSelector((state: AppRootState) => state.workspaceView.currentWorkspace)
    const currentUser = useSelector((state: AppRootState) => state.user.data)
    const [showLinkCopied, setShowLinkCopied] = useState(false)

    const {
        data: members,
        isLoading: isLoadingMembers,
        isError: isLoadMemberError,
        error: loadMemberError
    } = useGetWorkspaceMembersQuery(workspace?.id || "")

    const [
        createInviteLink, {
            isLoading: isCreatingInviteLink,
            isError: isCreateInviteLinkError,
            error: createInviteLinkError
        }
    ] = useCreateWorkspaceInviteLinkMutation()

    const [
        disableLink, {
            isLoading: isDisablingInviteLink,
            isError: isDisableLinkError,
            error: disableLinkError
        }
    ] = useDisableWorkspaceInviteLinkMutation()

    useEffect(() => {
        if (!showLinkCopied) { return }
        const timer = setTimeout(() => setShowLinkCopied(false), 3000)
        return () => { clearTimeout(timer) }
    }, [showLinkCopied])

    if (!workspace) { return null }


    if (isLoadingMembers) {
        return (<>Loading</>)
    }

    if (isLoadMemberError) {
        return <>{JSON.stringify(loadMemberError)}</>
    }

    if (!members) { return null }
    const workspaceAdmins = members.data.filter(m => m.role == WorkspaceRole.Owner || m.role == WorkspaceRole.Admin)
    const isAdminOrOwner = workspaceAdmins.find(m => m.user_id == currentUser?.id) != null

    const onCreateInviteLink = async () => {
        try {
            await createInviteLink(workspace.id)
            console.log(`created invite link`)
        } catch (err) {
            console.error(err)
        }
    }

    const onDisableInviteLink = async () => {
        try {
            await disableLink(workspace.id)
        } catch (err) {

        }
    }

    const onCopyInviteLink = async () => {
        if (showLinkCopied) { return }
        const hostHame = import.meta.env.VITE_HOST_NAME

        const link = `${hostHame}/invite-members/${workspace.id}/${workspace.invite_id}`
        navigator.clipboard.writeText(link)
        setShowLinkCopied(true)
    }

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col items-center pb-10 w-full xl:w-[90%] overflow-y-scroll">

                <div className="flex items-stretch flex-col mt-10 w-[60%]">
                    <WorkspaceHeaderView workspace={workspace} />
                </div>

                <div className="w-full flex px-12">
                    <div className="w-full h-px bg-zinc-400 mt-10" />
                </div>
                <div className="w-full flex flex-col gap-3 mt-8 px-10">
                    <p className="font-bold text-zinc-700 text-xl">Workspace members ({members?.data.length})</p>
                    <p className="text-zinc-700">Workspace members can view and join all Workspace visible boards and create new boards in the Workspace.</p>
                </div>
                <div className="w-full flex px-12">
                    <div className="w-full h-px bg-zinc-400 mt-10" />
                </div>
                <div className="w-full flex mt-8 px-10 items-center">
                    <div className="flex flex-col gap-3 flex-1">
                        <p className="font-bold text-zinc-700 text-xl">Invite members to join you</p>
                        <p className="text-zinc-700 max-w-[600px]">
                            Anyone with an invite link can join this workspace. You can also disable and create a new invite link
                            for this workspace at any time.
                        </p>
                    </div>
                    <div className="flex flex-col-reverse gap-2 items-end h-full">
                        <div className="flex items-center flex-row-reverse gap-2">
                            {
                                workspace.invite_id &&
                                <button
                                    className="flex gap-2 items-center px-2 py-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-sm"
                                    onClick={onCopyInviteLink}
                                >
                                    <LinkIcon className="size-4" />
                                    Invite with link
                                </button>
                            }
                            {
                                (isAdminOrOwner && !workspace.invite_id) &&
                                <button
                                    disabled={isCreatingInviteLink}
                                    className="flex gap-2 items-center px-2 py-1 disabled:bg-zinc-200 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-sm"
                                    onClick={onCreateInviteLink}
                                >
                                    <LinkIcon className="size-4" />
                                    Create invite link
                                </button>
                            }
                            {
                                (isAdminOrOwner && workspace.invite_id) &&
                                <button
                                    disabled={isDisablingInviteLink}
                                    className="flex gap-2 items-center px-2 py-1 disabled:bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-sm font-semibold"
                                    onClick={onDisableInviteLink}
                                >
                                    Disable invite link
                                </button>
                            }

                        </div>

                        {
                            showLinkCopied && <div className="flex gap-2 px-3 py-2 items-center bg-green-100 text-green-600 rounded-full font-light text-sm">
                                <CheckCircleIcon className="size-4" />
                                Link copied to clipboard
                            </div>
                        }

                    </div>
                </div>
                <div className="w-full flex px-12">
                    <div className="w-full h-px bg-zinc-400 mt-10" />
                </div>
                <div className="w-full flex flex-col gap-6 mt-8 px-10">
                    <p className="font-bold text-zinc-700 text-xl">Members</p>
                    <div className="flex flex-col w-full lg:flex-row gap-2 items-center justify-between">
                        <div className="flex items-center gap-1 w-full lg:w-auto">
                            <div className="flex flex-col gap-1 flex-1 lg:flex-none">
                                <p className="text-zinc-700 font-semibold text-sm">Sort by</p>
                                <input
                                    type="text"
                                    className="border rounded-sm px-2 py-1 lg:w-56"
                                    placeholder="Most recently active"
                                />
                            </div>
                            <div className="flex flex-col gap-1 flex-1 lg:flex-none">
                                <p className="text-zinc-700 font-semibold text-sm">Filter by</p>
                                <input
                                    type="text"
                                    className="border rounded-sm px-2 py-1 lg:w-56"
                                    placeholder="Most recently active"
                                />
                            </div>
                        </div>
                        <div className="flex w-full lg:w-auto flex-col gap-1">
                            <p className="text-zinc-700 font-semibold text-sm">Search</p>
                            <div className="flex items-center gap-2 border rounded-sm px-2 py-1">
                                <MagnifyingGlassIcon className="size-4" />
                                <input
                                    type="text"
                                    placeholder="Search members"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-6 mt-8 px-10">
                    {
                        members.data.map(m => (
                            <div
                                key={`member-row-${m.user_id}`}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <UserAvatar
                                        user_avatar={m.user.user_avatar}
                                        className="size-12"
                                    />
                                    <div className="flex flex-col justify-between">
                                        <p className="font-semibold text-zinc-700">{m.user.first_name} {m.user.last_name}</p>
                                        <p className="text-sm text-zinc-700">@{m.user.username}</p>
                                    </div>
                                </div>
                                {
                                    currentUser && <div className="flex flex-row-reverse items-center gap-2">
                                        {
                                            (currentUser.id == m.user_id) && < button className="flex gap-2 px-3 py-1 items-center text-zinc-700 bg-zinc-200 hover:bg-zinc-300 rounded">
                                                <XMarkIcon className="size-5" /> Leave...
                                            </button>
                                        }
                                        {

                                            (isAdminOrOwner && currentUser.id != m.user_id) && < button className="flex gap-2 px-3 py-1 items-center text-zinc-700 bg-zinc-200 hover:bg-zinc-300 rounded">
                                                <XMarkIcon className="size-5" /> Remove...
                                            </button>
                                        }
                                        <button className="flex gap-2 px-3 py-1 items-center text-zinc-700 bg-zinc-200 hover:bg-zinc-300 rounded">
                                            View boards
                                        </button>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default WorkspaceMembersView