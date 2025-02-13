import React from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";
import Login_form from "../login-form/Login_form";
import Register_form from "../Registration_form/Register_form";
import ActivateForm from "../activate_form/Activate_form";
import Login_form2 from "../login-form/Login_form2";

const Form = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mt: "150px" }}>
      <Container maxWidth="md">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              fontWeight: "700",
              textTransform: "none",
              "&:hover": {
                textDecorationColor: "black",
                color: "#000",
              },
            },
            "& .Mui-selected": {
              textDecorationColor: "black",
              color: "#000",
              borderBottom: "4px solid #000",
            },
            padding: { sm: "0 50px" },
          }}
        >
          <Tab
            label="LOG IN"
            sx={{ color: "#000 !important", fontSize: "12px" }}
          />
          <Tab
            label="REGISTER"
            sx={{ color: "#000 !important", fontSize: "12px" }}
          />
          <Tab
            label="ACTIVATE"
            sx={{ color: "#000 !important", fontSize: "12px" }}
          />
        </Tabs>
        <Box
          sx={{
            border: "1px solid #ccc",
          }}
        >
          {activeTab === 0 && (
            <>
              <Login_form2 />
            </>
          )}
          {activeTab === 1 && (
            <>
              <Register_form />
            </>
          )}
          {activeTab === 2 && (
            <>
              <ActivateForm />
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Form;
