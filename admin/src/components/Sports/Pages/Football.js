import React, { useEffect, useState,useRef } from "react";
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { async } from "@firebase/util";
const FootballPageLayout = () => {
  const { matchId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [currTeam, setCurrTeam] = useState(1);
  const [a,setgoala]=useState(0);
  const [b,setgoalb]=useState(0) 
  const runs=[1,1];
  const [d,setd]=useState(null)
  const [com,setcom]=useState([])
  const [sco,setsco]=useState(1)
  const [ss,setss]=useState("")
const [n,setn]=useState("")
 const [er,seter]=useState(false)
 const [m,setm]=useState("start match")
 const [ti,seti]=useState(90)
const [err,seterr]=useState(null)
 const tim=()=>{
  
   return `${ti} mins left `
 }
 
  const initData = async () => {
    
   
      onSnapshot(doc(db, "Football",matchId),async (doc)=>{
      
      
    

    const data = await doc.data();
    
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
const win=async()=>{

  if(a>b){
    
  setm( `${event.teamA} has won `)
  var p=[...com,{com:`${event.teamA} has won `,team:event.teamA}]

  await  updateDoc(doc(db,'Football',matchId),{comments:p})

    
  }else{
    var p=[...com,{com:`${event.teamB} has won `,team:event.teamB}]

    await  updateDoc(doc(db,'Football',matchId),{comments:p})
    setm( `${event.teamB} has won`)

  }
}
const rt=(s)=>{
  seti((ti)=> {
    console.log(ti)
    if(ti===0){
      clearInterval(s)
      
      win()


      return ti
    }
  return ti-1})
 
 
    
}
  const sf=async ()=>{
    if(m==="start match"){
      setm('Update')
      seter(true)
     const srt = setInterval(async () => {
    
         rt(srt)
         
      
        
        
      }, 1000);
   
      return
    }
    if(d===null){
      return
    }
      
      else if(m==='Update'){
  var p=[...com,{com:ss,team:n}]
 if(d.ind==0){
 await  updateDoc(doc(db,'Football',matchId),{playersA:d.s,comments:p})
 }
 else{
  await  updateDoc(doc(db,'Football',matchId),{playersB:d.s,comments:p})

 }
}
seter(true)
  }

  const sch=(e,ind)=>{
    var po=new Date();
    
     var po=po.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })
    
     if(ind===0){
    var s=event.playersA.map((x)=>({name:x.name,goals:x.goals}))

    

       for (var i=0;i<s.length;i++){
         if(s[i].name===e.target.value){
        
           s[i].goals=parseInt(s[i].goals)+1
           setn(event.teamA.slice(0,2))
           setss(po+" "+ `${s[i].name} has scored a goal aganist ${event?.teamB}`)
         setd({s,ind})
         seter(false)
           break
         }
       }


     }else{
      var s=event.playersB.map((x)=>({name:x.name,goals:x.goals}))

      setn(event.teamB.slice(0,2))
       for (var i=0;i<s.length;i++){
         if(s[i].name===e.target.value){
         
          setss(po+" " +`${s[i].name} has scored a goal aganist ${event?.teamA}`)

           s[i].goals=parseInt(s[i].goals)+1
           setd({s,ind})
           seter(false)
      
    
          
           break
         }
       }
     }
   
  }
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
                 
              {(sco==2 &&com.length>0)&& <Box sx={{display:"flex",top:"50px",flexDirection:"column",position:"relative",padding:"10px",gap:"1rem"}}>
                      {com.map(({com,team})=><Box sx={{marginLeft:"20px",padding:"4px",color:"GrayText",display:"flex",flexDirection:"row",alignItems:"center",gap:"1rem"}}>
                        <Avatar sx={{ background:team===event.teamA?"#008080":"#228B22",fontSize:"15px"	}}>{team}</Avatar>{com}...</Box>)}

                    </Box>

              }
             { sco===1&&<CardContent sx={{ padding: "0px 30px 30px 30px" }}>
                
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
                  </TableBody>
                </Table>
              </CardContent>}
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
                <Typography
                  sx={{
                    fontWeight: 400,
                    textAlign: "center",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}
                >
                  {tim()}
                </Typography>
                {1  && (
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
                        {event?.teamA} : {a}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#17a8b0",
                        }}
                      >
                         {event?.teamB} : {b}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "30px",
                      }}
                    >
                      <Stack direction="row" spacing={35}>
                        {runs &&
                          runs.map((run, ind) => (
                            <Avatar
                              key={ind}
                              sx={{
                                cursor: "pointer",
                                backgroundColor: "#007a1b" ,
                              }}
                              
                            >
                              
                              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Goal scored</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label="goals"
          onChange={(e)=>{sch(e,ind)}}
         
        >
          {ind===0?event.playersA.map((x)=><MenuItem value={x.name}>{x.name}</MenuItem>) : event.playersB.map((x)=><MenuItem value={x.name}>{x.name}</MenuItem>) }
        </Select>
      </FormControl>
    </Box>
                            </Avatar>
                          ))}
                      </Stack>
                    </Box>
                    <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          marginTop: "30px",
                        }}
                      ><Box >
                        

                        <Button
                         onClick={sf}
                         disabled={er}
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
                          
                        >
                         {m}
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
export default  FootballPageLayout;
