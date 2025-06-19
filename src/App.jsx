import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout/RootLayout";
import About from "./pages/About/About";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import RoleSelection from "./pages/Auth/RoleSelection/RoleSelection";
import CandidateCreateProfile from "./pages/CandidateCreateProfile/CandidateCreateProfile";
import CandidateList from "./pages/CandidateList/CandidateList";
import CandidateProfile from "./pages/CandidateProfile/CandidateProfile";
import Home from "./pages/Home/Home";
import JobApplication from "./pages/JobApplication/JobApplication";
import JobDescription from "./pages/JobDescription/JobDescription";
import JobDetail from "./pages/JobDetail/JobDetail";
import JobList from "./pages/JobList/JobList";
import PotentialCandidate from "./pages/PotentialCandidate/PotentialCandidate";
import RecruiterCreatePost from "./pages/RecruiterCreatePost/RecruiterCreatePost";
import ServicePackages from "./pages/ServicePackages/ServicePackages";
import PaymentPackage from "./pages/PaymentPackage/PaymentPackage";
import CandidateInfo from "./pages/CandidateInfo/CandidateInfo";
import ConfirmEmail from "./pages/Auth/ConfirmEmail/ConfirmEmail";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import CVViewer from "./pages/CVViewer/CVViewer";
import PaymentReturn from "./pages/PaymentPackage/PaymentReturn/PaymentReturn";
import PaymentHistory from "./pages/PaymentHistory/PaymentHistory";
import RecruiterRegister from "./pages/Auth/Register/RecruiterRegister";
import Company from "./pages/Company/Company";
import ApplicationHistory from "./pages/ApplicationHistory/ApplicationHistory";
import RecruiterListPost from "./pages/RecruiterListPost/RecruiterListPost";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import PaymentList from "./pages/Admin/PaymentList/PaymentList";
import RecruiterJobApplican from "./pages/RecruiterJobApplican/RecruiterJobApplican";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-recruiter" element={<RecruiterRegister />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/cv/:id" element={<CVViewer />} />

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/job-list" element={<JobList />} />
          <Route path="/job-detail/:id" element={<JobDetail />} />
          <Route path="/job-description/:id" element={<JobDescription />} />
          <Route path="/job-application/:id" element={<JobApplication />} />
          <Route path="/profile" element={<CandidateProfile />} />
          <Route path="/candidate-info/:id" element={<CandidateInfo />} />
          <Route path="/payment-return/:type" element={<PaymentReturn />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/company" element={<Company />} />
          <Route path="/application-history" element={<ApplicationHistory />} />
          <Route path="/job-applican/:id" element={<RecruiterJobApplican />} />

          <Route
            path="/candidate-create-profile"
            element={<CandidateCreateProfile />}
          />
          <Route path="/candidate-list" element={<CandidateList />} />
          <Route path="/potential-candidate" element={<PotentialCandidate />} />
          <Route
            path="/recruiter-create-post"
            element={<RecruiterCreatePost />}
          />
          <Route path="/recruiter-list-post" element={<RecruiterListPost />} />
          <Route path="/service-packages" element={<ServicePackages />} />
          <Route path="/payment-package/:type" element={<PaymentPackage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin/payment" element={<PaymentList />} />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
