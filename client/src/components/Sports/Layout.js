import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import getImage from "../../assets/images";

const SportsLayout = () => {
  const { sportName } = useParams();

  return (
    <Grid sx={{ padding: "30px" }}>
      <Paper sx={{ padding: "30px", boxShadow: "none" }}>
        <Box sx={{ marginBottom: "40px" }}>
          <Typography
            sx={{
              //   color: "#009270",
              fontSize: "24px",
              lineHeight: "24px",
              fontWeight: 700,
            }}
          >
            FEATURED MATCHES - {sportName}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <SportEvent />
          <SportEvent />
          <SportEvent />
        </Grid>
      </Paper>
    </Grid>
  );
};

const SportEvent = () => {
  return (
    <Grid item>
      <Card sx={{ width: "350px", height: "150px" }}>
        <CardContent>
          <Box>
            <Typography>Event 1</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default SportsLayout;
