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
import db from "./../../../config/db.js";
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const CricketPageLayout = () => {
  const { matchId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [currTeam, setCurrTeam] = useState(1);

  const [currentInnings, setCurrentInnings] = useState([]);
  const [oppositeInnings, setOppositeInnings] = useState([]);

  const [currentRun, setCurrentRun] = useState(-1);
  const [out, setOut] = useState(-1);
  const runs = [0, 1, 2, 3, 4, 5, 6];
  const [showScorecard, setShowScorecard] = useState(true);
  const [summary, setSummary] = useState(null);

  const initData = async () => {
    // const cricketRef = collection(db, "Cricket");
    const eventRef = doc(db, "Cricket", matchId);
    onSnapshot(eventRef, (data) => {
      const eventData = data.data();
      setEvent(eventData);
      setSummary(eventData.summary);
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

  const getComment = (comment) => {
    let add = "";
    if (comment?.text === "W") add = "Wicket";
    else add = `${comment.text} run`;

    let message = `${comment.bowler} bowling to ${comment.batsman}, ${add} `;
    return message;
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
                minWidth: "700px",
                minHeight: "600px",
                borderRadius: "0px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
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
                    padding: "10px",
                  }}
                  onClick={() => setShowScorecard(true)}
                >
                  <Typography
                    sx={{
                      fontSize: "17px",
                      color: showScorecard ? "#0a4a3a" : "inherit",
                      fontWeight: showScorecard ? 600 : 400,
                    }}
                  >
                    Scorecard
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    padding: "10px",
                  }}
                  onClick={() => setShowScorecard(false)}
                >
                  <Typography
                    sx={{
                      fontSize: "17px",
                      color: !showScorecard ? "#0a4a3a" : "inherit",
                      fontWeight: !showScorecard ? 600 : 400,
                    }}
                  >
                    Summary
                  </Typography>
                </Box>
              </Box>
              {showScorecard ? (
                <>
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
                        backgroundColor: currTeam === 1 ? "#e6e8f0" : "none",
                        padding: "10px",
                      }}
                      onClick={() => handleTeam(1)}
                    >
                      <Typography
                        sx={{
                          fontSize: "17px",
                          color: currTeam === 1 ? "#0a4a3a" : "inherit",
                          fontWeight: currTeam === 1 ? 600 : 400,
                        }}
                      >
                        {event?.teamA}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        backgroundColor: currTeam === 2 ? "#e6e8f0" : "none",
                        padding: "10px",
                      }}
                      onClick={() => handleTeam(2)}
                    >
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
                      </TableRow>
                      <TableBody>
                        {selectedTeam &&
                          selectedTeam.map((member, ind) => (
                            <TableRow key={ind}>
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
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
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
                </>
              ) : (
                <List sx={{ overflow: "auto", maxHeight: "600px" }}>
                  {summary &&
                    summary.map((comment, ind) => (
                      <ListItem alignItems="center">
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              fontSize: "16px",
                              backgroundColor: "#008080",
                            }}
                          >
                            {comment.over}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={getComment(comment)} />
                      </ListItem>
                    ))}
                </List>
              )}
            </Card>
            <Card sx={{ height: "100%", width: "100%", minWidth: "400px" }}>
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
                        {event?.innings === 1 ? event?.teamA : event?.teamB}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#17a8b0",
                        }}
                      >
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
                          {currentInnings[event?.batsman1]?.name}
                          {event?.strike === 1 ? "*" : ""}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman1]?.batting?.score}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman1]?.batting?.overs}
                        </Typography>
                        {/* <FormControlLabel
                          label="Out"
                          control={
                            <Checkbox
                              checked={out === 1}
                              onChange={() => handleOut(1)}
                            ></Checkbox>
                          } */}
                        {/* /> */}
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
                          {currentInnings[event?.batsman2]?.name}
                          {event?.strike === 2 ? "*" : ""}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman2]?.batting?.score}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman2]?.batting?.overs}
                        </Typography>
                        {/* <FormControlLabel
                          label="Out"
                          control={
                            <Checkbox
                              checked={out === 2}
                              onChange={() => handleOut(2)}
                            ></Checkbox>
                          }
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
                          disabled={currentRun === -1}
                          onClick={submitData}
                        >
                          Update
                        </Button>
                      </Box> */}
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
