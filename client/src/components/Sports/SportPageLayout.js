import React from "react";
import { Stack, Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import SportEvent from "./SportEvent";
import ScrollContainer from "../HorizontalScroll/ScrollContainer";
import EventDetailWrapper from "./EventDetailWrapper";

const SportsLayout = () => {
    const { sportName, eventId } = useParams();

    // useEffect to get the event list for this sport from the DB
    const events = [
        {
            type: "Qualifier",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id1",
        },
        {
            type: "Qualifier",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id2",
        },
        {
            type: "Qualifier",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id3",
        },
        {
            type: "Quarter-Final",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id4",
        },
        {
            type: "Quarter-Final",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id5",
        },
        {
            type: "Quarter-Final",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id6",
        },
        {
            type: "Quarter-Final",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id9",
        },
        {
            type: "Semi-Final",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id7",
        },
        {
            type: "Semi-Final",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id8",
        },
        {
            type: "Final",
            teamA: "Electrical",
            teamB: "Mechanical",
            date: "DD MM",
            id: "id10",
        },
    ];

    return (
        <Stack sx={{ padding: "4vw" }} spacing={2}>
            <Paper sx={{ padding: "2vw" }} elevation={0}>
                <Box sx={{ my: "3vh" }}>
                    <Typography
                        textAlign="center"
                        variant="h2"
                        fontWeight={700}
                    >
                        Match Schedule - {sportName}
                    </Typography>
                </Box>
                <ScrollContainer
                    items={events.map((event) => (
                        <SportEvent
                            event={event}
                            itemId={event.id}
                            key={event.id}
                        />
                    ))}
                />
            </Paper>
            <EventDetailWrapper sportName={sportName} eventId={eventId} />
        </Stack>
    );
};

export default SportsLayout;
