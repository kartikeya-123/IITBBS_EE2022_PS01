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
  Fab,
} from "@mui/material";
import getImage from "../../assets/images";
import db from "./../../config/db";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import CricketEventForm from "../Modals/CricketModal";

const SportsLayout = () => {
  const { sportName } = useParams();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => {
    setShowForm(false);
  };

  const initData = async () => {
    const cricketRef = collection(db, "Cricket");
    // console.log(cricketRef);
    onSnapshot(cricketRef, (data) => {
      const eventDocs = data.docs.map((element) => {
        const event = {
          id: element.id,
          data: element.data(),
        };
        return event;
      });
      console.log(eventDocs);
    });

    //setDocs
  };

  useEffect(() => {
    // console.log(db);
    initData();
  }, []);
  return (
    <Grid sx={{ padding: "30px" }}>
      <Paper sx={{ padding: "30px", boxShadow: "none" }}>
        <Box
          sx={{
            marginBottom: "40px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
        <Grid container spacing={2}>
          <SportEvent />
          <SportEvent />
          <SportEvent />
        </Grid>
      </Paper>
      {showForm && <CricketEventForm show={showForm} close={handleClose} />}
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
