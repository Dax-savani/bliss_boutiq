import React from 'react'
import { Box, Container, Grid, useTheme } from '@mui/material'
import category1 from '../../assets/images/Home/category/category1.png';
import category2 from '../../assets/images/Home/category/category2.png';
import category3 from '../../assets/images/Home/category/category3.png';
import category4 from '../../assets/images/Home/category/category4.png';
import category5 from '../../assets/images/Home/category/category5.png';
import category6 from '../../assets/images/Home/category/category6.png';

const Category = () => {
  const theme = useTheme()
    const categories = [
        {img: category1,title: "SUMMER STORE"},
        {img: category2,title: "MEN"},
        {img: category3,title: "WOMEN"},
        {img: category4,title: "BOYS"},
        {img: category5,title: "GIRLS"},
        {img: category6,title: "GIFT  CARD"},
    ]
  return (
    <>
      <Box>
        <Container maxWidth="xl">
          <Box sx={{ padding: "50px 0" }}>
          <Box
            sx={{
              fontSize: { xs: "45px", md: "54px" },
              my: { xs: "60px", sm: "40px" },
            }}
            fontWeight={"800"}
            className="lato"
          >
            CATEGORY
          </Box>
            <Grid container>
              {categories.map((item, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  lg={2}
                  md={4}
                  sm={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    my: "25px",
                  }}
                >
                  <Box sx={{ width: { xs: "230px", lg: "220px" } }}>
                    <img
                      src={item.img}
                      alt={item.img}
                      style={{ borderRadius: "50%" }}
                    />
                  </Box>
                  <Box
                    className="lato"
                    sx={{
                      mt: "14px",
                      fontWeight: "600",
                      color: theme.palette.black,
                      fontSize: "18px",
                    }}
                  >
                    {item.title}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Category