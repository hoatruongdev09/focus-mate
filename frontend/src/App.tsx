import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import KanbanBoardPage from "./pages/kanban-board";
import PrivateOutlet from "./pages/private-outlet";
import LandingPage from "./pages/landing-page";
import WorkspaceBoardPage from "./pages/workspace-boards";
import Workspace from "./pages/workspace";
import Layout from "./pages/layout";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />

          <Route path=":user_id" element={<PrivateOutlet />} >
            <Route index element={<Navigate to="w" replace />} />

            <Route path="w" element={<Workspace />} >
              <Route index element={<Navigate to="boards" replace />} />
              <Route path="boards" element={<WorkspaceBoardPage />} />
            </Route>


            <Route path="b/:board_id" element={<KanbanBoardPage />} />
          </Route>



        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;