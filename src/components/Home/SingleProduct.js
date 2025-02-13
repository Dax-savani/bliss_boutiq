import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    useTheme,
} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import axiosInstance from "../../Instance";
import Loader from "../../Loader";
import "react-toastify/dist/ReactToastify.css";
import toast, {Toaster} from "react-hot-toast";

function SingleProduct() {
    const {id} = useParams();
    const [productData, setProductData] = useState(null);
    const [qty, setQty] = useState(1);
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null); // Ensure this is initially null
    const [availableStock, setAvailableStock] = useState(0);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (qty && selectedSize && availableStock > 0) {
            const productToAdd = {
                product_id: productData._id,
                qty: qty,
                color_id: selectedColorId,
                size: selectedSize,
            };
            console.log('asd', productToAdd);

            const token = localStorage.getItem("token");

            try {
                if (token) {
                    const response = await axiosInstance.post("/api/cart", productToAdd);
                    console.log("Product added to cart:", response.data);
                    toast.success(response.data.message);
                    navigate("/cart");
                } else {
                    navigate("/profile");
                }
            } catch (error) {
                console.error("Error adding to cart:", error);

                toast.error("Failed to add to cart. Please try again.", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } else {
            toast.error("Please select a quantity and size.", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleSizeSelect = (option) => {
        setSelectedSize(option.size);
        setAvailableStock(option.stock);
        setQty(1);
    };

    const handleColorSelect = (option) => {
        setSelectedColor(option.color);
        setAvailableStock(option.stock);
        setSelectedColorId(option._id);
        setSelectedSize(option.size_options[0]?.size); // Default size to the first available option for the selected color
        setQty(1); // Reset quantity to 1 on color change
    };

    const handleQuantityChange = (event) => {
        setQty(event.target.value);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/api/product/${id}`);
                setProductData(response.data.data);
                // Set initial color and size if available
                const firstColor = response.data.data.color_options[0];
                setSelectedColor(firstColor?.color);
                setAvailableStock(firstColor?.stock || 1);
                setSelectedColorId(firstColor?._id);
                // setSelectedSize(firstColor?.size_options[0]?.size); // Default to the first size option
            } catch (error) {
                console.error("Error fetching product data", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChange1 = (event) => {
        setQty(event.target.value);
    };

    if (!productData) {
        return (
            <Typography>
                <Loader/>
            </Typography>
        );
    }

    // Get the data for the selected color
    const selectedColorData = productData.color_options.find(
        (colorOption) => colorOption.color === selectedColor
    );

    return (
        <>

            <Box my={5}>
                <Toaster position="top-center" reverseOrder={false}/>
                <Box className="List">
                    <Grid container sx={{height: {md: "1250px", xs: "100%"}}}>
                        <Grid
                            item
                            md={7}
                            sx={{
                                height: "100%",
                                overflow: "auto",
                                display: {xs: "none", md: "block"},
                            }}
                        >
                            <Box>
                                <Grid container>
                                    {selectedColorData?.product_images?.map((productImage, index) => (
                                        <Grid item md={6} key={index}>
                                            <img src={productImage} alt={productImage}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid xs={12} sx={{display: {xs: "block", md: "none"}}}>
                            <Swiper
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                                loop={true}
                                pagination={{
                                    clickable: true,
                                    renderBullet: (index, className) => {
                                        return `<span className="${className} custom-dot"><span className="dash"></span></span>`;
                                    },
                                }}
                            >
                                {selectedColorData?.product_images?.map((productImage, index) => (
                                    <SwiperSlide key={index}>
                                        <Box sx={{objectFit: "contain"}}>
                                            <img
                                                src={productImage}
                                                alt="Product"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                    borderRadius: "0",
                                                }}
                                            />
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Grid>

                        <Grid item md={5} sx={{height: {xs: "100%", md: "100vh"}}}>
                            <Box
                                sx={{padding: {md: "35px 74px 20px", xs: "25px 34px 10px"}, mt: 3}}
                            >
                                <Box
                                    display={{lg: "flex", md: "block", xs: "none"}}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                >
                                    <Box display={"flex"}>
                                        <Box>
                                            <Typography
                                                component="a"
                                                sx={{
                                                    cursor: "pointer",
                                                    padding: "0px 0px 2px 0px",
                                                    borderBottom: "1px solid black",
                                                    fontSize: "14px",
                                                    textTransform: "capitalize"
                                                }}
                                            >
                                                {productData?.gender}
                                            </Typography>
                                            <Typography component="span" sx={{padding: "0px 10px"}}>
                                                /
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="a"
                                                sx={{
                                                    cursor: "pointer",
                                                    padding: "0px 0px 2px 0px",
                                                    borderBottom: "1px solid black",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {productData?.category.name}
                                            </Typography>
                                            <Typography component="span" sx={{padding: "0px 10px"}}>
                                                /
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                component="a"
                                                sx={{
                                                    cursor: "pointer",
                                                    padding: "0px 0px 2px 0px",
                                                    borderBottom: "1px solid black",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {productData?.title}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h3"
                                            className="lato"
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {lg: "45px", md: "30px"},
                                                marginTop: {xl: "0px", md: "20px", lg: "0px"},
                                            }}
                                        >
                                            {productData?.brand}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{padding: {md: "35px 74px 20px", xs: "25px 34px 10px"}}}>
                                <Typography
                                    variant="h3"
                                    className="lato"
                                    sx={{
                                        fontWeight: "800",
                                        fontSize: {md: "26px", lg: "35px", xs: "22px"},
                                        marginTop: {md: "32px", xs: "0px"},
                                    }}
                                >
                                    {productData?.title}
                                </Typography>

                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        marginTop: "22px",
                                    }}
                                >
                                    ₹{" "}
                                    {parseFloat(selectedColorData?.price?.discounted_price).toFixed(2)}
                                    <Typography
                                        component="span"
                                        sx={{
                                            fontSize: "14px",
                                            color: theme.palette.textGray,
                                            padding: "0px 0px 0px 5px",
                                            fontWeight: "400",
                                        }}
                                    >
                                        Price excl. VAT
                                    </Typography>
                                </Typography>

                                <Box>
                                    <Typography className="lato" sx={{
                                        display: "inline-block",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        my: "22px",
                                        backgroundColor: theme.palette.common.black,
                                        color: theme.palette.common.white,
                                        padding: "8px"
                                    }}>
                                        SLIM FIT
                                    </Typography>
                                </Box>
                                <Box>
                                    <Grid container spacing={1}>
                                        {productData &&
                                            productData?.color_options?.map((option, index) => (
                                                <Grid item xs={6} sm={4} md={3} key={index}>
                                                    <Box
                                                        onClick={() => handleColorSelect(option)}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            border: selectedColor === option.color ? "1.4px solid black" : "1px solid #cccccc",
                                                            cursor: "pointer",
                                                            transition: "0.3s",
                                                            "&:hover": {
                                                                border: "1.4px solid black",
                                                            },
                                                            height: {md: "190px", xs: "180px"},
                                                            width: {md: "100%", xs: "130px"}
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            width: "100%",
                                                            height: "100%",
                                                            marginBottom: "8px",
                                                            overflow: "hidden",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            padding: "10px"
                                                        }}>
                                                            <img src={option.product_images[0]}
                                                                 alt={`Product color: ${option.color}`} style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "contain",
                                                            }}/>
                                                        </Box>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontSize: "12px",
                                                                fontWeight: "bold",
                                                                color: selectedColor === option.color ? "black" : "#555",
                                                                textAlign: "center",
                                                                textTransform: "capitalize",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            {option.color}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Box>
                                <Box sx={{marginTop: {md: "55px", xs: "35px"}}}>
                                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                        <Typography variant="span">Select Size</Typography>
                                    </Box>
                                    <Box mt={2}>
                                        {/* Display size options for the selected color */}
                                        {selectedColorData?.size_options?.map((option, index) => (
                                            <Box
                                                key={index}
                                                onClick={() => handleSizeSelect(option)}
                                                sx={{
                                                    border:
                                                        selectedSize === option.size
                                                            ? "1.4px solid black"
                                                            : "1px solid #cccccc",
                                                    display: "inline-flex",
                                                    flexWrap: "wrap",
                                                    padding: {md: "20px 30px", xs: "15px"},
                                                    margin: "0px 10px 10px 0px",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    transition: "0.3s",
                                                    color: option.stock > 0 ? "black" : "#721c24",
                                                    "&:hover": {
                                                        border: "1.4px solid #000000",
                                                    },
                                                    justifyContent: "center",
                                                    width: "calc(50% - 10px)",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {option.size} ({option.stock} in stock)
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>

                                <Box mt={5} display={{md: "flex", xs: "block"}}>
                                    <FormControl sx={{width: "250px", mb: {xs: 1, md: 0}}}>
                                        <InputLabel>Qty</InputLabel>
                                        <Select value={qty} label="Qty" onChange={handleQuantityChange}>
                                            {Array.from({length: availableStock}, (_, i) => i + 1).map((quantity) => (
                                                <MenuItem key={quantity} value={quantity}>
                                                    {quantity}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <button
                                        className="lato"
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            backgroundColor: theme.palette.common.black,
                                            color: theme.palette.common.white,
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            padding: "16px 0px 16px 0px",
                                            cursor: "pointer",
                                        }}
                                        onClick={handleAddToCart}
                                    >
                                        ADD TO CART
                                    </button>
                                </Box>

                                <Box
                                    mt={5}
                                    bgcolor={theme.palette.liteGrayBack}
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    sx={{padding: "5px"}}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        MAKE YOUR LOOK PERFECT
                                    </Typography>
                                    <Typography display={"flex"}>
                                        <Box
                                            sx={{
                                                width: "32px",
                                                height: "52px",
                                                margin: "0px 0px 0px 16px",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img src={productData?.color_options[0]?.product_images[0]}/>
                                        </Box>
                                    </Typography>
                                </Box>

                                <Box mt={3}>
                                    {productData?.other_info?.map((info, index) => (
                                        <Accordion
                                            key={index}
                                            sx={{boxShadow: "none"}}
                                            expanded={expanded === `panel${index}`}
                                            onChange={() => setExpanded(expanded === `panel${index}` ? false : `panel${index}`)}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                className="lato"
                                                aria-controls={`panel${index}-content`}
                                                id={`panel${index}-header`}
                                                sx={{
                                                    fontWeight: "bold",
                                                    borderBottom: "1px solid #CECECE",
                                                }}
                                            >
                                                {info.title}
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {info.description}
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default SingleProduct;
