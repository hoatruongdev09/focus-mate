import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import WorkspaceBoardView from "./pages/workspace-kanban-board-page";
import PrivateOutlet from "./layouts/private-layout";
import LandingPage from "./pages/landing-page";
import HomeBoardsPage from "./pages/home-boards-page";
import HomeLayout from "./layouts/home-layout";
import HomeWorkspaceBoardsPage from "./pages/home-workspace-boards-page";
import WorkspaceLayout from "./layouts/workspace-layout";
import WorkspaceBoardsPage from "./pages/workspace-boards-page";
import AppLayout from "./layouts/app-layout";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />

          <Route path="home" element={<HomeLayout />} >
            <Route index element={<Navigate to="boards" replace />} />
            <Route path="boards" element={<HomeBoardsPage />} />
            <Route path="w/:workspace_short_name" element={<HomeWorkspaceBoardsPage />} />
          </Route>

          <Route path="w/:workspace_short_name" element={<WorkspaceLayout />}>
            <Route path="boards" element={<WorkspaceBoardsPage />} />
            <Route path=":board_id" element={<WorkspaceBoardView />} />
          </Route>



        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;