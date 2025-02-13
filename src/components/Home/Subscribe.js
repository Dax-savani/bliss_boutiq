import {Box, Button, Container, Typography} from "@mui/material";
import React from "react";
import image from "../../assets/images/Home/Subscribe/1.webp";
import image1 from "../../assets/images/Home/Subscribe/2.webp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useNavigate} from "react-router-dom";

const Subscribe = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{my: {xs: "20px", sm: "30px"}, bgcolor: "#F6F6F6"}}>
            <Box
                sx={{
                    height: "70px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: {xs: "10px", sm: "20px"},
                }}
            >
                <Typography
                    className="lato"
                    sx={{
                        fontSize: {xs: "12px", sm: "14px", md: "16px"},
                        fontWeight: "bold",
                    }}
                >
                    YOU ARE HERE
                </Typography>
                <ArrowForwardIosIcon
                    sx={{
                        color: "#E4E4E4",
                        fontSize: {xs: "30px", sm: "40px", md: "50px"},
                    }}
                />
                <Typography
                    onClick={() => navigate("/product")}
                    sx={{
                        fontSize: {xs: "12px", sm: "14px", md: "16px"},
                        cursor: "pointer",
                    }}
                >
                    Shop
                </Typography>
                <ArrowForwardIosIcon
                    sx={{
                        color: "#E4E4E4",
                        fontSize: {xs: "30px", sm: "40px", md: "50px"},
                    }}
                />
                <Typography sx={{fontSize: {xs: "12px", sm: "14px", md: "16px"}}}>
                    BLISS BOUTIQ
                </Typography>
            </Box>

            <Box>
                <Typography
                    component={"img"}
                    src={image1}
                    sx={{display: {lg: "none", xs: "block"}}}
                ></Typography>
            </Box>

            <Box
                sx={{
                    backgroundImage: `url(${image})`,
                    height: {xs: "0", lg: "286px"},
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: {lg: "flex-end"},
                        alignItems: "center",
                        height: "100%",
                        padding: "0",
                    }}
                >
                    <Box
                        sx={{
                            width: {xs: "100%", lg: "720px"},
                            marginRight: {xs: "0", lg: "50px"},
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: "white",
                                p: {xs: 2, sm: 4},
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                width: "100%",
                                height: {xs: "auto", sm: "240px"},
                                textAlign: {lg: "start", xs: "center"},
                            }}
                        >
                            <Typography
                                sx={{
                                    mb: 2,
                                    fontSize: {xs: "20px", sm: "28px"},
                                    fontWeight: "900",
                                }}
                            >
                                BLISS BOUTIQ Newsletter
                            </Typography>
                            <Typography
                                sx={{
                                    mb: 3,
                                    fontSize: {xs: "14px", sm: "15px"},
                                }}
                            >
                                Get the latest news from the HUGO BOSS Online Store regarding
                                new products, exclusive specials, lifestyle, and fashion trends.
                            </Typography>
                            <Button
                                sx={{
                                    backgroundColor: "#000",
                                    color: "#ffffff",
                                    fontSize: {xs: "10px", sm: "11px"},
                                    height: "50px",
                                    width: "250px",
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
                                            right: "50px",
                                        },
                                        backgroundColor: "#000",
                                    },
                                }}
                            >
                                <span>Subscribe now</span>
                                <ArrowForwardIcon className="arrow-icon"/>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Subscribe;
