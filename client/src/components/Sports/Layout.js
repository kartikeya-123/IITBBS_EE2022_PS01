import React from "react";
import { useParams } from "react-router-dom";
import CricketLayout from "./CricketLayout";
import BadmintonLayout from "./BadmintonLayout";
<<<<<<< HEAD
import FootballLayout from './footballlayout'
=======
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
const Layout = () => {
  const { sportName } = useParams();

  return (
    <div>
      {sportName === "Cricket" && <CricketLayout />}
      {sportName === "Badminton" && <BadmintonLayout />}
<<<<<<< HEAD
      {sportName === "Football" &&  <FootballLayout />}

=======
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
      {/* {sportName === "Cricket" && <CricketLayout />} */}
    </div>
  );
};
export default Layout;
