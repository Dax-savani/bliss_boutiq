import React, {useEffect, useState} from "react";
import {Box, CircularProgress, Container, Typography, useTheme} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../Instance";

const HandPickedForYou = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [products, setProducts] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loader, setLoader] = useState(false);

    const categories = ["male", "female", "kids"];
    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            let productData = {};
            let filteredCategories = [];
            setLoader(true);

            for (let category of categories) {
                try {
                    const response = await axiosInstance.get(
                        `/api/product?gender=${category}`
                    );
                    if (response.data.data.length > 0) {
                        productData[category] = response.data.data;
                        filteredCategories.push(category);
                    }
                } catch (error) {
                    console.error(`Error fetching ${category} products:`, error);
                }
            }

            setProducts(productData);
            setAvailableCategories(filteredCategories);
            setSelectedCategory(filteredCategories[0] || ""); // Set first available category
            setLoader(false);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Box sx={{mt: "70px", height: {md: "670px", xs: "480px"}}}>
                <Container maxWidth="xl">
                    <Box className="handpicked">
                        <Box
                            sx={{
                                fontSize: {xs: "35px", md: "44px"},
                                my: {sm: "40px", xs: "30px"},
                                textAlign: "center",
                            }}
                            fontWeight={"800"}
                            className="lato"
                        >
                            HAND-PICKED FOR YOU
                        </Box>

                        {/* Render only categories with products */}
                        {availableCategories.length > 0 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "20px",
                                    textTransform: "uppercase",
                                }}
                            >
                                {availableCategories.map((category) => (
                                    <Typography
                                        key={category}
                                        className="lato"
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight:
                                                selectedCategory === category ? "700" : "normal",
                                            borderBottom:
                                                selectedCategory === category
                                                    ? "2.5px solid #000"
                                                    : "none",
                                            cursor: "pointer",
                                            transition: "0.5s",
                                        }}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </Typography>
                                ))}
                            </Box>
                        )}

                        {loader ? (
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                my: 4,
                                alignItems: "center",
                                height: "430px"
                            }}>
                                <CircularProgress sx={{color: "black"}}/>
                            </Box>
                        ) : (
                            selectedCategory &&
                            products[selectedCategory] && (
                                <Box mt={"30px"}>
                                    <Box sx={{position: "relative"}}>
                                        <Swiper
                                            navigation={{
                                                nextEl: `.handpicked-next`,
                                                prevEl: `.handpicked-prev`,
                                            }}
                                            spaceBetween={20}
                                            slidesPerView={5}
                                            modules={[Navigation, Pagination]}
                                            className="mySwiper"
                                            loop={false}
                                            pagination={{clickable: true}}
                                            breakpoints={{
                                                0: {slidesPerView: 2},
                                                810: {slidesPerView: 3},
                                                1100: {slidesPerView: 4},
                                                1220: {slidesPerView: 5},
                                            }}
                                        >
                                            {products[selectedCategory].map((product, index) => (
                                                <SwiperSlide key={index}>
                                                    <Box
                                                        sx={{
                                                            maxWidth: "100%",
                                                            position: "relative",
                                                            pb: "40px",
                                                            cursor: "pointer",
                                                            textAlign: "center",
                                                            ":hover .img": {
                                                                transform: "scale(1.1)",
                                                                transition: "0.5s",
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            navigate(`/single-product/${product._id}`)
                                                        }
                                                    >
                                                        <Box
                                                            sx={{
                                                                position: "relative",
                                                                height: {xs: "255px", sm: "420px"},
                                                                overflow: "hidden",
                                                            }}
                                                        >
                                                            <Typography
                                                                component={"img"}
                                                                src={product?.color_options[0]?.product_images[0]}
                                                                className="img"
                                                            />
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                fontWeight: "700",
                                                                my: "10px",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                fontSize: "16px",
                                                            }}
                                                        >
                                                            {product.title}
                                                        </Box>
                                                        <Box sx={{fontWeight: "500"}}>
                                                            ₹ {product?.color_options[0].price.discounted_price}
                                                        </Box>
                                                    </Box>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <button
                                            className="handpicked-prev"
                                            style={{
                                                padding: "10px",
                                                backgroundColor: "black",
                                                border: "none",
                                            }}
                                        >
                                            <i
                                                className="fa-solid fa-arrow-left-long"
                                                style={{
                                                    fontSize: "20px",
                                                    color: theme.palette.common.white,
                                                }}
                                            ></i>
                                        </button>
                                        <button
                                            className="handpicked-next"
                                            style={{
                                                padding: "10px",
                                                backgroundColor: "black",
                                                border: "none",
                                            }}
                                        >
                                            <i
                                                className="fa-solid fa-arrow-right-long"
                                                style={{
                                                    fontSize: "20px",
                                                    color: theme.palette.common.white,
                                                }}
                                            ></i>
                                        </button>
                                    </Box>
                                </Box>
                            )
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default HandPickedForYou;
