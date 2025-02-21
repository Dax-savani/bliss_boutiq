import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Container, Grid, Tab, Typography, useTheme} from "@mui/material";
import React, {useState, useEffect} from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../Instance";
import {format, parseISO} from "date-fns";

const OrderHistory = () => {
    const [value, setValue] = useState("1");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get("/api/order");
                const fetchedOrders = response.data;
                setOrders(fetchedOrders);
                console.log("✅ Fetched Orders:", fetchedOrders);

                const hasDeliveredOrder = fetchedOrders.some(order => order.status === "Delivered");
                if (hasDeliveredOrder) {
                    setValue("2");
                }
            } catch (error) {
                console.error("❌ Error fetching orders:", error.response?.data || error.message);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleOrderClick = (order) => {
        navigate(`/order-details/${order._id}`, {state: {order}});
    };

    return (
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
                                mb: 2,
                            }}
                            onClick={() => navigate("/my-account")}
                        >
                            <ChevronLeftIcon/>
                            <Box>Back</Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{width: "100%", typography: "body1"}}>
                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                    <TabList onChange={(e, newValue) => setValue(newValue)}>
                                        <Tab
                                            label="ORDERS"
                                            value="1"
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

                                <TabPanel value="1" sx={{color: theme.palette.textGray}}>
                                    {orders && orders.length > 0 ? (
                                        orders.map((order) => (
                                            <Box
                                                key={order._id}
                                                onClick={() => handleOrderClick(order)}
                                                sx={{
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    flexDirection: {xs: "column", sm: "row"},
                                                    py: 3,
                                                    borderBottom: "1px solid #000",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box sx={{width: {xs: "100px", sm: "120px"}, textAlign: "center"}}>
                                                    <img
                                                        src={order?.color?.product_images?.[0] || "fallback-image.jpg"}
                                                        alt={order?.product_id?.title || "No Image"}
                                                        style={{width: "100%", maxHeight: "100%", objectFit: "cover"}}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        flexDirection: {xs: "column", md: "row"},
                                                        width: "100%",
                                                        px: {xs: 0, sm: 4, md: 8},
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            className="lato"
                                                            sx={{
                                                                color: "#000",
                                                                fontSize: {xs: "16px", sm: "18px", md: "22px"},
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {order?.product_id?.title || "No Name"}
                                                        </Typography>
                                                        <Typography
                                                            className="lato"
                                                            sx={{
                                                                color: "#000",
                                                                mt: 1,
                                                                fontSize: {xs: "14px", sm: "16px", md: "20px"},
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            Status: {order?.status || "Pending"}
                                                        </Typography>
                                                    </Box>
                                                    <Typography
                                                        className="lato"
                                                        sx={{
                                                            color: "#000",
                                                            mt: 1,
                                                            fontSize: {xs: "16px", md: "18px"},
                                                            fontWeight: 500,
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: "10px",
                                                                height: "10px",
                                                                backgroundColor:
                                                                    order?.status === "cancelled"
                                                                        ? "red"
                                                                        : order?.status === "delivered"
                                                                            ? "green"
                                                                            : "orange",
                                                                borderRadius: "50%",
                                                                mr: 1,
                                                            }}
                                                        />
                                                        {order?.status || "Pending"}
                                                        <Typography
                                                            className="lato"
                                                            component="span"
                                                            sx={{
                                                                ml: 1,
                                                                fontWeight: 600,
                                                                fontSize: {xs: "12px", md: "16px"}
                                                            }}
                                                        >
                                                            {order?.createdAt
                                                                ? format(new Date(order.createdAt), "MMMM d, yyyy")
                                                                : "N/A"}
                                                        </Typography>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography
                                            sx={{
                                                textAlign: "center",
                                                color: "#777",
                                                fontSize: "18px",
                                                py: 4,
                                            }}
                                        >
                                            No orders found.
                                        </Typography>
                                    )}
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
};

export default OrderHistory;
