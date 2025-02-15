import React, {useState} from "react";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Grid,
    IconButton,
    Typography,
    FormHelperText,
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../Instance";
import toast, {Toaster} from "react-hot-toast";

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues: {
            user_name: "",
            first_name: "",
            last_name: "",
            dob: "",
            phone_number: "",
            email: "",
            password: "",
            gender: "",
        },
        validationSchema: Yup.object({
            user_name: Yup.string().required("Username is required"),
            first_name: Yup.string().required("First Name is required"),
            last_name: Yup.string().required("Last Name is required"),
            dob: Yup.date().required("Date of Birth is required").nullable(),
            phone_number: Yup.string()
                .matches(/^\d{10}$/, "Invalid phone number")
                .required("Phone number is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z]).{8,}$/,
                    "Password must include at least 8 characters, an uppercase letter, and a special character"
                )
                .required("Password is required"),
            gender: Yup.string().required("Gender is required"),
        }),
        onSubmit: async (values) => {
            console.log("Form values being submitted:", values);

            axiosInstance.post("/api/user/register", values)
                .then((response) => {
                    toast.success('Account created successfully!')
                })
                .catch((err) => {
                    console.error("Error response:");
                    toast.error('Error occurred: ', err.response?.data || err.message)
                });

        },
    });

    return (
        <Box>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Box py={2} sx={{px: {sm: "55px", xs: "20px"}}}>
                <Typography
                    variant="h4"
                    py={1}
                    mt={3}
                    sx={{fontSize: {xs: "28px", md: "32px"}, fontWeight: "900"}}
                >
                    CREATE ACCOUNT
                </Typography>
                <Box my={3}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="User Name"
                                    name="user_name"
                                    value={formik.values.user_name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                                    helperText={formik.touched.user_name && formik.errors.user_name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                    helperText={formik.touched.first_name && formik.errors.first_name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="last_name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                    helperText={formik.touched.last_name && formik.errors.last_name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Date of Birth"
                                    name="dob"
                                    type="date"
                                    value={formik.values.dob}
                                    onChange={formik.handleChange}
                                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                                    helperText={formik.touched.dob && formik.errors.dob}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone_number"
                                    value={formik.values.phone_number}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl
                                    fullWidth
                                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                                >
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                    {formik.touched.gender && formik.errors.gender && (
                                        <FormHelperText>{formik.errors.gender}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{position: "relative"}}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        sx={{position: "absolute", right: 10, top: 10}}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        textTransform: "unset",
                                        border: "1px solid black",
                                        padding: {
                                            xs: "12px 30px",
                                            sm: "12px 60px",
                                            md: "12px 88px",
                                        },
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
                                    Create Account
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default RegisterForm;
