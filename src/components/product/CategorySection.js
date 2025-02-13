import React, {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import axiosInstance from "../../Instance";
import {useLocation, useNavigate} from "react-router-dom";

const CategorySection = ({onCategorySelect}) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const path = useLocation();

    const queryParams = new URLSearchParams(path.search);
    const subCategoryId = queryParams.get('categoryId');

    const genderParams = new URLSearchParams(path.search);
    const genderId = genderParams.get('gender');

    const getCategories = async () => {
        axiosInstance
            .get("/api/category")
            .then((response) => {
                if (response.data && Array.isArray(response.data.data)) {
                    setCategories(response.data.data);
                } else {
                    setError("Unexpected response format");
                }
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching categories");
                console.error(error);
                setLoading(false);
            });
    }

    const getSubCategories = async () => {
        try {
            const response = await axiosInstance.get("/api/category/subcategory/list");

            if (response.data && Array.isArray(response.data.data)) {
                const subcategoriesData = response.data.data;

                const ids = subcategoriesData.map(product => product._id);

                if (ids.includes(subCategoryId)) {
                    const matchingSubcategory = subcategoriesData.find(sub => sub._id === subCategoryId);
                    setSubcategories(matchingSubcategory.subcategories);
                } else {
                    console.log("No matching subcategory found for the given subCategoryId");
                }
            } else {
                setError("Unexpected response format");
            }
        } catch (error) {
            setError("Error fetching categories");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
        getSubCategories()
    }, [path.search]);

    return (
        <Box sx={{bgcolor: "#f9f9f9", py: 4}}>
            {
                subcategories.length ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "50px",
                            alignItems: "center",
                            width: "100%",
                            flexWrap: "wrap"
                        }}
                    >
                        {subcategories &&
                            subcategories.map((category) => (
                                <Box
                                    key={category._id}
                                    // onClick={() => navigate(`/product?subcategoryId=${category._id}&&gender=${genderId}`)}
                                    onClick={() => {
                                        let url = `/product?subcategoryId=${category._id}`;
                                        if (genderId) {
                                            url += `&gender=${genderId}`;
                                        }
                                        navigate(url);
                                    }}
                                    sx={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                        maxWidth: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        component={"img"}
                                        src={category.image}
                                        alt={category.name}
                                        sx={{
                                            width: {xs: 60, sm: 80},
                                            height: {xs: 60, sm: 80},
                                            margin: "0 auto",
                                            bgcolor: "#fff",
                                            border: "1px solid #ddd",
                                            borderRadius: "50%",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontWeight: "500",
                                            fontSize: {xs: "12px", sm: "14px"},
                                            color: "#666",
                                        }}
                                    >
                                        {category.name}
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "50px",
                            alignItems: "center",
                            width: "100%",
                            flexWrap: "wrap"
                        }}
                    >
                        {categories &&
                            categories.map((category) => (
                                <Box
                                    key={category._id}
                                    onClick={() => navigate(`/product?categoryId=${category._id}&&gender=${genderId}`)}
                                    sx={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                        maxWidth: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        component={"img"}
                                        src={category.image}
                                        alt={category.name}
                                        sx={{
                                            width: {xs: 60, sm: 80},
                                            height: {xs: 60, sm: 80},
                                            margin: "0 auto",
                                            bgcolor: "#fff",
                                            border: "1px solid #ddd",
                                            borderRadius: "50%",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontWeight: "500",
                                            fontSize: {xs: "12px", sm: "14px"},
                                            color: "#666",
                                        }}
                                    >
                                        {category.name}
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                )
            }
        </Box>
    );
};

export default CategorySection;
