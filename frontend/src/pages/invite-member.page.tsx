import { Navigate, useParams } from "react-router-dom"
import { useInviteByLinkMutation } from "../store/services/workspace-service"
import { useEffect } from "react"

const InviteMemberPage = () => {
    const { workspace_id, invite_id } = useParams()
    if (!workspace_id || !invite_id) {
        return <Navigate to={"/"} />
    }
    const [inviteByLink,
        {
            isLoading,
            isError,
            isSuccess,
            error,
            data
        }
    ] = useInviteByLinkMutation()

    useEffect(() => {
        inviteByLink({ workspace_id, invite_id })
    }, [inviteByLink])

    if (isLoading) {
        return <>Loading</>
    }

    if (isError) {
        return <>{JSON.stringify(error)}</>
    }
    if (isSuccess) {
        return <Navigate to={`/w/${data!.data.short_name}/boards`} />
    }
    return <>hey hey</>
}

export default InviteMemberPage