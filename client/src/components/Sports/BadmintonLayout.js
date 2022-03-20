import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
=======
import { useParams, useNavigate } from "react-router-dom";
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
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
import db from "../../config/db";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
<<<<<<< HEAD
import AddIcon from "@mui/icons-material/Add";
import CricketEventForm from "../Modals/CricketModal";
=======
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e

const SportsLayout = () => {
  const { sportName } = useParams();
  const [events, setEvents] = useState([]);
<<<<<<< HEAD
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => {
    setShowForm(false);
  };
=======
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e

  const initData = async () => {
    const badmintonRef = collection(db, "Badminton");
    // console.log(badmintonRef);
    onSnapshot(badmintonRef, (data) => {
      const eventDocs = data.docs.map((element) => {
        const event = {
          id: element.id,
          data: element.data(),
        };
        return event;
      });
      console.log(eventDocs);
      setEvents(eventDocs);
    });

    //setDocs
  };

<<<<<<< HEAD
  const submitToFirebase = async (data) => {
    const badmintonRef = collection(db, "Badminton");
    await setDoc(doc(badmintonRef), data);
  };

  const submitData = async (values) => {
    let data = values;
    let data1;
    data1 = values.playersA.map((player) => {
      let newFields = {
        name: player,
        batting: {
          score: 0,
          overs: 0,
        },
        bowling: {
          wickets: 0,
          overs: 0,
        },
      };

      return newFields;
    });

    let data2;
    data2 = values.playersB.map((player) => {
      let newFields = {
        name: player,
        batting: {
          score: 0,
          overs: 0,
        },
        bowling: {
          wickets: 0,
          overs: 0,
        },
      };
      return newFields;
    });

    data.playersA = data1;
    data.playersB = data2;
    // Data
    console.log(data);

    // Firebase post
    handleClose();
    await submitToFirebase(data);
  };

=======
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
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
<<<<<<< HEAD
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <AddIcon />
          </Fab>
=======
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
        </Box>
        <Grid container spacing={2}>
          {events &&
            events.map((event) => <SportEvent event={event} key={event.id} />)}
        </Grid>
      </Paper>
<<<<<<< HEAD
      {showForm && (
        <CricketEventForm
          show={showForm}
          close={handleClose}
          submit={submitData}
        />
      )}
=======
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
    </Grid>
  );
};

const SportEvent = (event) => {
  const date = event?.event?.data?.time.toDate().toDateString();
<<<<<<< HEAD
=======
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sport/Badminton/${event?.event?.id}`);
  };
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e

  return (
    <Grid item>
      <Card
        sx={{
<<<<<<< HEAD
          width: "350px",
          height: "150px",
          borderRadius: "0px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
=======
          width: "400px",
          height: "150px",
          borderRadius: "0px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          cursor: "pointer",
        }}
        onClick={handleClick}
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
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
                fontSize: "20px",
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
