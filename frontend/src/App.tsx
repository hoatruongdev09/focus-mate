import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import KanbanBoardPage from "./pages/Kanbanboard";
import PrivateOutlet from "./pages/PrivateOutlet";
import LandingPage from "./pages/LandingPage";
import Workspace from "./pages/Workspace";
import LoadingScreen from "./components/loading-screen";

function App() {

  return (
    <>
      <LoadingScreen />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="u/:user_id" element={<PrivateOutlet />}>

              <Route index element={<Workspace />} />
              <Route path="board/:board_id" element={<KanbanBoardPage />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;