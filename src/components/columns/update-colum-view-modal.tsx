import { useDispatch, useSelector } from "react-redux";
import { ColumnData, updateColumn } from "../../store/slices/column-slice";
import Modal from "../modal";
import { RootState } from "../../store/store";
import { clearEditingColumn, setEditingColumn } from '../../store/slices/column-slice'
import UpdateColumnView from "./update-column-view";
import { ChangeEvent } from "react";
export interface ColumnUpdateViewProps {
    column?: ColumnData | null,
    setCurrentColumnItem: (item: ColumnData | null) => void
}

function UpdateColumnViewModal() {
    const dispatch = useDispatch()
    const editingColumn = useSelector((state: RootState) => state.columns.editingColumn)

    const onCancel = () => {
        if (editingColumn != null) {
            dispatch(updateColumn(editingColumn))
        }
        dispatch(clearEditingColumn())
    }
    const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (editingColumn === null) { return }
        dispatch(setEditingColumn({
            ...editingColumn,
            [e.target.name]: e.target.value
        }))
    }
    const onFormTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (editingColumn === null) { return }
        dispatch(setEditingColumn({
            ...editingColumn,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <Modal isOpen={editingColumn !== null} onCancel={onCancel}>
            <div
                id="taskView"
                className="z-40 flex flex-col justify-stretch flex-1 p-5 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-3/5"
            >

                {
                    editingColumn && <UpdateColumnView
                        column={editingColumn}
                        onFormDataChange={onFormDataChange}
                        onFormTextAreaChange={onFormTextAreaChange}
                    />
                }
            </div>
        </Modal>
    );
}

export default UpdateColumnViewModal;