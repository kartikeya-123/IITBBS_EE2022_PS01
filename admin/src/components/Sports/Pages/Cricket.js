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
} from "@mui/material";

const CricketPageLayout = () => {
  const { matchId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [currTeam, setCurrTeam] = useState(1);

  const initData = async () => {
    // const cricketRef = collection(db, "Cricket");
    const eventRef = doc(db, "Cricket", matchId);
    const eventDoc = await getDoc(eventRef);
    const data = eventDoc.data();
    setEvent(data);
    setSelectedTeam(data?.playersA);
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
                >
                  <Typography onClick={() => handleTeam(1)}>
                    {event?.teamA}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: currTeam === 2 ? "#F8F9FA" : "none",
                    padding: "10px",
                  }}
                >
                  <Typography onClick={() => handleTeam(2)}>
                    {event?.teamB}
                  </Typography>
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
          </Container>
        </Grid>
      )}
    </div>
  );
};
export default CricketPageLayout;
