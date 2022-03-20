import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import db from "./../../../config/db";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
  TextField,
  Avatar,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  InputBase,
  MenuItem,
} from "@mui/material";

const BadmintonPageLayout = () => {
  const { matchId } = useParams();
  const [event, setEvent] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(-1);

  const initData = async () => {
    // const cricketRef = collection(db, "Cricket");
    const eventRef = doc(db, "Badminton", matchId);
    onSnapshot(eventRef, (data) => {
      const eventData = data.data();
      console.log(eventData);
      setEvent(eventData);
      setCurrentPoint(-1);
    });
  };

  useEffect(() => {
    // console.log(db);
    initData();
  }, []);

  const submitDataToFireStore = async (data) => {
    console.log(data);
    const eventRef = doc(db, "Badminton", matchId);
    const eventDoc = await updateDoc(eventRef, data);
    console.log(eventDoc);
  };

  const submitData = async () => {
    let data = event;
    if (currentPoint === 1) {
      data.playersA[0].scores[data.currentSet - 1]++;
    } else if (currentPoint === 2) {
      data.playersB[0].scores[data.currentSet - 1]++;
    }

    let s1 = data.playersA[0].scores[data.currentSet - 1];
    let s2 = data.playersB[0].scores[data.currentSet - 1];

    let s3 = Math.max(s1, s2);
    let s4 = Math.min(s1, s2);

    if (s3 >= 5 && s3 - s4 >= 2) {
      if (data.currentSet < 3) {
        if (s1 > s2) {
          data.results[data.currentSet - 1] = 1;
        } else data.results[data.currentSet - 1] = 2;

        if (data.results[0] === data.results[1]) {
          data.status = "Finished";
        } else data.currentSet++;
      } else data.status = "Finished";
    }
    await submitDataToFireStore(data);
  };

  const getName = (heading, ind) => {
    let name = heading;
    if (ind === event?.currentSet) name += "*";
    return name;
  };

  const handleCurrentPoint = (n) => {
    if (currentPoint === n) {
      setCurrentPoint(-1);
    } else setCurrentPoint(n);
  };

  const getWinner = () => {
    let s1 = 0;
    let s2 = 0;
    for (let i in event.results) {
      if (event.results[i] === 1) s1++;
      else if (event.results[i] === 2) s2++;
    }

    if (s1 >= s2 + 1)
      return event.playersA[0].name + " from team " + event.teamA;
    else return event.playersB[0].name + " from team " + event.teamB;
  };
  return (
    <div>
      {event && (
        <Grid>
          <Container
            sx={{
              padding: "40px",
              margin: "auto",
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              gap: "20px",
            }}
          >
            <Card
              sx={{
                width: "100%",
                minHeight: "600px",
                // minWidth: "700px",
                borderRadius: "0px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                padding: "20px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                  fontSize: "20px",
                  marginBottom: "20px",
                }}
              >
                SCORECARD
              </Typography>
              <Table>
                <TableRow sx={{ backgroundColor: "#F6F9FC" }}>
                  <TableCell
                    sx={{
                      color: "#8898aa",
                      fontWeight: 600,
                      fontSize: "17px",
                    }}
                  >
                    Team
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#8898aa",
                      fontWeight: 600,
                      fontSize: "17px",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#8898aa",
                      fontWeight: 600,
                      fontSize: "17px",
                    }}
                  >
                    {getName("Set 1", 1)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#8898aa",
                      fontWeight: 600,
                      fontSize: "17px",
                    }}
                  >
                    {getName("Set 2", 2)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#8898aa",
                      fontWeight: 600,
                      fontSize: "17px",
                    }}
                  >
                    {getName("Set 3", 3)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.teamA}
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.playersA[0].name}
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.playersA[0].scores[0]}
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.playersA[0].scores[1]}
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.playersA[0].scores[2]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.teamB}
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.playersB[0].name}
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.playersB[0].scores[0]}
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.playersB[0].scores[1]}
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", color: "#2e3837" }}>
                    {event.playersB[0].scores[2]}
                  </TableCell>
                </TableRow>
              </Table>
            </Card>
            <Card
              sx={{
                height: "100%",
                width: "60%",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    fontSize: "20px",
                    marginBottom: "20px",
                  }}
                >
                  SCORE UPDATE
                </Typography>
                {event && (
                  <div>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#17a8b0",
                        }}
                      >
                        Ongoing Set : {event?.currentSet}
                      </Typography>
                    </Box>
                    <br></br>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          width: "100px",
                        }}
                      >
                        {" "}
                        {event?.playersA[0]?.name}
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                        {" "}
                        {event?.playersA[0]?.scores[event?.currentSet - 1]}
                      </Typography>
                      <FormControlLabel
                        label="Point"
                        control={
                          <Checkbox
                            checked={currentPoint === 1}
                            onChange={() => handleCurrentPoint(1)}
                          ></Checkbox>
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          width: "100px",
                        }}
                      >
                        {" "}
                        {event?.playersB[0]?.name}
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                        {" "}
                        {event?.playersB[0]?.scores[event?.currentSet - 1]}
                      </Typography>
                      <FormControlLabel
                        label="Point"
                        control={
                          <Checkbox
                            checked={currentPoint === 2}
                            onChange={() => handleCurrentPoint(2)}
                          ></Checkbox>
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        marginTop: "30px",
                      }}
                    >
                      {event?.status !== "Finished" ? (
                        <Button
                          sx={{
                            color: "#FFFFFF",
                            backgroundColor: "#455187",
                            padding: "12px 20px",
                            borderRadius: "24px",
                            "&:hover": {
                              color: "#FFFFFF",
                              backgroundColor: "#455187",
                            },
                            "&:disabled": {
                              color: "#FFFFFF",
                              backgroundColor: "#b6bfb8",
                            },
                            border: "none",
                          }}
                          onClick={submitData}
                          disabled={currentPoint === -1}
                        >
                          Update
                        </Button>
                      ) : (
                        <Typography
                          sx={{
                            color: "#007306",
                            fontSize: "18px",
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          Match finished and won by {getWinner()}
                        </Typography>
                      )}
                    </Box>
                  </div>
                )}
              </CardContent>
            </Card>
          </Container>
        </Grid>
      )}
    </div>
  );
};
export default BadmintonPageLayout;
