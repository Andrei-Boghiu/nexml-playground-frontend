import { Route, Routes } from "react-router-dom";

import Overlay from "./Overlay";
import NotFound from "./pages/NotFound";

import MainDashboard from "./pages/MainDashboard";
import AuthLogin from "./pages/AuthLogin";
import AuthRegister from "./pages/AuthRegister";
import ProtectedRoutes from "./guards/ProtectedRoutes";
import AuthRoutes from "./guards/AuthRoutes";
import PolicyList from "./pages/PolicyList";
import Policy from "./pages/Policy";
import InstructionList from "./pages/InstructionList";
import Instruction from "./pages/Instruction";
import JobListingList from "./pages/JobListingList";
import JobListing from "./pages/JobListing";
import ArchiveList from "./pages/ArchiveList";
import Archive from "./pages/Archive";

function Router() {
  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<Overlay />}>
          <Route path="/" element={<MainDashboard />} />

          <Route path="/policies">
            <Route index element={<PolicyList />} />
            <Route path=":id" element={<Policy />} />
          </Route>

          <Route path="/instructions">
            <Route index element={<InstructionList />} />
            <Route path=":id" element={<Instruction />} />
          </Route>

          <Route path="/job-listings">
            <Route index element={<JobListingList />} />
            <Route path=":id" element={<JobListing />} />
          </Route>

          <Route path="/archives">
            <Route index element={<ArchiveList />} />
            <Route path=":id" element={<Archive />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;