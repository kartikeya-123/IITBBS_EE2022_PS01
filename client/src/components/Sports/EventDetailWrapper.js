import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Stack,
    Typography,
    Paper,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import MatchUpdates from "./MatchUpdates";

const EventDetailWrapper = ({ sportName, eventId }) => {
    // Make request to DB
    const eventDetails = {
        time: { startTime: "StartTime", endTime: "EndTime" },
        venue: "Community Center",
        teamA: "Electrical",
        membersTeamA: ["Alpha", "Beta", "Delta", "Gamma", "Theta"],
        teamB: "Mechanical",
        membersTeamB: ["Alpha", "Beta", "Delta", "Gamma", "Theta"],
        otherDetails: {}, // Can use ... operator to collect all other data in this variable
    };

    return (
        <React.Fragment>
            {!eventId && (
                <Paper sx={{ padding: "30px" }} elevation={0}>
                    <Typography>Select a match to view its details.</Typography>
                </Paper>
            )}
            {eventId && (
                <React.Fragment>
                    <Paper sx={{ padding: "30px" }} elevation={0}>
                        <Stack>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" textAlign="center">
                                        {eventDetails.time
                                            ? `Time: ${eventDetails.time.startTime} to ${eventDetails.time.endTime}`
                                            : "Time: To Be Announced"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" textAlign="center">
                                        {eventDetails.venue
                                            ? `Venue: ${eventDetails.venue}`
                                            : "Venue: To Be Announced"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<IoIosArrowDown />}
                                        >{`Team ${eventDetails.teamA}`}</AccordionSummary>
                                        <AccordionDetails>
                                            <Stack>
                                                {eventDetails.membersTeamA.map(
                                                    (member, index) => (
                                                        <Typography
                                                            variant="body2"
                                                            key={`${member}${index}`}
                                                        >
                                                            {member}
                                                        </Typography>
                                                    )
                                                )}
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<IoIosArrowDown />}
                                        >{`Team ${eventDetails.teamB}`}</AccordionSummary>
                                        <AccordionDetails>
                                            <Stack>
                                                {eventDetails.membersTeamB.map(
                                                    (member, index) => (
                                                        <Typography
                                                            variant="body2"
                                                            key={`${member}${index}`}
                                                        >
                                                            {member}
                                                        </Typography>
                                                    )
                                                )}
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Paper>
                    <Paper sx={{ padding: "30px" }} elevation={0}>
                        <MatchUpdates updates={eventDetails.otherDetails} />
                    </Paper>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default EventDetailWrapper;
