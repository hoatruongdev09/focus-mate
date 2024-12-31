import { ChangeEvent, useState } from "react";
import { CreateColumnData, useAddColumnMutation } from "../../services/columns";
import { useDispatch } from "react-redux";
import { setShowAddingColumn } from "../../store/slices/column-slice";



function CreateColumnView() {
    const dispatch = useDispatch()
    const [addColumn] = useAddColumnMutation()

    const [formState, setFormState] = useState<CreateColumnData>({
        name: "",
        description: ""
    })

    const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const onFormTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async () => {
        await addColumn(formState)
        dispatch(setShowAddingColumn(false))
        setFormState({ name: "", description: "" })

    }


    return (
        <div className="flex flex-1 p-5">
            <div className="flex flex-col gap-2 flex-1 ">
                <input
                    name="name"
                    type="text"
                    placeholder="New group"
                    value={formState.name}
                    className="text-5xl bg-transparent outline-none font-bold text-gray-800"
                    onChange={(e) => onFormDataChange(e)}
                />

                <textarea
                    name="description"
                    placeholder="Add more detail"
                    value={formState?.description}
                    onChange={e => onFormTextAreaChange(e)}
                    className="outline-none bg-transparent text-gray-800 flex-1"
                />

                <div className="flex flex-row-reverse gap-2">
                    <button className="bg-green-500 w-24 px-3 py-1" onClick={(() => onSubmit())}>Add</button>
                </div>
            </div>

        </div>
    );
}

export default CreateColumnView;