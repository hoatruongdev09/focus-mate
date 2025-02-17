import { createApi } from "@reduxjs/toolkit/query/react";
import { AddListData, AddCardData, Board, CreateBoardData, List, Card, CardComment, UpdateBoardData, UpdateListData, UpdateCardData } from "../../types/board.type";
import { baseQueryWithReauth } from "./base-query-with-reauth";
import { BoardActivity } from "../../types/board-activity.type";
import { ServerResponse } from "../../types/server-response.type";

const getArchivedItemsUrl = ({ board_id, type }: { board_id: string, type: string }): string => {
    console.log(`get archive link: ${type}`)
    switch (type) {
        case "cards":
            return `board/${board_id}/archived-cards`
        case "lists":
            return `board/${board_id}/archived-lists`
        default:
            return ""
    }
}

export const boardApi = createApi({
    reducerPath: 'boardApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['board', 'columns', 'cards', 'comments', 'activities'],
    endpoints: (builder) => ({
        getBoards: builder.query<ServerResponse<Board[]>, void>({
            query: () => `/board`,
            providesTags: ['board']
        }),
        getWorkspaceBoards: builder.query<ServerResponse<Board[]>, string>({
            query: (workspace_id) => `workspace/${workspace_id}/boards`,
            providesTags: ['board']
        }),
        getWorkspaceBoardsByShortName: builder.query<ServerResponse<Board[]>, string>({
            query: (short_name) => `workspace/short-name/${short_name}/boards`,
            providesTags: ['board']
        }),
        getBoard: builder.query<ServerResponse<Board>, string>({
            query: (data) => `/board/${data}`
        }),
        createBoard: builder.mutation<ServerResponse<Board>, CreateBoardData>({
            query: data => ({
                url: `/workspace/${data.workspace_id}/boards`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['board', 'activities']
        }),
        updateBoard: builder.mutation<ServerResponse<Board>, { board_id: string, data: UpdateBoardData }>({
            query: data => ({
                url: `/board/${data.board_id}`,
                body: data.data,
                method: 'POST'
            }),
            invalidatesTags: ['board', 'activities']
        }),
        getLists: builder.query<ServerResponse<List[]>, string>({
            query: (board_id) => `/board/${board_id}/lists`,
            providesTags: ['columns']
        }),
        getCards: builder.query<ServerResponse<Card[]>, string>({
            query: (board_id) => `/board/${board_id}/cards`,
            providesTags: ['cards']
        }),
        addList: builder.mutation<ServerResponse<List>, AddListData>({
            query: data => ({
                url: `/board/${data.board_id}/lists`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['columns', 'activities']
        }),
        deleteList: builder.mutation<ServerResponse<any>, { board_id: string, column_id: string }>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.column_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['columns', 'activities']
        }),
        addCard: builder.mutation<ServerResponse<List>, AddCardData>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.list_id}/card`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        deleteCard: builder.mutation<ServerResponse<any>, { board_id: string, card_id: string }>({
            query: data => ({
                url: `/board/${data.board_id}/cards/${data.card_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        updateCard: builder.mutation<ServerResponse<Card>, UpdateCardData>({
            query: data => ({
                url: `/board/${data.board_id}/cards/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        updateList: builder.mutation<ServerResponse<List>, UpdateListData>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['columns', 'activities']
        }),
        archiveOrUnarchiveCard: builder.mutation<ServerResponse<Card>, { board_id: string, list_id: string, card_id: string }>({
            query: data => ({
                url: `/board/${data.board_id}/${data.list_id}/cards/${data.card_id}/archive-or-unarchive`,
                method: 'POST'
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        archiveOrUnarchiveList: builder.mutation<ServerResponse<List>, { board_id: string, column_id: string }>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.column_id}/archive-or-unarchive`,
                method: 'POST'
            }),
            invalidatesTags: ['columns', 'activities']
        }),
        archiveAllCardsInList: builder.mutation<ServerResponse<Card[]>, { board_id: string, column_id: string, action: boolean }>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.column_id}/archive-or-unarchive-all-card`,
                body: { action: data.action },
                method: 'POST'
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        commentCard: builder.mutation<ServerResponse<CardComment>, { board_id: string, column_id: string, card_id: string, content: string }>(
            {
                query: data => ({
                    url: `/board/${data.board_id}/${data.column_id}/cards/${data.card_id}/comment`,
                    body: { content: data.content },
                    method: 'POST'
                }),
                invalidatesTags: ['comments', 'activities']
            }
        ),
        getCardComments: builder.query<ServerResponse<CardComment[]>, { board_id: string, column_id: string, card_id: string }>({
            query: data => `/board/${data.board_id}/${data.column_id}/cards/${data.card_id}/comments`,
            providesTags: ['comments']
        }),
        postChangeTheme: builder.mutation<ServerResponse<Board>, { board_id: string, theme_id: number }>({
            query: (data) => ({
                url: `/board-theme/${data.board_id}/change`,
                body: { theme_id: data.theme_id },
                method: 'POST'
            }),
            invalidatesTags: ['board', 'activities']
        }),
        getArchivedItems: builder.query<ServerResponse<Card[] | List[]>, { board_id: string, type: string }>({
            query: data => getArchivedItemsUrl(data),
            providesTags: ['cards', 'columns']
        }),
        getArchivedCards: builder.query<ServerResponse<Card[]>, string>({
            query: board_id => `board/${board_id}/archived-cards`,
            providesTags: ['cards']
        }),
        getArchivedLists: builder.query<ServerResponse<List[]>, string>({
            query: board_id => `board/${board_id}/archived-lists`,
            providesTags: ['columns']
        }),
        getActivities: builder.query<ServerResponse<BoardActivity[]>, string>({
            query: board_id => `board/${board_id}/activities`,
            providesTags: ['activities']
        })
    })
})

export const {
    useGetBoardsQuery,
    useCreateBoardMutation,
    useGetBoardQuery,
    useGetCardsQuery,
    useGetListsQuery,
    useAddListMutation,
    useAddCardMutation,
    useDeleteListMutation,
    useDeleteCardMutation,
    useUpdateCardMutation,
    useUpdateListMutation,
    useArchiveOrUnarchiveCardMutation,
    useArchiveAllCardsInListMutation,
    useArchiveOrUnarchiveListMutation,
    useCommentCardMutation,
    useGetCardCommentsQuery,
    usePostChangeThemeMutation,
    useUpdateBoardMutation,
    useGetArchivedItemsQuery,
    useGetArchivedListsQuery,
    useGetArchivedCardsQuery,
    useGetActivitiesQuery,
    useGetWorkspaceBoardsQuery,
    useGetWorkspaceBoardsByShortNameQuery
} = boardApi