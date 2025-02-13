import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProductListing from "../Home/ProductListing";
import DrawerList from "../../pages/filter/DrawerList";
import SortDropdown from "../../pages/filter/SortDropdown";
import Loader from "../../Loader";

const Product = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>

      {loading ? (<Loader />) : (

        <>
          <Box
            sx={{
              mt: "100px",
              mb: { xs: "20px", sm: "25px", md: "30px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              className="lato"
              sx={{
                fontSize: { xs: "24px", sm: "30px", md: "38px" },
                fontWeight: "900",
                lineHeight: 1,
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Sale: All Menswear
            </Typography>
          </Box>

          {/* Main Content */}
          <Box sx={{ width: "100%", px: { xs: "0px", sm: "30px" } }} >
            {/* Header with Filter Button */}
            <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", mb: 3, }}>
              <Box sx={{ bgcolor: "#FFF", borderRadius: "8px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", p: 0.5, display: "flex", gap: 1, }}>
                <DrawerList />
                <SortDropdown />
              </Box>
            </Box>

            {/* Product Listing */}
            <Box sx={{ width: "100%" }}>
              <ProductListing />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Product;
