import React from "react";
import { Typography, Stack } from "@mui/material";

const MatchUpdates = ({ updates }) => {
    return (
        <React.Fragment>
            {updates.ongoing && (
                <React.Fragment>
                    <Typography component="div" variant="h3">
                        Ongoing:
                    </Typography>
                    <Stack></Stack>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default MatchUpdates;
