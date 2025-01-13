import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { memo } from "react"

interface Props {
    handleGoBack: () => void
    handleShowContext: () => void
    handleArchiveCards: () => void
}

const ConfirmArchiveCardsMenu = memo((props: Props) => {
    const { handleGoBack, handleShowContext, handleArchiveCards } = props
    return (
        <>
            <div className="flex justify-between items-center px-2 h-10 relative">
                <button
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={handleGoBack}
                >
                    <ChevronLeftIcon className="size-4" />
                </button>
                <p className="flex-1 text-center font-semibold text-sm text-gray-800">Archive all cards in this list? </p>
                <button
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={handleShowContext}
                >
                    <XMarkIcon className="size-4" />
                </button>
            </div>

            <div className="flex flex-col px-3 gap-3">
                <p className=" text-sm py-2">
                    Are you sure you want to archive the selected cards?
                </p>
                <button
                    className="bg-red-500 py-2 rounded font-semibold text-sm text-white hover:bg-red-400"
                    onClick={handleArchiveCards}
                >
                    Archive cards
                </button>

            </div>
        </>
    )
})

export default ConfirmArchiveCardsMenu