import { useEffect } from "react";
import { useGetColumnsQuery, useGetTasksQuery } from "./store/services/board-service";
import { useDispatch } from "react-redux";
import { setColumns, setTasks } from "./store/slices/board-slice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import KanbanBoardPage from "./pages/Kanbanboard";
import LoadingScreen from "./components/loading-screen";
import PrivateOutlet from "./pages/PrivateOutlet";

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
    <>
      <LoadingScreen />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<PrivateOutlet />}>
              <Route path="board" element={<KanbanBoardPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;