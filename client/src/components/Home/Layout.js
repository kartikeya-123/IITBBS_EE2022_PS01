import React from "react";
import {
  Grid,
  Box,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import SportsImage from "./../../assets/sport.jpg";

import { useNavigate } from "react-router-dom";
import getImage from "../../assets/images";

const Layout = () => {
  return (
    <div>
      <Grid sx={{ width: "100%", paddingBottom: "30px" }}>
        <Box sx={{ width: "100%", height: "600px" }}>
          <img
            alt="Sports"
            src={SportsImage}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Paper
          sx={{
            position: "absolute",
            top: "400px",
            width: "90%",
            margin: "30px",
            padding: "30px",
            display: "flex",
            justifyContent: "space-evenly",
            borderRadius: "14px",
            background: "transparent",
          }}
        >
          <CardDetails name="Cricket" />
          <CardDetails name="Badminton" />
          <CardDetails name="Football" />
        </Paper>
      </Grid>
    </div>
  );
};

const CardDetails = ({ name }) => {
  const navigate = useNavigate();
  const image = getImage(name);
  return (
    <Card
      sx={{ width: "400px", minHeight: "400px", cursor: "pointer" }}
      onClick={() => {
        navigate(`/sport/${name}`);
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 600, textAlign: "center" }}
        >
          {name}
        </Typography>
        {/* <Typography sx={{ fontSize: "18px", fontWeight: 400 }}>
          Total events : 4
        </Typography> */}
      </CardContent>
    </Card>
  );
};
export default Layout;
