import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
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
} from "@mui/material";

const CricketPageLayout = () => {
  const { matchId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [currTeam, setCurrTeam] = useState(1);

  const [currentInnings, setCurrentInnings] = useState([]);
  const [currentRun, setCurrentRun] = useState(-1);
  const [out, setOut] = useState(-1);
  const runs = [0, 1, 2, 3, 4, 5, 6];

  const initData = async () => {
    // const cricketRef = collection(db, "Cricket");
    const eventRef = doc(db, "Cricket", matchId);
    const eventDoc = await getDoc(eventRef);
    const data = eventDoc.data();
    setEvent(data);
    setSelectedTeam(data?.playersA);
    if (data?.innings === 1) setCurrentInnings(data?.playersA);
    else setCurrentInnings(data?.playersB);
    console.log(eventDoc.data());
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
    if (event?.innings === 1) return event?.firstInningsScore;
    else return event?.secondInningsScore;
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
                width: "700px",
                minHeight: "600px",
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
                    backgroundColor: currTeam === 1 ? "#F8F9FA" : "none",
                    padding: "10px",
                  }}
                  onClick={() => handleTeam(1)}
                >
                  <Typography>{event?.teamA}</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: currTeam === 2 ? "#F8F9FA" : "none",
                    padding: "10px",
                  }}
                  onClick={() => handleTeam(2)}
                >
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
                  </TableRow>
                  <TableBody>
                    {selectedTeam &&
                      selectedTeam.map((member, ind) => (
                        <TableRow key={ind}>
                          <TableCell>{member?.name}</TableCell>
                          <TableCell>{member?.batting?.score}</TableCell>
                          <TableCell>{member?.batting?.overs}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card sx={{ height: "100%", width: "450px" }}>
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
                        Score : {getScore() + "/" + event?.wickets}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#17a8b0",
                        }}
                      >
                        Overs : {event?.overs}
                      </Typography>
                    </Box>
                    <Box
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
                    </Box>
                    <Box sx={{ marginTop: "20px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman1]?.name}
                          {event?.strike === 1 ? "*" : ""}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {currentInnings[event?.batsman2]?.name}
                          {event?.strike === 2 ? "*" : ""}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
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
                            backgroundColor: "#D91E98",
                            padding: "12px 20px",
                            borderRadius: "24px",
                            "&:hover": {
                              color: "#FFFFFF",
                              backgroundColor: "#D91E98",
                            },
                            "&:disabled": {
                              color: "#FFFFFF",
                              backgroundColor: "#b6bfb8",
                            },
                            border: "none",
                          }}
                          disabled={currentRun === -1}
                        >
                          Update
                        </Button>
                      </Box>
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
