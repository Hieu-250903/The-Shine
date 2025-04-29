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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role-selection" element={<RoleSelection />} />

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/job-list" element={<JobList />} />
          <Route path="/job-detail/:id" element={<JobDetail />} />
          <Route path="/job-description/:id" element={<JobDescription />} />
          <Route path="/job-application/:id" element={<JobApplication />} />
          <Route path="/profile" element={<CandidateProfile />} />
          <Route path="/candidate-info/:id" element={<CandidateInfo />} />
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
          <Route path="/service-packages" element={<ServicePackages />} />
          <Route path="/payment-backage/:type" element={<PaymentPackage />} />
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
