import React, {useEffect, useState} from "react";
import Header from "./components/global/header/Header";
import {Box, Container, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axiosInstance from "./Instance";

const Megamenus = () => {
    const [categories, setCategories] = useState({male: [], female: [], kids: []});
    const [error, setError] = useState(null);
    const [newSubCategory, setNewSubCategory] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const res = await axiosInstance.get("/api/category/subcategory/list");
            setNewSubCategory(res.data.data);
            setError(null);

            const response = await axiosInstance.get("/api/category/gender-wise");
            if (response.data && response.data.data) {
                const male = response.data.data.find(item => item.gender === "male")?.categories || [];
                const female = response.data.data.find(item => item.gender === "female")?.categories || [];
                const kids = response.data.data.find(item => item.gender === "kids")?.categories || [];
                setCategories({male, female, kids});
                setError(null);
            } else {
                setError("Unexpected response format");
            }
        } catch (err) {
            setError("Error fetching categories");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

  const fullMegamenu2 = (
    <Container maxWidth={"xl"}>
      <Box
        sx={{
          py: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {newSubCategory.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {newSubCategory.map((category) => (
              <Box
                key={category._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  my: 4,
                  mx: 5
                }}
              >
                {/* Category Name */}
                <Typography
                  sx={{
                    fontWeight: "700",
                    color: "black",
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {category.categoryName}
                </Typography>

                {/* Category Image */}
                <Box>
                  {category.subcategories.slice(0, 5).map((subcategory) => (
                    <Box
                      key={subcategory._id}
                      sx={{
                        textAlign: "center",
                        cursor: "pointer", py: 0.5
                      }}
                      onClick={() => navigate(`/product?subcategoryId=${subcategory._id}`)}
                    >
                      <Typography
                        sx={{
                          fontWeight: "500",
                          color: "black",
                          mt: '10px',
                          fontSize:'15px'
                        }}
                      >
                        {subcategory.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    width: "250px",
                    margin: "0 auto",
                  }}
                >
                  <img
                    src={category.categoryImage}
                    alt={category.name}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Grid>
        ) : (
          <Typography>No categories available</Typography>
        )}
      </Box>
    </Container >
  );

    const renderMegamenu = (categoryList, gender) => (
        <Container maxWidth={"xl"}>
            <Grid container columnSpacing={4} justifyContent={"center"} sx={{py: {sm: "40px", xs: "15px"}}}>
                {categoryList.map((item, index) => (
                    <Grid item xl={2} xs={12} key={index} sx={{display: "flex"}}>
                        <Box>
                            <Typography
                                onClick={() => navigate(`/product?categoryId=${item._id}&&gender=${gender}`)}
                                sx={{
                                    fontWeight: "900",
                                    color: "black",
                                    textTransform: "uppercase",
                                }}
                                className="fs-14 lato"
                            >
                                {item.name}
                            </Typography>
                            <Box
                                sx={{
                                    fontWeight: "500",
                                    color: "black",
                                    mt: {xl: "20px", xs: "10px"},
                                }}
                                className="fs-14"
                            >
                                {Array.isArray(item.subcategories) && item.subcategories.length > 0 ? (
                                    item.subcategories.map((subcategory, subIndex) => (
                                        <Typography
                                            onClick={() => navigate(`/product?subcategoryId=${subcategory._id}&&gender=${gender}`)}
                                            key={subIndex}
                                            sx={{
                                                fontWeight: "500",
                                                color: "black",
                                                mt: {xl: "20px", xs: "10px"},
                                            }}
                                            className="fs-14"
                                        >
                                            {subcategory.name}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography>No subcategories available</Typography>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

    return (
        <div>
            <Header
                fullMegamenu2={fullMegamenu2}
                fullMegamenu3={renderMegamenu(categories.male, 'male')}
                fullMegamenu4={renderMegamenu(categories.female, 'female')}
                fullMegamenu5={renderMegamenu(categories.kids, 'kids')}
            />
        </div>
    );
};

export default Megamenus;
