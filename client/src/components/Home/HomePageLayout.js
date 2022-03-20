import React from "react";
import { Grid, Box, Paper } from "@mui/material";

import SportsImage from "./../../assets/sport.jpg";
import SportCard from "./SportCard";

const Layout = () => {
    // useEffect to get sportEvents from DB later on
    const sportEvents = [
        { name: "Badminton", quantity: "4" },
        { name: "Football", quantity: "5" },
        { name: "Cricket", quantity: "6" },
    ];

    return (
        <div>
            <Grid
                sx={{
                    width: "100%",
                }}
            >
                <Box sx={{ width: "100%", height: "600px" }}>
                    <img
                        alt="Sports"
                        src={SportsImage}
                        style={{ width: "100%", height: "100%" }}
                    />
                </Box>
                <Paper
                    elevation={0}
                    sx={{
                        position: "absolute",
                        top: "400px",
                        width: "90vw",
                        margin: "5vw",
                        display: "flex",
                        justifyContent: "space-evenly",
                        borderRadius: "14px",
                        background: "transparent",
                    }}
                >
                    <Grid container spacing={2} sx={{ marginBottom: "5vh" }}>
                        {sportEvents.map((event) => (
                            <SportCard
                                sportName={event.name}
                                eventQuantity={event.quantity}
                                key={event.name}
                            />
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
};

export default Layout;
