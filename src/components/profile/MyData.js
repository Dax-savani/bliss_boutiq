import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Tab,
    useTheme,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import EditIcon from "@mui/icons-material/Edit";
import diamond from "../../assets/images/profile/mydata/diamond.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Register_form from "../../pages/Registration_form/Register_form";
import axiosInstance from "../../Instance";
import MyWishlist from "./MyWishlist";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import Loader from "../../Loader";
import OrderHistory from "./OrderHistory";

const MyData = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [address, setAddress] = useState(false);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState("1");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from the API using Axios
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.get("/api/user/me", {
                headers: {
                    token: token,
                },
            });
            setUserData(response.data.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddress = async () => {
        try {
            const response = await axiosInstance.get(`/api/user/me`);
            const userAddress = response.data.data.address_details;

            formik.setValues({
                address_1: userAddress?.address_1 || "",
                address_2: userAddress?.address_2 || "",
                zipcode: userAddress?.zipcode || "",
                city: userAddress?.city || "",
                country: userAddress?.country || "",
                state: userAddress?.state || "",
            });
        } catch (error) {
            console.error("Error fetching user address:", error);
        }
    };


    useEffect(() => {
        fetchUserData();
        fetchAddress()
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formik = useFormik({
        initialValues: {
            address_1: "",
            address_2: "",
            zipcode: "",
            city: "",
            country: "",
            state: "",
        },
        validationSchema: Yup.object({
            address_1: Yup.string().required("Street is required"),
            city: Yup.string().required("City is required"),
            country: Yup.string().required("Country is required"),
        }),
        onSubmit: async (values) => {
            // Filter out empty values
            const filteredValues = Object.fromEntries(
                Object.entries(values).filter(([_, value]) => value.trim() !== "")
            );

            console.log("Filtered data being sent:", filteredValues);

            try {
                const response = await axiosInstance.put(
                    `/api/user/${userData.id}`,
                    filteredValues,
                    { headers: { "Content-Type": "application/json" } }
                );
                console.log("API Response:", response.data);
                window.location.reload();
            } catch (error) {
                console.error("API Error:", error.response || error.message);
                // Handle error (e.g., show error toast)
            }
        },
    });

    const myData = (
        <Grid container>
            <Grid item xs={12} md={6} mt={{ xs: "0px", md: "0px" }}>
                <Box
                    sx={{
                        padding: { xl: "50px 50px", xs: "15px 25px" },
                        height: "340px",
                        backgroundColor: theme.palette.liteGrayBack,
                        marginInline: { xl: "50px", md: "20px" },
                    }}
                >
                    <Box className="lato" sx={{ fontWeight: "900", mb: "30px" }}>
                        MY DATA
                    </Box>
                    <Box sx={{ my: "15px" }}>
                        <Box mb={"10px"}>{userData?.first_name}</Box>
                        <Box mb={"10px"}>Number : {userData?.phone_number}</Box>
                        <Box mb={"10px"}>{userData?.dob ? new Date(userData.dob).toLocaleDateString("en-GB") : "N/A"}</Box>
                        <Box mb={"10px"}>{userData?.email}</Box>
                        <Box mb={"10px"}>Password:********</Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        {userData?.address_details ? (
                            <>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    Address:
                                </Typography>
                                <Typography variant="body2">
                                    {/* Conditionally join available address fields */}
                                    {[
                                        userData.address_details.address_1,
                                        userData.address_details.address_2,
                                        userData.address_details.city,
                                        userData.address_details.state,
                                        userData.address_details.country,
                                        userData.address_details.zipcode
                                    ]
                                        .filter(Boolean) // Remove any empty values
                                        .join(', ') || 'Address not available'}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
                                Address not available
                            </Typography>
                        )}

                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} mt={{ xs: "50px", md: "0px" }}>
                <Box
                    sx={{
                        padding: { xl: "30px 50px", xs: "15px 25px" },
                        height: "340px",
                        backgroundColor: theme.palette.liteGrayBack,
                        marginInline: { xl: "50px", md: "20px" },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ mx: "auto" }}>
                        <img
                            src={diamond}
                            alt="diamond"
                            style={{ height: "100px", width: "100px" }}
                        />
                    </Box>
                    <Box sx={{ mt: "30px" }}>
                        Congratulations! You are a BLISS BOUTIQ EXPERIENCE member and can
                        benefit from our exclusive services.
                    </Box>
                    {/* <Box
                        sx={{
                            mt: "30px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                    >
                        <ArrowForwardIosIcon
                            sx={{ fontSize: { xs: "16px", md: "unset" } }}
                        />
                        Discover more
                    </Box> */}
                </Box>
            </Grid>
            <Grid xs={12}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.liteGrayBack,
                        margin: { xs: "50px 0", xl: "50px" },
                    }}
                >
                    <Box sx={{ padding: "30px 0" }}>
                        <Box sx={{ padding: "0  50px" }}>
                            <Box
                                className="lato"
                                sx={{ fontSize: "18px", fontWeight: "900" }}
                            >
                                INVOICE ADDRESS
                            </Box>
                            <Box sx={{ mt: "15px", pb: "50px" }}>
                                Here you can change your current addresses or add new ones.
                            </Box>
                        </Box>
                        <hr style={{ borderColor: "rgb(0 0 0 / 3%)" }} />
                        <Box
                            sx={{
                                mt: "35px",
                                fontSize: "17px",
                                fontWeight: "900",
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => setAddress(true)}
                            className="lato"
                        >
                            {userData?.address_details ? (
                                <Box>
                                    + Update ADDRESS
                                </Box>
                            ) : (
                                <Box>
                                    + ADD ADDRESS
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );

    const orderHistory = (
        <OrderHistory />
    );

    const myWishlist = (
        <MyWishlist />
    );

    const myDataAddress = (
        <Box>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "700" }} className="lato">
                Add Address
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Please complete all fields marked with an *.
            </Typography>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <FormControl
                    sx={{
                        width: "100% !important",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#99999",
                                borderRadius: "unset",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#000",
                            },
                        },
                        "& label.Mui-focused": {
                            color: "#000",
                            fontSize: "16px",
                            fontWeight: "500",
                            backgroundColor: "white",
                        },
                        "& label": {
                            color: "#000000, opacity 45.0%",
                            fontSize: "16px",
                            fontWeight: "500",
                            padding: "0 5px",
                        },
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="* Street"
                                name="address_1"
                                value={formik.values.address_1}
                                onChange={formik.handleChange}
                                error={formik.touched.address_1 && Boolean(formik.errors.address_1)}
                                helperText={formik.touched.address_1 && formik.errors.address_1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Additional Address Details"
                                name="address_2"
                                value={formik.values.address_2}
                                onChange={formik.handleChange}
                                error={formik.touched.address_2 && Boolean(formik.errors.address_2)}
                                helperText={formik.touched.address_2 && formik.errors.address_2}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Postcode"
                                name="zipcode"
                                value={formik.values.zipcode}
                                onChange={formik.handleChange}
                                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                                helperText={formik.touched.zipcode && formik.errors.zipcode}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                label="* City"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                helperText={formik.touched.country && formik.errors.country}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Button
                                type="reset"
                                variant="contained"
                                className="lato"
                                sx={{
                                    textTransform: "unset",
                                    border: "unset",
                                    padding: "12px 48px",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    borderRadius: "0px",
                                    width: { xs: "100%", md: "unset" },
                                    backgroundColor: theme.palette.liteGrayBack,
                                    color: theme.palette.black,
                                    "&:hover": {
                                        backgroundColor: theme.palette.liteGrayBack,
                                        color: theme.palette.common.black,
                                    },
                                }}
                            >
                                CANCEL
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                className="lato"
                                sx={{
                                    width: { xs: "100%", md: "unset" },
                                    textTransform: "unset",
                                    border: "1px solid black",
                                    padding: "12px 48px",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    borderRadius: "0px",
                                    backgroundColor: "#000000",
                                    color: theme.palette.common.white,
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "#FFFFFF",
                                        color: theme.palette.common.black,
                                    },
                                }}
                            >
                                SAVE
                            </Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </form>
        </Box>
    );

    const editForm = (<Register_form edit={true} />)

    const offer = <Box>this page is not created</Box>;

    const [profileData, setProfileData] = useRecoilState(profile);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setProfileData(null);
        navigate("/profile");
    };

    const leftSide = [
        { name: "OVERVIEW", icon: null },
        {
            name: "MY DATA",
            icon: <PersonOutlineIcon />,
            description: "Personal data, address and payment methods",
            onclk: myData,
        },
        {
            name: "ORDER HISTORY",
            icon: <WorkHistoryOutlinedIcon />,
            onclk: orderHistory,
            description: "Review your past orders",
        },
        {
            name: "MY WISHLIST",
            icon: <FavoriteBorderOutlinedIcon />,
            onclk: myWishlist,
            description: "Save your favorite items",
        },
        {
            name: "LOG OUT",
            icon: <LogoutIcon />,
            onclk: handleLogout,
        },
    ];

    {/* {
            name: "OFFERS AND PROMOCODES",
            icon: <CardGiftcardOutlinedIcon />,
            description: "Join our loyalty program to receive discounts",
            onclk: offer,
        }, */}

    const [rightSide, setRightSide] = useState(myData);
    const [header, setHeader] = useState({
        name: "MY DATA",
        icon: <PersonOutlineIcon />,
        description: "Personal data, address and payment methods",
    });

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Box pt={"130px"}>
                <Box bgcolor={theme.palette.liteGrayBack}>
                    <Container maxWidth="xl">
                        <Grid container>
                            <Grid item xs={12}>
                                <Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: { xs: "column", sm: "unset" },
                                            py: { xs: "30px", sm: "unset" },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                height: "170px",
                                                width: "170px",
                                                borderRadius: "50%",
                                                backgroundColor: "white",
                                                outline: "6px solid white",
                                                transition: ".4s",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                boxShadow:
                                                    "0 2px 4px 0 rgba(0, 0, 0, .2), 0 5px 13px 0 rgba(0, 0, 0, .19)",
                                                "&:hover": { backgroundColor: "#CCCCCC" },
                                                fontSize: "90px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    "& > .MuiSvgIcon-root": {
                                                        fontSize: "70px !important",
                                                    },
                                                }}
                                            >
                                                {header.icon}
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                marginLeft: { sm: "80px" },
                                                mt: { xs: "20px", sm: "unset" },
                                            }}
                                        >
                                            <Box
                                                className="lato"
                                                sx={{
                                                    fontWeight: "900",
                                                    width: "100%",
                                                    fontSize: { xs: "30px", sm: "40px" },
                                                }}
                                            >
                                                {header.name}
                                            </Box>
                                            <Box
                                                sx={{
                                                    color: theme.palette.black,
                                                    mt: "10px",
                                                    width: "250px",
                                                }}
                                            >
                                                {header.description}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                <Box mt="30px">
                    <Container maxWidth="xl">
                        <Grid container>
                            <Grid
                                item
                                lg={4}
                                xs={12}
                                sx={{
                                    mb: { md: "50px", lg: "unset" },
                                    height: "350px",
                                }}
                            >
                                <Grid container height={"100%"}>
                                    <Grid item xs={12} md={6} lg={12} width={"100%"}>
                                        {leftSide.map((item, index) => (
                                            <Box
                                                key={index}
                                                {...(item.name === "OVERVIEW"
                                                    ? { onClick: () => navigate("/my-account") }
                                                    : {
                                                        onClick: () => {
                                                            setRightSide(item.onclk);
                                                            setHeader(item);
                                                            setAddress(false);
                                                            setEdit(false)
                                                        },
                                                    })}
                                                sx={{
                                                    color: theme.palette.black,
                                                    fontSize: "17px",
                                                    fontWeight: "600",
                                                    borderBottom: "1px solid #CCCCCC",
                                                    marginRight: { lg: "50px", sm: "20px" },
                                                    padding: "11px 10px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    transition: ".3s",
                                                    "&:hover": {
                                                        backgroundColor: "#CCCCCC",
                                                    },
                                                }}
                                                className="lato"
                                            >
                                                <Box>{item.name}</Box>
                                                <Box>{item.icon}</Box>
                                            </Box>
                                        ))}
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        lg={0}
                                        sx={{
                                            display: { lg: "none", md: "unset", xs: "none" },
                                            height: "100%",
                                            width: "100%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                height: "100%",
                                                backgroundColor: theme.palette.black,
                                                color: theme.palette.textLightGray,
                                                padding: "35px 30px",
                                            }}
                                        >
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Iure error pariatur possimus similique quo eligendi
                                            ratione quam cumque tempore suscipit nam ducimus
                                            doloremque voluptas sint obcaecati, eum, excepturi facere
                                            alias ea. Quis, vel in officiis esse, eum culpa cum illum
                                            doloremque molestiae nam eaque ratione! Nemo esse repellat
                                            commodi reprehenderit.
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item lg={8} xs={12}>
                                {address ? (
                                    myDataAddress
                                ) : edit ? (editForm) : (
                                    <>
                                        {header.name === "MY DATA" && myData}
                                        {header.name === "ORDER HISTORY" && orderHistory}
                                        {header.name === "MY WISHLIST" && myWishlist}
                                        {header.name === "OFFERS AND PROMOCODES" && offer}
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    );
};
export default MyData;
