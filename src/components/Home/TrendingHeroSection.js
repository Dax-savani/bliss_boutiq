import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import trending1 from "../../assets/images/Home/trendingHeroSection/trending1.png";
import restrending1 from "../../assets/images/Home/resTrending/restrending1.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const TrendingHeroSection = ({
  img,
  resImg,
  title,
  heading,
  btnText,
  align,
  textColor,
}) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: {
            sm: `url(${img})`,
            xs: `url(${resImg})`,
          },
          backgroundPosition: { md: "center" },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: { sm: align, xs: "center" } }}>
            <Box sx={{ color: textColor }} className="lato">
              <Box
                sx={{
                  fontWeight: "900",
                  fontSize: { md: "23px" },
                  letterSpacing: "1.3px",
                }}
              >
                {title}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { sm: align, xs: "center" },
                  mb: "40px",
                }}
              >
                <Typography
                  className="lato"
                  sx={{
                    fontSize: {
                      md: "80px",
                      sm: "50px",
                      xs: "40px",
                    },
                    marginTop: "10px",
                    fontWeight: "900",
                    width: { md: "700px", xs: "100%" },
                    lineHeight: "1.2",
                  }}
                  component={"div"}
                >
                  {heading}
                </Typography>
              </Box>
              <Button
                onClick={() => navigate(`/product?gender=male`)}
                sx={{
                  backgroundColor: "#000",
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
                    backgroundColor: "#000",
                  },
                }}
              >
                <span>for him</span>
                <ArrowForwardIcon className="arrow-icon" />
              </Button>
              <Button
                onClick={() => navigate(`/product?gender=female`)}
                sx={{
                  backgroundColor: "#000",
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
                    backgroundColor: "#000",
                  },
                }}
              >
                <span>for him</span>
                <ArrowForwardIcon className="arrow-icon" />
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default TrendingHeroSection;
