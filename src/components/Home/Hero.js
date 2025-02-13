import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import img from "../../assets/images/Home/hero/image.jpeg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: "70px" }}>
      <Box
        sx={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Container>
            <Box
              sx={{
                textAlign: { xs: "center", sm: "end" },
                mr: { sm: "100px", xs: "0" },
              }}
            >
              <Typography
                sx={{
                  color: "#b51f29",
                  fontSize: { xs: "40px", sm: "60px", md: "80px" },
                  fontWeight: "900",
                  mb: "10px",
                }}
                className="lato"
              >
                SALE
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "18px", sm: "25px" },
                  fontWeight: "700",
                  color: "#b51f29",
                }}
                className="lato"
              >
                FURTHER REDUCTIONS:
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "18px", sm: "25px" },
                  fontWeight: "700",
                  color: "#b51f29",
                  mb: "40px",
                }}
                className="lato"
              >
                UP TO 50% OFF WINTER STYLES
              </Typography>
              <Box>
                <Button
                  onClick={() => navigate(`/product?gender=male`)}
                  className="lato"
                  sx={{
                    backgroundColor: "#b51f29",
                    color: "#ffffff",
                    fontSize: { xs: "18px", sm: "24px" },
                    width: { xs: "250px", sm: "170px" },
                    cursor: "pointer",
                    fontWeight: "bold",
                    margin: "5px",
                    position: "relative",
                    transition: "all 0.5s",
                    "& span": {
                      display: "inline-block",
                      transition: "0.5s",
                      cursor: "pointer",
                    },
                    "& .arrow-icon": {
                      position: "absolute",
                      opacity: 0,
                      top: "50%",
                      right: "-20px",
                      transform: "translateY(-50%)",
                      transition: "0.5s",
                    },
                    "&:hover": {
                      "& span": {
                        paddingRight: "20px",
                      },
                      "& .arrow-icon": {
                        opacity: 1,
                        right: "10px",
                      },
                      backgroundColor: "#b51f29",
                    },
                  }}
                >
                  <span>for him</span>
                  <ArrowForwardIcon className="arrow-icon" />
                </Button>
                <Button
                  onClick={() => navigate(`/product?gender=female`)}
                  className="lato"
                  sx={{
                    backgroundColor: "#b51f29",
                    color: "#ffffff",
                    fontSize: { xs: "18px", sm: "24px" },
                    width: { xs: "250px", sm: "170px" },
                    cursor: "pointer",
                    fontWeight: "bold",
                    margin: "5px",
                    position: "relative",
                    transition: "all 0.5s",
                    "& span": {
                      display: "inline-block",
                      transition: "0.5s",
                      cursor: "pointer",
                    },
                    "& .arrow-icon": {
                      position: "absolute",
                      opacity: 0,
                      top: "50%",
                      right: "-20px",
                      transform: "translateY(-50%)",
                      transition: "0.5s",
                    },
                    "&:hover": {
                      "& span": {
                        paddingRight: "30px",
                      },
                      "& .arrow-icon": {
                        opacity: 1,
                        right: "10px",
                      },
                      backgroundColor: "#b51f29",
                    },
                  }}
                >
                  <span>for her</span>
                  <ArrowForwardIcon className="arrow-icon" />
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
