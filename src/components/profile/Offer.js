import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const Offer = () => {
     const navigate = useNavigate();
  return (
    <>
      <Box mt={"100px"}>
        <Container maxWidth="xl">
          {" "}
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "600",
                  justifyContent: "right",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/profile")}
              >
                <ChevronLeftIcon />
                <Box>Back</Box>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              height: "80vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "35px",
            }}
          >
            COMING SOON
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Offer


