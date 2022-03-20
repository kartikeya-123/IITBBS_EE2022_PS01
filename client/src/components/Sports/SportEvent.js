import React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

const SportEvent = ({ event }) => {
    const navigate = useNavigate();
    const { sportName } = useParams();

    return (
        <div>
            <Card
                elevation={2}
                sx={{ margin: "5px", cursor: "pointer" }}
                onClick={() => {
                    navigate(`/sport/${sportName}/${event.id}`);
                }}
            >
                <CardContent>
                    <Stack sx={{ width: "180px" }} spacing={1}>
                        <Typography variant="body2" fontWeight="bold">
                            {event.type}
                        </Typography>
                        <Typography variant="h4">{`${event.teamA} VS ${event.teamB}`}</Typography>
                        <Typography variant="caption">{event.date}</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    );
};

export default SportEvent;
