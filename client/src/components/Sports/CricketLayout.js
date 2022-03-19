import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
      // console.log(eventDocs);
      setEvents(eventDocs);
    });

    //setDocs
  };

  const submitToFirebase = async (data) => {
    const cricketRef = collection(db, "Cricket");
    await setDoc(doc(cricketRef), data);
  };

  // const submitData = async (values) => {
  //   let data = values;
  //   let data1;
  //   data1 = values.playersA.map((player) => {
  //     let newFields = {
  //       name: player,
  //       batting: {
  //         score: 0,
  //         overs: 0,
  //       },
  //       bowling: {
  //         wickets: 0,
  //         overs: 0,
  //       },
  //     };

  //     return newFields;
  //   });

  //   let data2;
  //   data2 = values.playersB.map((player) => {
  //     let newFields = {
  //       name: player,
  //       batting: {
  //         score: 0,
  //         overs: 0,
  //       },
  //       bowling: {
  //         wickets: 0,
  //         overs: 0,
  //       },
  //     };
  //     return newFields;
  //   });

  //   data.playersA = data1;
  //   data.playersB = data2;
  //   data.innings = 1;
  //   data.teamAScore = 0;
  //   data.teamBScore = 0;
  //   data.batsman1 = 0;
  //   data.batsman2 = 1;
  //   data.strike = 1;
  //   data.firstInningsScore = 0;
  //   data.secondInningsScore = 0;
  //   data.firstInningsWickets = 0;
  //   data.secondInningsWickets = 0;
  //   data.firstInningsOvers = 0;
  //   data.secondInningsOvers = 0;

  //   // Data
  //   console.log(data);

  //   // Firebase post
  //   handleClose();
  //   await submitToFirebase(data);
  // };

  useEffect(() => {
    // console.log(db);
    initData();
  }, []);

  return (
    <Grid sx={{ padding: "20px" }}>
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
              color: "#0e7547",
              fontSize: "24px",
              lineHeight: "24px",
              fontWeight: 700,
            }}
          >
            FEATURED MATCHES - {sportName}
          </Typography>
          {/* <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <AddIcon />
          </Fab> */}
        </Box>
        <Grid container spacing={2}>
          {events &&
            events.map((event) => <SportEvent event={event} key={event.id} />)}
        </Grid>
      </Paper>
      {/* {showForm && (
        <CricketEventForm
          show={showForm}
          close={handleClose}
          submit={submitData}
        />
      )} */}
    </Grid>
  );
};

const SportEvent = (event) => {
  const date = event?.event?.data?.time.toDate().toDateString();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sport/Cricket/${event?.event?.id}`);
  };
  return (
    <Grid item>
      <Card
        sx={{
          width: "350px",
          height: "150px",
          borderRadius: "0px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <CardContent>
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "#004d2a",
              }}
            >
              {event?.event?.data?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#142d52",
              }}
            >
              {event?.event?.data.teamA.toUpperCase() +
                " vs " +
                event?.event?.data.teamB.toUpperCase()}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontStyle: "italic",
                color: "#9a9fa6",
              }}
            >
              {date}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default SportsLayout;
