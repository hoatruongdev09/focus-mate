import { createApi } from "@reduxjs/toolkit/query/react";
import { AddListData, AddCardData, Board, CreateBoardData, List, Card, CardComment, UpdateBoardData, UpdateListData, UpdateCardData } from "../../types/board-type";
import { baseQueryWithReauth } from "./base-query-with-reauth";
import { BoardActivity } from "../../types/board-activity";

const getArchivedItemsUrl = ({ board_id, type }: { board_id: number, type: string }): string => {
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
        getBoards: builder.query<Board[], void>({
            query: () => `/board`,
            providesTags: ['board']
        }),
        getBoard: builder.query<Board, number>({
            query: (data) => `/board/${data}`
        }),
        createBoard: builder.mutation<Board, CreateBoardData>({
            query: data => ({
                url: '/board',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['board', 'activities']
        }),
        updateBoard: builder.mutation<Board, { board_id: number, data: UpdateBoardData }>({
            query: data => ({
                url: `/board/${data.board_id}`,
                body: data.data,
                method: 'POST'
            }),
            invalidatesTags: ['board', 'activities']
        }),
        getLists: builder.query<List[], number>({
            query: (data) => `/board/${data}/lists`,
            providesTags: ['columns']
        }),
        getCards: builder.query<Card[], number>({
            query: (data) => `/board/${data}/cards`,
            providesTags: ['cards']
        }),
        addList: builder.mutation<List, AddListData>({
            query: data => ({
                url: `/board/${data.board_id}/lists`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['columns', 'activities']
        }),
        deleteList: builder.mutation<void, { board_id: number, column_id: number }>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.column_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['columns', 'activities']
        }),
        addCard: builder.mutation<List, AddCardData>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.list_id}/card`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        deleteCard: builder.mutation<void, { board_id: number, card_id: number }>({
            query: data => ({
                url: `/board/${data.board_id}/cards/${data.card_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        updateCard: builder.mutation<Card, UpdateCardData>({
            query: data => ({
                url: `/board/${data.board_id}/cards/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        updateList: builder.mutation<List, UpdateListData>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['columns', 'activities']
        }),
        archiveOrUnarchiveCard: builder.mutation<Card, { board_id: number, list_id: number, card_id: number }>({
            query: data => ({
                url: `/board/${data.board_id}/${data.list_id}/cards/${data.card_id}/archive-or-unarchive`,
                method: 'POST'
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        archiveOrUnarchiveList: builder.mutation<List, { board_id: number, column_id: number }>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.column_id}/archive-or-unarchive`,
                method: 'POST'
            }),
            invalidatesTags: ['columns', 'activities']
        }),
        archiveAllCardsInList: builder.mutation<Card[], { board_id: number, column_id: number, action: boolean }>({
            query: data => ({
                url: `/board/${data.board_id}/lists/${data.column_id}/archive-or-unarchive-all-card`,
                body: { action: data.action },
                method: 'POST'
            }),
            invalidatesTags: ['cards', 'activities']
        }),
        commentCard: builder.mutation<CardComment, { board_id: number, column_id: number, card_id: number, content: string }>(
            {
                query: data => ({
                    url: `/board/${data.board_id}/${data.column_id}/cards/${data.card_id}/comment`,
                    body: { content: data.content },
                    method: 'POST'
                }),
                invalidatesTags: ['comments', 'activities']
            }
        ),
        getCardComments: builder.query<CardComment[], { board_id: number, column_id: number, card_id: number }>({
            query: data => `/board/${data.board_id}/${data.column_id}/cards/${data.card_id}/comments`,
            providesTags: ['comments']
        }),
        postChangeTheme: builder.mutation<Board, { board_id: number, theme_id: number }>({
            query: (data) => ({
                url: `/board-theme/${data.board_id}/change`,
                body: { theme_id: data.theme_id },
                method: 'POST'
            }),
            invalidatesTags: ['board', 'activities']
        }),
        getArchivedItems: builder.query<Card[] | List[], { board_id: number, type: string }>({
            query: data => getArchivedItemsUrl(data),
            providesTags: ['cards', 'columns']
        }),
        getArchivedCards: builder.query<Card[], number>({
            query: board_id => `board/${board_id}/archived-cards`,
            providesTags: ['cards']
        }),
        getArchivedLists: builder.query<List[], number>({
            query: board_id => `board/${board_id}/archived-lists`,
            providesTags: ['columns']
        }),
        getActivities: builder.query<BoardActivity[], number>({
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
    useGetActivitiesQuery
} = boardApi