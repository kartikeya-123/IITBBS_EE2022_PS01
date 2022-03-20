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
import { getOverlappingDaysInIntervals } from "date-fns";
import { styled } from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

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
  const [inningsChange, setInningsChange] = useState(false);
  const [currentBowler, setCurrentBowler] = useState(0);
  const [newOver, setNewOver] = useState(false);

  const initData = async () => {
    // const cricketRef = collection(db, "Cricket");
    const eventRef = doc(db, "Cricket", matchId);
    onSnapshot(eventRef, (data) => {
      const eventData = data.data();
      setEvent(eventData);
      setCurrentBowler(eventData?.currentBowler);
      if (eventData?.innings === 1) {
        setCurrTeam(1);
        setCurrentInnings(eventData?.playersA);
        setOppositeInnings(eventData?.playersB);
        setSelectedTeam(eventData?.playersA);
        // if(eventData.firstInningsOvers === 0)
      } else {
        setCurrTeam(2);
        setOppositeInnings(eventData?.playersA);
        setCurrentInnings(eventData?.playersB);
        setSelectedTeam(eventData?.playersB);
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

  const getScore = (innings) => {
    if (innings === 1)
      return event?.firstInningsScore + "/" + event?.firstInningsWickets;
    else return event?.secondInningsScore + "/" + event?.secondInningsWickets;
  };

  const getOvers = (innings) => {
    if (innings === 1) return event?.firstInningsOvers;
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

  const checkNewOver = () => {
    let over;
    if (event.innings === 1) over = event.firstInningsOvers;
    else over = event.secondInningsOvers;
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
        console.log(data.playersB[currentBowler]);
        data.playersB[currentBowler].bowling.score += currentRun;

        if ((currentRun % 2 !== 0) ^ checkNewOver(data?.firstInningsOvers)) {
          if (data.strike === 1) data.strike = 2;
          else data.strike = 1;
        }
        data.currentBowler = currentBowler;
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
        data.firstInningsWickets++;
        data.playersB[currentBowler].bowling.wickets++;
        if ((currentRun % 2 !== 0) ^ checkNewOver(data?.firstInningsOvers)) {
          if (data.strike === 1) data.strike = 2;
          else data.strike = 1;
        }
        data.currentBowler = currentBowler;
      }
    } else {
      if (out === -1) {
        // Not out
        if (data?.strike === 1) {
          data.playersB[data?.batsman1].batting.score += currentRun;
          data.playersB[data?.batsman1].batting.overs++;
        } else {
          data.playersB[data?.batsman2].batting.score += currentRun;
          data.playersB[data?.batsman2].batting.overs++;
        }

        data.secondInningsOvers = newOvers(data?.secondInningsOvers);

        data.secondInningsScore += currentRun;
        data.playersA[currentBowler].bowling.score += currentRun;
        if ((currentRun % 2 !== 0) ^ checkNewOver(data?.secondInningsOvers)) {
          if (data.strike === 1) data.strike = 2;
          else data.strike = 1;
        }
        data.currentBowler = currentBowler;
      } else {
        const newBatsman = Math.max(data.batsman1, data.batsman2) + 1;

        if (data?.strike === 1) {
          data.playersB[data?.batsman1].batting.overs++;
          data.batsman1 = newBatsman;
        } else {
          data.playersB[data.batsman2].batting.overs++;
          data.batsman2 = newBatsman;
        }

        data.secondInningsOvers = newOvers(data?.secondInningsOvers);
        data.secondInningsWickets++;
        data.playersA[currentBowler].bowling.wickets++;
        if ((currentRun % 2 !== 0) ^ checkNewOver(data?.secondInningsOvers)) {
          if (data.strike === 1) data.strike = 2;
          else data.strike = 1;
        }
        data.currentBowler = currentBowler;
      }
    }
    if (data.innings === 2) {
      if (
        data.secondInningsWickets === data.playersA.length - 1 ||
        data.secondInningsOvers === parseInt(data.overs) ||
        data.secondInningsScore > data.firstInningsScore
      ) {
        data.status = "Finished";
      }
    }
    if (data.innings === 1) {
      if (
        data.firstInningsWickets === data.playersA.length - 1 ||
        data.firstInningsOvers === parseInt(data.overs)
      ) {
        // Innings change
        data.innings = 2;
        data.batsman1 = 0;
        data.batsman2 = 1;
        data.strike = 1;
        data.currentBowler = 0;
      }
    }

    await submitDataToFireStore(data);
  };

  //   const getCurrentBowlerDetails = ()=>{
  //        let bowler;
  //        if(event.innings === 1){
  //            bowler = event.playersB[currentBowler];
  //        }
  //        else bowler = event.playersA[currentBowler];

  //        return (
  //         <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
  //           {" "}
  //           {currentInnings[event?.batsman1]?.name}
  //           {event?.strike === 1 ? "*" : ""}
  //         </Typography>
  //         <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
  //           {" "}
  //           {currentInnings[event?.batsman1]?.batting?.score}
  //         </Typography>
  //         <FormControlLabel
  //           label="Out"
  //           control={
  //             <Checkbox
  //               checked={out === 1}
  //               onChange={() => handleOut(1)}
  //             ></Checkbox>
  //           }
  //         />
  //       </Box>
  //        )
  //   }

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
                    Score : {getScore(currTeam)}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "#17a8b0",
                    }}
                  >
                    Overs : {getOvers(currTeam)}
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
              </CardContent>
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
                        Score : {getScore(event?.innings)}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#17a8b0",
                        }}
                      >
                        Overs : {getOvers(event?.innings)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        margin: "auto",
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
                    </Box>
                    <Box sx={{ marginTop: "20px" }}>
                      <Typography
                        sx={{
                          textAlign: "center",

                          color: "#1d1f61",
                          marginBottom: "15px",
                        }}
                      >
                        Batting
                      </Typography>
                      {currentInnings[event?.batsman1] && (
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
                          <Typography
                            sx={{ fontWeight: 600, fontSize: "18px" }}
                          >
                            {" "}
                            {currentInnings[event?.batsman1]?.batting?.score}
                          </Typography>
                          <FormControlLabel
                            label="Out"
                            control={
                              <Checkbox
                                checked={out === 1}
                                onChange={() => handleOut(1)}
                              ></Checkbox>
                            }
                          />
                        </Box>
                      )}
                      {currentInnings[event?.batsman2] && (
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
                          <Typography
                            sx={{ fontWeight: 600, fontSize: "18px" }}
                          >
                            {" "}
                            {currentInnings[event?.batsman2]?.batting?.score}
                          </Typography>
                          <FormControlLabel
                            label="Out"
                            control={
                              <Checkbox
                                checked={out === 2}
                                onChange={() => handleOut(2)}
                              ></Checkbox>
                            }
                          />
                        </Box>
                      )}
                      {checkNewOver() ? (
                        <Box sx={{ marginTop: "20px" }}>
                          {oppositeInnings && oppositeInnings.length > 0 && (
                            <FormControl sx={{ m: 1, minWidth: 220 }}>
                              <InputLabel sx={{ fontSize: "16px" }}>
                                Select Bowler
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Select Bowler"
                                value={currentBowler}
                                onChange={(event) => {
                                  console.log(event);
                                  setCurrentBowler(event.target.value);
                                }}
                                input={<BootstrapInput />}
                              >
                                {oppositeInnings &&
                                  oppositeInnings.map((player, ind) => {
                                    // if (ind === currentBowler) return;
                                    return (
                                      <MenuItem value={ind}>
                                        {player.name}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>
                          )}
                        </Box>
                      ) : (
                        <Box sx={{ marginTop: "20px" }}>
                          <Typography
                            sx={{
                              textAlign: "center",
                              marginBottom: "15px",
                              color: "#1d1f61",
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
                      )}
                      {/* <Box>
                        {event.innings === 1 && (
                          <FormControlLabel
                            label="Innings change"
                            control={
                              <Checkbox
                                checked={inningsChange}
                                onChange={() =>
                                  setInningsChange(!inningsChange)
                                }
                              ></Checkbox>
                            }
                          />
                        )}
                      </Box> */}
                      {event?.status !== "Finished" ? (
                        <Box
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
                            disabled={
                              currentRun === -1 && !inningsChange && out === -1
                            }
                            onClick={submitData}
                          >
                            Update
                          </Button>
                        </Box>
                      ) : (
                        <Typography
                          sx={{
                            color: "#007306",
                            fontSize: "18px",
                            fontWeight: 600,
                            textAlign: "center",
                            marginTop: "15px",
                          }}
                        >
                          {getMessage()}
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
export default CricketPageLayout;
