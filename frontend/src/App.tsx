import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import KanbanBoardPage from "./pages/kanban-board-page";
import PrivateOutlet from "./layouts/private-layout";
import LandingPage from "./pages/landing-page";
import HomeBoardsPage from "./pages/home-boards-page";
import HomeLayout from "./layouts/home-layout";
import HomeWorkspaceBoardsPage from "./pages/home-workspace-boards-page";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<LandingPage />} />

          <Route path="home" element={<HomeLayout />} >
            <Route index element={<Navigate to="boards" replace />} />
            <Route path="boards" element={<HomeBoardsPage />} />
            <Route path="w/:workspace_id" element={<HomeWorkspaceBoardsPage />} />
          </Route>

          <Route path="workspace" element={<PrivateOutlet />}>
            <Route path="board/:board_id" element={<KanbanBoardPage />} />
          </Route>



        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;