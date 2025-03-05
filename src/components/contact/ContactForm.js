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
  useTheme,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../Instance";

const ContactForm = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      salutation: "Mr.",
      firstName: "",
      lastName: "",
      message: "",
      phoneNumber: "",
      email: "",
      // password: "",
    },

    validationSchema: Yup.object({
      salutation: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .matches(/^\+?\d{10,}$/, "Invalid phone number")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      // password: Yup.string()
      //   .min(8, "Password must be at least 8 characters")
      //   .required("Required"),
    }),

    onSubmit: async (values, actions) => {
      setApiError(null);
      setApiSuccess(null);
      try {
        const response = await axiosInstance.post("/api/contact",
          values
        );
        setApiSuccess("Form submitted successfully!");
        actions.resetForm();
      } catch (error) {
        setApiError(
          error.response?.data?.message || "Failed to submit the form."
        );
      }
    },
  });

  return (
    <Box my={"70px"}>
      <Container maxWidth="md">
        <Box p={2}>
          <Typography fontWeight={500} sx={{ fontSize: { xs: "12px", md: "18px" } }}>
            Please tell us more about your inquiry using the form below and click to submit your information.
          </Typography>
          <Box my={3}>
            {apiError && <Typography color="error">{apiError}</Typography>}
            {apiSuccess && <Typography color="success.main">{apiSuccess}</Typography>}

            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First Name *"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last Name *"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email *"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                {/* Phone Fields */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number *"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  />
                </Grid>

                 {/* Message Fields */}
                 <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message *"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </Grid>

                {/* <Grid item xs={12}>
                  <Box sx={{ position: "relative" }}>
                    <TextField
                      fullWidth
                      label="Password *"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                    <IconButton
                      onClick={handleClickShowPassword}
                      sx={{ position: "absolute", right: 10, top: 10 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Box>
                </Grid> */}

                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
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
                    SUBMIT
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;
