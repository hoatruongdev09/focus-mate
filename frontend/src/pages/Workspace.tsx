import Modal from "../components/modal"
import CreateNewBoard from "../components/workspace/create-new-board"

const Workspace = () => {
    return (
        <>
            <div className="fixed left-0 right-0 top-12 bottom-0">
                <div className="w-full md:w-[1000px] mt-20 mx-auto flex flex-col gap-3">
                    <div className="flex">
                        <p className="text-3xl font-extrabold leading-none">Boards:</p>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center ">
                        <div className="h-24 w-48 bg-rose-300 bg-opacity-65 rounded cursor-pointer hover:bg-opacity-100">
                            <p className="p-2 font-bold ">Board name</p>
                        </div>
                        <div className="relative h-24 w-48 bg-white bg-opacity-65 rounded cursor-pointer hover:bg-opacity-100 flex flex-col items-center justify-center">
                            <p className="">Create new board</p>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isShow={true} onBgClick={() => { }}>
                <CreateNewBoard />
            </Modal>
        </>
    )
}
export default Workspace