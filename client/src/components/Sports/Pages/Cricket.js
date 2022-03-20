import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
<<<<<<< HEAD
} from "firebase/firestore";
import db from "./../../../config/db";
=======
  updateDoc,
} from "firebase/firestore";
import db from "./../../../config/db.js";
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
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
} from "@mui/material";

const CricketPageLayout = () => {
  const { matchId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [currTeam, setCurrTeam] = useState(1);

  const [currentInnings, setCurrentInnings] = useState([]);
<<<<<<< HEAD
=======
  const [oppositeInnings, setOppositeInnings] = useState([]);

>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
  const [currentRun, setCurrentRun] = useState(-1);
  const [out, setOut] = useState(-1);
  const runs = [0, 1, 2, 3, 4, 5, 6];

  const initData = async () => {
    // const cricketRef = collection(db, "Cricket");
    const eventRef = doc(db, "Cricket", matchId);
<<<<<<< HEAD
    const eventDoc = await getDoc(eventRef);
    const data = eventDoc.data();
    setEvent(data);
    setSelectedTeam(data?.playersA);
    if (data?.innings === 1) setCurrentInnings(data?.playersA);
    else setCurrentInnings(data?.playersB);
    console.log(eventDoc.data());
=======
    onSnapshot(eventRef, (data) => {
      const eventData = data.data();
      setEvent(eventData);
      if (eventData?.innings === 1) {
        setCurrTeam(1);
        setSelectedTeam(eventData?.playersA);
        setOppositeInnings(eventData?.playersB);
        setCurrentInnings(eventData?.playersA);
      } else {
        setCurrTeam(2);
        setSelectedTeam(eventData?.playersB);
        setOppositeInnings(eventData?.playersA);
        setCurrentInnings(eventData?.playersB);
      }
      console.log(eventData);
      setOut(-1);
      setCurrentRun(-1);
    });
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
  };

  useEffect(() => {
    // console.log(db);
    initData();
  }, []);

  const handleTeam = (team) => {
    setCurrTeam(team);
    if (team === 1) {
      setSelectedTeam(event.playersA);
    } else setSelectedTeam(event.playersB);
  };

  const handleOut = (n) => {
    console.log(n);
    if (out !== n) setOut(n);
    else setOut(-1);
  };

  const getScore = () => {
<<<<<<< HEAD
    if (event?.innings === 1) return event?.firstInningsScore;
    else return event?.secondInningsScore;
  };

=======
    if (event?.innings === 1)
      return event?.firstInningsScore + "/" + event?.firstInningsWickets;
    else return event?.secondInningsScore + "/" + event?.secondInningsWickets;
  };

  const getOvers = () => {
    if (event?.innings === 1) return event?.firstInningsOvers;
    else return event?.secondInningsOvers;
  };

  const newOvers = (n) => {
    let k = n * 10;
    let m = k % 10;
    if (m < 5) {
      n += 0.1;
    } else {
      n = Math.floor(n) + 1;
    }
    let val = Math.round(n * 10) / 10;
    console.log("overs", val);
    return val;
  };

  const checkNewOver = (over) => {
    return (over * 10) % 10 === 0;
  };

  const submitDataToFireStore = async (data) => {
    console.log(data);
    const eventRef = doc(db, "Cricket", matchId);
    const eventDoc = await updateDoc(eventRef, data);
    console.log(eventDoc);
    // const data = eventDoc.data();
    // setEvent(data);
    // setSelectedTeam(data?.playersA);
    // if (data?.innings === 1) setCurrentInnings(data?.playersA);
    // else setCurrentInnings(data?.playersB);
    // console.log(eventDoc.data());
  };

  const submitData = async () => {
    let data = event;
    console.log(out);
    if (data?.innings === 1) {
      if (out === -1) {
        // Not out
        if (data?.strike === 1) {
          data.playersA[data?.batsman1].batting.score += currentRun;
          data.playersA[data?.batsman1].batting.overs++;
        } else {
          data.playersA[data?.batsman2].batting.score += currentRun;
          data.playersA[data?.batsman2].batting.overs++;
        }

        data.firstInningsOvers = newOvers(data?.firstInningsOvers);

        data.firstInningsScore += currentRun;

        if ((currentRun % 2 !== 0) ^ checkNewOver(data?.firstInningsOvers)) {
          if (data.strike === 1) data.strike = 2;
          else data.strike = 1;
        }
      } else {
        const newBatsman = Math.max(data.batsman1, data.batsman2) + 1;

        if (data?.strike === 1) {
          data.playersA[data?.batsman1].batting.overs++;
          data.batsman1 = newBatsman;
        } else {
          data.playersA[data.batsman2].batting.overs++;
          data.batsman2 = newBatsman;
        }

        data.firstInningsOvers = newOvers(data?.firstInningsOvers);

        if ((currentRun % 2 !== 0) ^ checkNewOver(data?.firstInningsOvers)) {
          if (data.strike === 1) data.strike = 2;
          else data.strike = 1;
        }
      }
    } else {
    }
    await submitDataToFireStore(data);
  };

  const getMessage = () => {
    let message = "";
    if (event?.status === "Finished") {
      if (event?.firstInningsScore > event?.secondInningsScore)
        message = `Match won by ${event?.teamA}`;
      else if (event?.firstInningsScore > event?.secondInningsScore)
        message = `Match tied`;
      else message = `Match won by ${event?.teamB}`;
    }
    return message;
  };
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
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
<<<<<<< HEAD
                width: "700px",
                minHeight: "600px",
=======
                width: "100%",
                minWidth: "700px",
                minHeight: "600px",
                borderRadius: "0px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  cursor: "pointer",
                  marginBottom: "20px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
<<<<<<< HEAD
                    backgroundColor: currTeam === 1 ? "#F8F9FA" : "none",
=======
                    backgroundColor: currTeam === 1 ? "#e6e8f0" : "none",
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                    padding: "10px",
                  }}
                  onClick={() => handleTeam(1)}
                >
<<<<<<< HEAD
                  <Typography>{event?.teamA}</Typography>
=======
                  <Typography
                    sx={{
                      fontSize: "17px",
                      color: currTeam === 1 ? "#0a4a3a" : "inherit",
                      fontWeight: currTeam === 1 ? 600 : 400,
                    }}
                  >
                    {event?.teamA}
                  </Typography>
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
<<<<<<< HEAD
                    backgroundColor: currTeam === 2 ? "#F8F9FA" : "none",
=======
                    backgroundColor: currTeam === 2 ? "#e6e8f0" : "none",
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                    padding: "10px",
                  }}
                  onClick={() => handleTeam(2)}
                >
<<<<<<< HEAD
                  <Typography>{event?.teamB}</Typography>
                </Box>
              </Box>
              <CardContent sx={{ padding: "0px 30px 30px 30px" }}>
                <Typography>Scorecard</Typography>
                <Table>
                  <TableRow>
                    <TableCell>Batting</TableCell>
                    <TableCell>Runs scored</TableCell>
                    <TableCell>Overs faced</TableCell>
=======
                  <Typography
                    sx={{
                      fontSize: "17px",
                      color: currTeam === 2 ? "#0a4a3a" : "inherit",
                      fontWeight: currTeam === 2 ? 600 : 400,
                    }}
                  >
                    {event?.teamB}
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ padding: "0px 30px 30px 30px" }}>
                {/* <Typography>Scorecard</Typography> */}
                <Box
                  sx={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "#17a8b0",
                    }}
                  >
                    Score : {getScore()}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "#17a8b0",
                    }}
                  >
                    Overs : {getOvers()}
                  </Typography>
                </Box>
                <Table>
                  <TableRow sx={{ backgroundColor: "#F6F9FC" }}>
                    <TableCell
                      sx={{
                        color: "#8898aa",
                        fontWeight: 600,
                        fontSize: "17px",
                      }}
                    >
                      Batting
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#8898aa",
                        fontWeight: 600,
                        fontSize: "17px",
                      }}
                    >
                      Runs scored
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#8898aa",
                        fontWeight: 600,
                        fontSize: "17px",
                      }}
                    >
                      Balls faced
                    </TableCell>
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                  </TableRow>
                  <TableBody>
                    {selectedTeam &&
                      selectedTeam.map((member, ind) => (
                        <TableRow key={ind}>
<<<<<<< HEAD
                          <TableCell>{member?.name}</TableCell>
                          <TableCell>{member?.batting?.score}</TableCell>
                          <TableCell>{member?.batting?.overs}</TableCell>
=======
                          <TableCell
                            sx={{ fontSize: "17px", color: "#2e3837" }}
                          >
                            {member?.name}
                          </TableCell>
                          <TableCell
                            sx={{ fontSize: "17px", color: "#2e3837" }}
                          >
                            {member?.batting?.score}
                          </TableCell>
                          <TableCell
                            sx={{ fontSize: "17px", color: "#2e3837" }}
                          >
                            {member?.batting?.overs}
                          </TableCell>
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
<<<<<<< HEAD
              </CardContent>
            </Card>
            <Card sx={{ height: "100%", width: "450px" }}>
=======
                {event.status === "Finished" && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#007306",
                        fontSize: "18px",
                        fontWeight: 600,
                        textAlign: "center",
                        marginTop: "20px",
                      }}
                    >
                      {getMessage()}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
            <Card sx={{ height: "100%", width: "100%", minWidth: "400px" }}>
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
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
                {currentInnings && (
                  <div style={{ justifyContent: "center" }}>
                    <Box
                      sx={{
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#17a8b0",
                        }}
                      >
<<<<<<< HEAD
                        Score : {getScore() + "/" + event?.wickets}
=======
                        {event?.innings === 1 ? event?.teamA : event?.teamB}
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#17a8b0",
                        }}
                      >
<<<<<<< HEAD
                        Overs : {event?.overs}
                      </Typography>
                    </Box>
                    <Box
=======
                        Score : {getScore()}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#17a8b0",
                        }}
                      >
                        Overs : {getOvers()}
                      </Typography>
                    </Box>
                    {/* <Box
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "30px",
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        {runs &&
                          runs.map((run, ind) => (
                            <Avatar
                              key={ind}
                              sx={{
                                cursor: "pointer",
                                backgroundColor:
                                  currentRun === run ? "#007a1b" : "#b6e3bf",
                              }}
                              onClick={() => {
                                setCurrentRun(run);
                              }}
                            >
                              {run}
                            </Avatar>
                          ))}
                      </Stack>
<<<<<<< HEAD
                    </Box>
                    <Box sx={{ marginTop: "20px" }}>
=======
                    </Box> */}
                    <Box sx={{ marginTop: "20px" }}>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          textAlign: "center",
                          marginBottom: "15px",
                        }}
                      >
                        Batting
                      </Typography>
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
<<<<<<< HEAD
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
=======
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "18px",
                            width: "100px",
                          }}
                        >
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                          {" "}
                          {currentInnings[event?.batsman1]?.name}
                          {event?.strike === 1 ? "*" : ""}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman1]?.batting?.score}
                        </Typography>
<<<<<<< HEAD
                        <FormControlLabel
=======
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman1]?.batting?.overs}
                        </Typography>
                        {/* <FormControlLabel
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                          label="Out"
                          control={
                            <Checkbox
                              checked={out === 1}
                              onChange={() => handleOut(1)}
                            ></Checkbox>
<<<<<<< HEAD
                          }
                        />
                      </Box>
=======
                          } */}
                        {/* /> */}
                      </Box>
                      <br></br>
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
<<<<<<< HEAD
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
=======
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "18px",
                            width: "100px",
                          }}
                        >
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                          {" "}
                          {currentInnings[event?.batsman2]?.name}
                          {event?.strike === 2 ? "*" : ""}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman2]?.batting?.score}
                        </Typography>
<<<<<<< HEAD
                        <FormControlLabel
=======
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman2]?.batting?.overs}
                        </Typography>
                        {/* <FormControlLabel
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                          label="Out"
                          control={
                            <Checkbox
                              checked={out === 2}
                              onChange={() => handleOut(2)}
                            ></Checkbox>
                          }
<<<<<<< HEAD
                        />
                      </Box>
                      <Box
=======
                        /> */}
                      </Box>
                      <Box sx={{ marginTop: "20px" }}>
                        <Typography
                          sx={{
                            textAlign: "center",
                            color: "#1d1f61",
                            marginBottom: "15px",
                          }}
                        >
                          Bowling
                        </Typography>
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
                            {oppositeInnings[event?.currentBowler]?.name}
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, fontSize: "18px" }}
                          >
                            {" "}
                            {
                              oppositeInnings[event?.currentBowler]?.bowling
                                ?.score
                            }
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, fontSize: "18px" }}
                          >
                            {" "}
                            {
                              oppositeInnings[event?.currentBowler]?.bowling
                                ?.wickets
                            }
                          </Typography>
                        </Box>
                      </Box>
                      {/* <Box
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          marginTop: "30px",
                        }}
                      >
                        <Button
                          sx={{
                            color: "#FFFFFF",
<<<<<<< HEAD
                            backgroundColor: "#D91E98",
=======
                            backgroundColor: "#455187",
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                            padding: "12px 20px",
                            borderRadius: "24px",
                            "&:hover": {
                              color: "#FFFFFF",
<<<<<<< HEAD
                              backgroundColor: "#D91E98",
=======
                              backgroundColor: "#455187",
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
                            },
                            "&:disabled": {
                              color: "#FFFFFF",
                              backgroundColor: "#b6bfb8",
                            },
                            border: "none",
                          }}
                          disabled={currentRun === -1}
<<<<<<< HEAD
                        >
                          Update
                        </Button>
                      </Box>
=======
                          onClick={submitData}
                        >
                          Update
                        </Button>
                      </Box> */}
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
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
export default CricketPageLayout;
