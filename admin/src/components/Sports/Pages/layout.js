import React from "react";
import { useParams } from "react-router-dom";
import CricketLayout from "./Cricket";
import BadmintonLayout from "./Badminton";
const Layout = () => {
  const { sportName } = useParams();

  return (
    <div>
      {sportName === "Cricket" && <CricketLayout />}
      {sportName === "Badminton" && <BadmintonLayout />}
      {/* {sportName === "Cricket" && <CricketLayout />} */}
    </div>
  );
};
export default Layout;
