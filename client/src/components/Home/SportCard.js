import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import getImage from "../../assets/images";

const SportCard = ({
    sportName = "Sport Name",
    eventQuantity = "Number of Events",
}) => {
    const navigate = useNavigate();
    const image = getImage(sportName);
    return (
        <Grid item xs={12} md={4}>
            <Card
                sx={{
                    width: "400px",
                    minHeight: "400px",
                    cursor: "pointer",
                }}
                onClick={() => {
                    navigate(`/sport/${sportName}`);
                }}
            >
                <CardMedia
                    component="img"
                    height="150"
                    image={image}
                    alt="green iguana"
                    sx={{ overflow: "hidden" }}
                />
                <CardContent>
                    <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                        {sportName}
                    </Typography>
                    <Typography sx={{ fontSize: "18px", fontWeight: 400 }}>
                        Total events : {eventQuantity}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default SportCard;
