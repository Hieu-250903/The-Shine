import React from "react";
import MainHomePage from "./MainHomePage/MainHomePage";
import UserHomePage from "./UserHomePage/UserHomePage";
import RecruiterHomePage from "./RecruiterHomePage/RecruiterHomePage";

const Home = () => {
  const isAuthen = localStorage.getItem("isAuthen");
  const role = localStorage.getItem("role");
  if (isAuthen === "true" && role) {
    if (role === "recruiter") {
      return <RecruiterHomePage />;
    } else if (role === "candidate") {
      return <UserHomePage />;
    }
  }
  return <MainHomePage />;
};

export default Home;
