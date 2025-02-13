import React, {useState, useEffect} from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
} from "@mui/material";
import axiosInstance from "../../Instance";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const OrderForm = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address_details: {
            city: "",
            country: "",
            address_1: "",
            address_2: "",
            state: "",
            zipcode: "",
        },
    });

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get("/api/user/me");
                const user = response.data.data;

                setFormData({
                    first_name: user.first_name || "",
                    last_name: user.last_name || "",
                    phone_number: user.phone_number || "",
                    email: user.email || "",
                    address_details: {
                        city: user.address_details?.city || "",
                        country: user.address_details?.country || "",
                        address_1: user.address_details?.address_1 || "",
                        address_2: user.address_details?.address_2 || "",
                        state: user.address_details?.state || "",
                        zipcode: user.address_details?.zipcode || "",
                    },
                });
                setUserData(user);
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("Failed to fetch user data.");
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name in formData.address_details) {
            setFormData((prevState) => ({
                ...prevState,
                address_details: {
                    ...prevState.address_details,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevState) => ({...prevState, [name]: value}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addressData = {
                city: formData.address_details.city,
                country: formData.address_details.country,
                address_1: formData.address_details.address_1,
                address_2: formData.address_details.address_2,
                state: formData.address_details.state,
                zipcode: formData.address_details.zipcode,
            };

            const response = await axiosInstance.put(`/api/user/${userData.id}`, addressData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                toast.success(response?.data?.message);
                navigate('/cart');
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
            alert(
                error.response?.data?.message ||
                "An error occurred while updating address. Please try again."
            );
        }
    };


    return (
        <Paper
            sx={{
                maxWidth: 600,
                margin: "20px auto",
                padding: 3,
                borderRadius: 4,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                mt: 11,
            }}
        >
            <Typography variant="h6" gutterBottom>
                User Order Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* First Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    {/* Last Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    {/* Phone Number */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    {/* Email */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email"
                            required
                        />
                    </Grid>
                    {/* Address Line 1 */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address Line 1"
                            name="address_1"
                            value={formData.address_details.address_1}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    {/* Address Line 2 */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address Line 2"
                            name="address_2"
                            value={formData.address_details.address_2}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    {/* City */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={formData.address_details.city}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    {/* State */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            value={formData.address_details.state}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    {/* Country */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            value={formData.address_details.country}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    {/* Zipcode */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Zipcode"
                            name="zipcode"
                            value={formData.address_details.zipcode}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                </Grid>
                <Box sx={{textAlign: "center", mt: 3}}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            borderRadius: 4,
                            bgcolor: "#000",
                            ":hover": {
                                bgcolor: "#000",
                            }
                        }}
                    >
                        Update Information
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default OrderForm;
