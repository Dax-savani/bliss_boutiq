import {Box, Typography} from "@mui/material";
import React from "react";

const Hero = ({img}) => {
    return (
        <Box sx={{mt: "70px"}}>
            <Typography component={"img"} src={img} sx={{height: "450px"}}></Typography>
        </Box>
    );
};

export default Hero;
