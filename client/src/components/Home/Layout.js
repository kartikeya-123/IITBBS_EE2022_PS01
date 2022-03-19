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
import CricketImage from "./../../assets/cricket.jfif";
import FootballImage from "./../../assets/football.jfif";
import BadmintonImage from "./../../assets/badminton.jfif";

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
          }}
        >
          <CardDetails name="Cricket" image={CricketImage} />
          <CardDetails name="Badminton" image={BadmintonImage} />
          <CardDetails name="Football" image={FootballImage} />
        </Paper>
      </Grid>
    </div>
  );
};

const CardDetails = ({ name, image }) => {
  return (
    <Card sx={{ width: "400px", minHeight: "400px", cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "18px", fontWeight: 400 }}>
          Total events : 4
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Layout;
