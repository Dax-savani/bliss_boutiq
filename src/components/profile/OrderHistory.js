import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Grid, Tab, useTheme } from "@mui/material";
import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
const OrderHistory = () => {
    const [value, setValue] = useState("1");
    const theme = useTheme()
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box mt="100px">
                <Container maxWidth="xl">
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
                        <Grid item xs={12}>
                            <Box sx={{ width: "100%", typography: "body1" }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                        <TabList
                                            onChange={handleChange}
                                            aria-label="lab API tabs example"
                                        >
                                            <Tab
                                                label="ONLINE"
                                                value="1"
                                                className="lato"
                                                sx={{
                                                    color: theme.palette.black,
                                                    backgroundColor: theme.palette.liteGrayBack,
                                                    fontWeight: "900",
                                                    "&.Mui-selected": {
                                                        color: theme.palette.liteGrayBack,
                                                        backgroundColor: theme.palette.black,
                                                    },
                                                }}
                                            />
                                            <Tab
                                                label="RETAIL"
                                                value="2"
                                                className="lato"
                                                sx={{
                                                    color: theme.palette.black,
                                                    backgroundColor: theme.palette.liteGrayBack,
                                                    fontWeight: "900",
                                                    "&.Mui-selected": {
                                                        color: theme.palette.liteGrayBack,
                                                        backgroundColor: theme.palette.black,
                                                    },
                                                }}
                                            />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1" sx={{ color: theme.palette.textGray }}>
                                        Item One
                                    </TabPanel>
                                    <TabPanel value="2" sx={{ color: theme.palette.textGray }}>
                                        Item Two
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default OrderHistory;
