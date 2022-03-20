import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CricketLayout from "./Cricket";
import BadmintonLayout from "./Badminton";
import FootballLayout from "./Football";
const Layout = () => {
  const { sportName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) navigate("/login");
  }, []);
  return (
    <div>
      {sportName === "Cricket" && <CricketLayout />}
      {sportName === "Badminton" && <BadmintonLayout />}
      {sportName === "Football" && <FootballLayout />}
      {/* {sportName === "Cricket" && <CricketLayout />} */}
    </div>
  );
};
export default Layout;
