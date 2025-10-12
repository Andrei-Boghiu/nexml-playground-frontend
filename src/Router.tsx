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
import ArchiveList from "./pages/archives/ArchiveList";
import Archive from "./pages/archives/Archive";
import Support from "./pages/help-pages/Support";
import ReportIssue from "./pages/help-pages/ReportIssue";
import Feedback from "./pages/help-pages/Feedback";
import Account from "./pages/user-pages/Account";
import Billing from "./pages/user-pages/Billing";
import Notifications from "./pages/user-pages/Notifications";

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

          <Route path="/support" element={<Support />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/report-issue" element={<ReportIssue />} />

          <Route path="/account" element={<Account />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/notifications" element={<Notifications />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
