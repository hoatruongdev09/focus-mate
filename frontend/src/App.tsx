import { useEffect } from "react";
import KanbanBoard from "./components/board/kanban-board";
import KanbanBoardTitle from "./components/board/kanban-board-title";
import NavBar from "./components/nav-bar";
import SideBar from "./components/side-bar";
import { useGetColumnsQuery, useGetTasksQuery } from "./store/services/board-service";
import { useDispatch } from "react-redux";
import { setColumns, setTasks } from "./store/slices/board-slice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";

function App() {
  const dispatch = useDispatch()

  const { data: columns, isLoading: isLoadingColumns } = useGetColumnsQuery()
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasksQuery()

  useEffect(() => {
    if (columns?.length) {
      dispatch(setColumns([...columns].reverse()))
    }
    if (tasks?.length) {
      dispatch(setTasks(tasks.map(t => ({
        task: t,
        nextTimeUpdate: Date.now()
      }))))
    }
  }, [columns, tasks])

  if (isLoadingColumns && isLoadingTasks) {
    return (<>Loading</>)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

        </Route>
      </Routes>
    </BrowserRouter>
    // <>
    //   <NavBar />
    //   <div className="fixed left-0 right-0 top-0 bottom-0 p-2 pt-20 flex items-stretch gap-2">
    //     <SideBar />
    //     <div className="flex flex-col flex-1">
    //       <KanbanBoardTitle />
    //       <div className="flex-1 relative">
    //         <div className="absolute left-0 right-0 top-0 bottom-0">
    //           <KanbanBoard />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

export default App;