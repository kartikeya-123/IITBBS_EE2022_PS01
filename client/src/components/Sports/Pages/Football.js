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
  Menu,
} from "@mui/material";

const FootballPageLayout = () => {
  const { matchId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [currTeam, setCurrTeam] = useState(1);
  const [a,setgoala]=useState(0);
  const [b,setgoalb]=useState(0) 
  const runs=[];
  const [d,setd]=useState(null)
  const [com,setcom]=useState([])
  const [sco,setsco]=useState(1)
  const [ss,setss]=useState("")
const [n,setn]=useState("")

  const initData = async () => {
    
   
      onSnapshot(doc(db, "Football",matchId),async (doc)=>{
      
      console.log(doc.data())
    

    const data =  doc.data();
    
    setEvent(data);
    if(data.comments){
      setcom(data.comments)
      console.log(data.comments)
      }
    var a1=0
    var a2=0
    for (var i=0;i<data.playersA.length;i++){
      a1=a1+data.playersA[i].goals
    }
    for (var j=0;j<data.playersB.length;j++){
      a2=a2+data.playersB[j].goals
    }
    setgoala(a1)
    setgoalb(a2)
    console.log(a1,a2)
    setSelectedTeam(data?.playersA);
  })
  
  };

  useEffect(() => {
     
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
               <Box sx={{display:"flex",flexDirection:"row"}}>
              <Box
                  sx={{
                    width: "50%",
                    textAlign: "center",
                     backgroundColor:sco===1?"#F8F9FA": "none",
                    cursor:"pointer",
                    padding: "10px",
                  }}
                  onClick={()=>{setsco(1)}}
                 
                >
                  <Typography>Scorecard</Typography>
               </Box>
               <Box
                  sx={{
                    width: "50%",
                    textAlign: "center",
                    padding: "10px",
                    backgroundColor: sco===1 ? "none": "#F8F9FA",
                    cursor:"pointer"

                  }}
                onClick={()=>{setsco(2)}}
                >
                  <Typography>commentary</Typography>
                </Box>
                </Box>

              {sco===1&&<Box
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
              </Box>}
              <Box sx={{overflowY:"auto"}}>
              {(sco==2 &&com.length>0)&& <Box sx={{display:"flex",top:"50px",flexDirection:"column",position:"relative",padding:"10px",gap:"1rem"}}>
                      {com.map(({com,team})=><Box sx={{marginLeft:"20px",padding:"4px",color:"GrayText",display:"flex",flexDirection:"row",alignItems:"center",gap:"1rem"}}>
                        <Avatar sx={{ background:team===event.teamA?"#008080":"#228B22",fontSize:"15px"	}}>{team}</Avatar>{com}...</Box>)}

                    </Box>

              }
              </Box>
           { sco===1&&<CardContent sx={{ padding: "0px 30px 30px 30px" }}>
                <Typography>Scorecard</Typography>
                <Table>
                  <TableRow>
                    <TableCell>PLayers</TableCell>
                    <TableCell>Goals Scored</TableCell>
    
                  </TableRow>
                  <TableBody>
                    {selectedTeam &&
                      selectedTeam.map((member, ind) => (
                        <TableRow key={ind}>
                          <TableCell>{member?.name}</TableCell>
                          <TableCell>{member?.goals}</TableCell>
              
                        </TableRow>
                      ))}
                      <TableRow key="33">
                          <TableCell>Total goals</TableCell>
                          <TableCell>{currTeam===1?a:b}</TableCell>
              
                        </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
}
            </Card>
           
          </Container>
        </Grid>
      )}
    </div>
  );
};
export default  FootballPageLayout;
