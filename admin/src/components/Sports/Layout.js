import React from "react";
import { useParams } from "react-router-dom";
import CricketLayout from "./CricketLayout";
import BadmintonLayout from "./BadmintonLayout";
import FootballLayout from './footballlayout'
const Layout = () => {
  const { sportName } = useParams();

  return (
    <div>
      {sportName === "Cricket" && <CricketLayout />}
      {sportName === "Badminton" && <BadmintonLayout />}
      {sportName === "Football" &&  <FootballLayout />}

      {/* {sportName === "Cricket" && <CricketLayout />} */}
    </div>
  );
};
export default Layout;
