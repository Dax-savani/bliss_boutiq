import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../Instance";

const Login_form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const [profileData, setProfileData] = useRecoilState(profile);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const notify = () => toast.success("account created successfully 😃");
  const notifyError = (message) => toast.error(message);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .required("Enter a valid email"),
      password: Yup.string().required("Enter a valid password"),
    }),

    onSubmit: (values, actions) => {
      axiosInstance
        .post("/api/login", values)
        .then((response) => {
          console.log(response);
          setProfileData(response.data.data);
          actions.resetForm();
          navigate("/cart");
          if (response.data.email) {
            notify();
          }
        })
        .catch((error) => {
          const status = error.response ? error.response.status : 500;
          switch (status) {
            case 400:
              notifyError("Bad request. Please check your input.");
              break;
            case 401:
              notifyError("Unauthorized. Please check your credentials.");
              break;
            case 403:
              notifyError(
                "Forbidden. You don't have permission to perform this action."
              );
              break;
            case 404:
              notifyError(
                "Not found. The requested resource could not be found."
              );
              break;
            case 500:
              notifyError("Internal server error. Please try again later.");
              break;
            default:
              notifyError("An unknown error occurred. Please try again.");
              break;
          }
        });
    },
  });
  return (
    <Box>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid
          item
          md={12}
          sx={{
            width: "100%",
            padding: "24px 54px"
          }}
        >
          <Box textAlign={"center"}>
            <Typography
              className="lato"
              sx={{
                padding: { xs: "36px 0px", md: "56px 0px" },
                fontSize: { xs: "38px", md: "52px" },
                borderBottom: "1px solid #CCCCCC",
                fontWeight: "900",
              }}
            >
              MY ACCOUNT
            </Typography>
          </Box>
          <Grid container my={3} spacing={5}>
            <Grid item xs={12} md={6}>
              <Box
                bgcolor={theme.palette.liteGrayBack}
                sx={{
                  padding: { xs: "10px 25px", md: "10px 45px" },
                  height: "100%",
                }}
              >
                <Box>
                  <Typography
                    className="lato"
                    sx={{
                      fontSize: { xs: "24px", md: "32px" },
                      fontWeight: "800",
                      margin: "26px 0px ",
                    }}
                  >
                    LOGIN
                  </Typography>
                </Box>
                <Box sx={{ margin: "14px 0px" }}>
                  <Typography
                    component="p"
                    sx={{ fontSize: "14px", padding: "14px 0px" }}
                  >
                    Please enter your e-mail address and password.
                  </Typography>
                </Box>
                <Box>
                  <form
                    onSubmit={formik.handleSubmit}
                    onReset={formik.handleReset}
                  >
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
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.email &&
                              Boolean(formik.errors.email)
                            }
                            helperText={
                              formik.touched.email && formik.errors.email
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ position: "relative" }}>
                            <TextField
                              fullWidth
                              label="Password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                              }
                              helperText={
                                formik.touched.password &&
                                formik.errors.password
                              }
                            />
                            <IconButton
                              onClick={handleClickShowPassword}
                              sx={{ position: "absolute", right: 10, top: 10 }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" justifyContent="end" my={3}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{
                                textTransform: "unset",
                                border: "1px solid black",
                                padding: "12px 88px",
                                fontSize: "16px",
                                fontWeight: "500",
                                borderRadius: "0px",
                                backgroundColor: "#000000",
                                color: theme.palette.common.white,
                                "&:hover": {
                                  backgroundColor: "#FFFFFF",
                                  color: theme.palette.common.black,
                                },
                              }}
                            >
                              Login
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </form>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                bgcolor={theme.palette.common.black}
                color={theme.palette.common.white}
                sx={{
                  padding: { xs: "10px 25px", md: "10px 45px" },
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    margin: "26px 0px ",
                    fontSize: { xs: "24px", md: "32px" },
                    fontWeight: "700",
                  }}
                  gutterBottom
                >
                  Create an Account
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ fontSize: "18px", fontWeight: "500" }}
                >
                  Create an account to enjoy all the benefits of our registered
                  customers.
                </Typography>
                <Box
                  sx={{
                    textAlign: "left",
                    margin: "0 auto 100px auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <FavoriteIcon sx={{ marginRight: "8px" }} />
                    <Typography>Save your favourites across devices</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <AccessTimeIcon sx={{ marginRight: "8px" }} />
                    <Typography>
                      Save time at checkout for future orders
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <HistoryIcon sx={{ marginRight: "8px" }} />
                    <Typography>
                      Manage your purchases and returns in your order history
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <StarIcon sx={{ marginRight: "8px" }} />
                    <Typography>
                      Become a{" "}
                      <Typography
                        variant="span"
                        underline="hover"
                        color="inherit"
                        sx={{ fontWeight: "bold" }}
                      >
                        HUGO BOSS EXPERIENCE
                      </Typography>{" "}
                      member to profit from special offers
                    </Typography>
                  </Box>
                </Box>
                <Box my={3}>
                  <Button
                    type="submit"
                    sx={{
                      width: "100%",
                      textTransform: "unset",
                      border: "1px solid black",
                      padding: "12px 88px",
                      fontSize: "16px",
                      fontWeight: "500",
                      borderRadius: "0px",
                      backgroundColor: "#ffffff",
                      color: theme.palette.common.black,
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        color: theme.palette.common.black,
                      },
                    }}
                    onClick={() => navigate("/register")}
                  >
                    REGISTER NOW
                  </Button>
                </Box>
                <Box
                  sx={{ marginTop: "1rem" }}
                  display={"flex"}
                  justifyContent={"end"}
                >
                  <Typography
                    href="#"
                    underline="hover"
                    color={theme.palette.common.white}
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    I registered in a store and want to activate my account
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login_form;
