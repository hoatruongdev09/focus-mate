import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal";
import CreateColumnView from "./create-column-view";
import { RootState } from "../../store/store";
import { setShowAddingColumn } from "../../store/slices/column-slice";

function CreateColumnViewModal() {
    const dispatch = useDispatch()
    const isShowAddColumn = useSelector((state: RootState) => state.columns.showAddingColumn)

    const hideAddingColumn = () => {
        dispatch(setShowAddingColumn(false))
    }

    return (
        <Modal isOpen={isShowAddColumn} onCancel={() => hideAddingColumn()}>
            <div className="z-40 flex flex-col justify-stretch flex-1 p-10 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-3/5">
                <CreateColumnView />
            </div>
        </Modal>
    );
}

export default CreateColumnViewModal;