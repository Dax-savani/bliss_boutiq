import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const ActivateForm = () => {
  return (
    <Box>
      <Box>
        {/* <Container maxWidth="xl"> */}
        <Grid container justifyContent="center">
          <Grid
            item
            md={12}
            sx={{
              width: "100%",
              px: { sm: "55px", xs: "20px" },
            }}
          >
            <Box>
              <Typography
                className="lato"
                sx={{
                  fontSize: { xs: "20px", sm: "24px", md: "32px" },
                  fontWeight: "800",
                  marginBottom: 2,
                  py: 1,
                  mt: 3,
                }}
              >
                Activate HUGO BOSS EXPERIENCE
              </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                component="p"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  marginBottom: 2,
                }}
              >
                Thank you for registering with HUGO BOSS EXPERIENCE in store!
                Activate your account here in order to access all your benefits
                online and in the app.
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                Please complete all fields marked with an *.
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Last name" type="text" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Customer number" type="text" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Activation Code" type="text" />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" my={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      textTransform: "unset",
                      border: "1px solid black",
                      padding: { sm: "12px 88px", xs: "12px 50px" },
                      fontSize: "16px",
                      fontWeight: "500",
                      borderRadius: "0px",
                      backgroundColor: "#000000",
                      "&:hover": {
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                      },
                    }}
                  >
                    ACTIVATE NOW
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* </Container> */}
      </Box>
    </Box>
  );
};

export default ActivateForm;
