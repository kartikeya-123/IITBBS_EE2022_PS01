import React from "react";
import { useParams } from "react-router-dom";
import CricketPageLayout from "./Cricket";
import FootballPageLayout from "./Football";

const Layout = () => {
  const { sportName ,matchId} = useParams();
  

  return (
    <div>
      {sportName === "Cricket" && <CricketPageLayout/>}
      {sportName === "Badminton" && <CricketPageLayout/>}
      {sportName === "Football" &&  <FootballPageLayout/>}

      {/* {sportName === "Cricket" && <CricketLayout />} */}
    </div>
  );
};
export default Layout;
