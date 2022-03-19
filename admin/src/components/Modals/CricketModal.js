import React, { FC, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Card,
  CardContent,
  CardActions,
  InputLabel,
  Typography,
  Button,
  Select,
  MenuItem,
  Container,
  CircularProgress,
  Dialog,
  Stack,
  Chip,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const useStyles = makeStyles({
  content: {
    margin: "auto",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "750px",
    height: "100%",
    overflow: "auto",
  },
  cardContent: {
    padding: "24px 24px 48px 24px",
    color: "#000",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  center: {
    textAlign: "center",
    display: "flex",
    justifyContent: "space-evenly",
  },
  box: {
    width: "700px",
    paddingTop: "10px",
    gap: "10px",
  },
  logoInput: {
    height: "96px",
    border: "1px dashed #BDBDBD",
    margin: "auto",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: "#333333",
  fontWeight: "600",
  width: "690px",
}));

const InputField = styled(InputLabel)(({ theme }) => ({
  fontSize: "14px",
  color: "#333333",
  fontWeight: 600,
  paddingBottom: "5px",
}));

const CricketEventForm = ({ show, close, submit }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(show);
  const [values, setValues] = useState({
    name: "",
    time: new Date(Date.now()),
    teamA: "",
    playersA: [],
    teamB: "",
    playersB: [],
  });

  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "playersA" || event.target.name === "playersB") {
      setValues({
        ...values,
        [event?.target?.name]: [
          ...values[event.target.name],
          event?.target?.value,
        ],
      });
    } else
      setValues({ ...values, [event?.target?.name]: event?.target?.value });
  };

  const addPlayers = (name, value) => {
    setValues({
      ...values,
      [name]: [...values[name], value],
    });
  };

  const handleSubmit = async (event) => {
    console.log(values);
    await submit(values);
  };

  const checkDisabled = () => {
    console.log(values);
    return (
      values.name.length === 0 ||
      values.teamA.length === 0 ||
      values.teamB.length === 0 ||
      values.playersA.length === 0 ||
      values.playersB.length === 0
    );
  };

  return (
    <Dialog open={show} onClose={close}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.center}>
            <Heading>New Cricket event</Heading>
          </Box>

          <Box className={classes.box}>
            <InputField>Name</InputField>
            <TextField
              onChange={handleChange}
              variant="filled"
              name="name"
              style={{ width: "100%", backgroundColor: "#F8F8F8" }}
              placeholder="Event Name"
              value={values.name}
              InputProps={{ disableUnderline: true }}
              multiline
              rows={1}
            />
          </Box>
          <Box className={classes.box}>
            <InputField>Time</InputField>
            {/* <TextField
              onChange={handleChange}
              variant="filled"
              name="time"
              style={{ width: "100%", backgroundColor: "#F8F8F8" }}
              placeholder="Time of the event"
              value={values.time}
              InputProps={{ disableUnderline: true }}
              multiline
            /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={values.time}
                name="time"
                onChange={(event) => {
                  setValues({ ...values, ["time"]: event });
                }}
                renderInput={(params) => (
                  <TextField
                    variant="filled"
                    style={{ width: "50%", backgroundColor: "#F8F8F8" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box className={classes.box}>
            <InputField>Team A</InputField>
            <TextField
              onChange={handleChange}
              variant="filled"
              name="teamA"
              style={{ width: "100%", backgroundColor: "#F8F8F8" }}
              placeholder="Team name"
              value={values.teamA}
              InputProps={{ disableUnderline: true }}
              multiline
            />
          </Box>
          <Box className={classes.box}>
            <InputField>Team A players</InputField>
            {values.playersA && values.playersA.length > 0 && (
              <Stack direction="row" spacing={1}>
                {values.playersA.map((name, ind) => {
                  return (
                    <Chip
                      label={name}
                      color="primary"
                      variant="contained"
                      key={ind}
                    />
                  );
                })}
              </Stack>
            )}
            <TextField
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  // Do code here
                  addPlayers("playersA", playerA);
                  setPlayerA("");
                  //   console.log(playerA);
                }
              }}
              variant="filled"
              name="playersA"
              style={{ width: "100%", backgroundColor: "#F8F8F8" }}
              placeholder="Enter player name"
              value={playerA}
              InputProps={{ disableUnderline: true }}
              onChange={(event) => {
                setPlayerA(event.target.value);
              }}
            />
          </Box>
          <Box className={classes.box}>
            <InputField>Team B</InputField>
            <TextField
              onChange={handleChange}
              variant="filled"
              name="teamB"
              style={{ width: "100%", backgroundColor: "#F8F8F8" }}
              placeholder="Team name"
              value={values.teamB}
              InputProps={{ disableUnderline: true }}
              multiline
            />
          </Box>
          <Box className={classes.box}>
            <InputField>Team B players</InputField>
            {values.playersB && values.playersB.length > 0 && (
              <Stack direction="row" spacing={1}>
                {values.playersB.map((name, ind) => {
                  return (
                    <Chip
                      label={name}
                      color="primary"
                      variant="contained"
                      key={ind}
                    />
                  );
                })}
              </Stack>
            )}
            <TextField
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  // Do code here
                  addPlayers("playersB", playerB);
                  setPlayerB("");
                  //   console.log(playerA);
                }
              }}
              variant="filled"
              name="playersA"
              style={{ width: "100%", backgroundColor: "#F8F8F8" }}
              placeholder="Enter player name"
              value={playerB}
              InputProps={{ disableUnderline: true }}
              onChange={(event) => {
                setPlayerB(event.target.value);
              }}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              margin: "auto",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              //   disabled={checkDisabled}
            >
              SUBMIT
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default CricketEventForm;
