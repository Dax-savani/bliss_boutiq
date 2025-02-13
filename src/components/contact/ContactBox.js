import { Box, Container, Grid, Link, Typography } from "@mui/material";
import React from "react";

const ContactBox = () => {
  const contactMethods = [
    {
      title: "Chat",
      description: "Monday - Friday: 9am-9pm ET\nSaturday & Sunday: 9am-5pm ET",
      linkText: "Chat Now",
      linkUrl: "#",
    },
    {
      title: "Email",
      description: "We strive to answer emails within 48 hours",
      linkText: "Contact us here",
      linkUrl: "#",
    },
    {
      title: "Phone",
      description: "Monday - Friday: 9am-9pm ET\nSaturday & Sunday: 9am-5pm ET",
      linkText:
        "Online Inquiries | 866-513-0513\nStore Inquiries | 866-214-6694",
      linkUrl: "#",
    },
  ];
  return (
    <>
      <Box my={5}>
        <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
              {contactMethods.map((method, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      border: "2px solid #d5d5d5",
                      padding: 2,
                      borderRadius: 1,
                      textAlign: "center",
                      height: "100%",
                      transition: "0.4s",
                      "&:hover": {
                        borderColor: "black",
                        transform: "translateY(-10px)"
                      },
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {method.title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {method.description.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </Typography>
                    {method.title !== "Phone" ? (
                      <Link
                        href={method.linkUrl}
                        color="inherit"
                        underline="hover"
                      >
                        {method.linkText}
                      </Link>
                    ) : (
                      <Typography variant="body2">
                        {method.linkText.split("\n").map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ContactBox;
