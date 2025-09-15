import { Route, Routes } from "react-router-dom";

import MainDashboard from "./pages/MainDashboard";
import AuthLogin from "./pages/AuthLogin";
import AuthRegister from "./pages/AuthRegister";
import ProtectedRoutes from "./guards/ProtectedRoutes";
import AuthRoutes from "./guards/AuthRoutes";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<MainDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
