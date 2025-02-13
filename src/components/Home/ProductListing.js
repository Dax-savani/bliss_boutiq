import React, {useState, useEffect} from "react";
import {
    Grid,
    Card,
    Typography,
    Box,
    IconButton,
    Button,
} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../Instance";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Loader from "../../Loader";
import CircularProgress from "@mui/material/CircularProgress";

const label = {inputProps: {"aria-label": "Checkbox demo"}};
const ProductListing = ({onAddToWishlist, selectedCategory}) => {
    const navigate = useNavigate();

    const {categoryId} = useParams();
    const {subcategoryId} = useParams();

    const path = useLocation()

    const [products, setProducts] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [colorSelections, setColorSelections] = useState({});
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [favoritedProductId, setFavoritedProductId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/product${path.search}`);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, categoryId, path.search]);

    const calculateDiscount = (originalPrice, discountedPrice) => {
        if (originalPrice > 0 && discountedPrice > 0) {
            return ((originalPrice - discountedPrice) / originalPrice) * 100;
        }
        return 0;
    };

    const handleOpen = (event, productId) => {
        event.stopPropagation();
        setAnchorEl({element: event.currentTarget, productId});
    };

    const handleClose = (event) => {
        if (event) event.stopPropagation();
        setAnchorEl(null);
    };

    const handleColorSelect = (colorName, productId, event) => {
        event.stopPropagation();
        setColorSelections((prev) => ({
            ...prev,
            [productId]: colorName,
        }));
        handleClose(event);
        setSelectedSize(null)
    };

    const open = Boolean(anchorEl);
    const id = open ? "color-popup" : undefined;

    const handleMouseEnter = (productId) => {
        setHoveredProduct(productId);
    };

    const handleMouseLeave = () => {
        setHoveredProduct(null);
    };

    const [loadingProductId, setLoadingProductId] = useState(null);

    const handleFavoriteClick = async (product) => {
        setLoading(true);
        try {
            const payload = {product_id: product._id};
            const token = localStorage.getItem("token");

            if (product.isWishlisted) {
                setLoadingProductId(product._id);
                setFavoritedProductId(null);
                const response = await axiosInstance.delete(
                    `/api/wishlist/${product._id}`
                );
                fetchProducts();
                console.log("Product removed from wishlist:", response.data);
                onAddToWishlist(product, true);
            }
            if (token) {
                setLoadingProductId(product._id);
                setFavoritedProductId(product._id);
                const response = await axiosInstance.post("/api/wishlist", payload);
                await new Promise((resolve) => setTimeout(resolve, 100));
                fetchProducts();
                console.log("Product added to wishlist:", response.data);
                onAddToWishlist(product);
                setLoading(false);
            } else {
                navigate("/profile");
            }
        } catch (error) {
            console.error(
                "Error updating wishlist:",
                error.response?.data || error.message
            );
        } finally {
            // Remove the loader after the operation is done
            setLoadingProductId(null);
        }
    };

    if (loading) {
        <Loader/>
    }

    // Handle size selection
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    return (
        <Box sx={{mt: "50px", px: {xs: "0px", md: "30px"}}}>
            <div>
                {products.length > 0 ? (
                    <Grid container spacing={{xs: 0.2, sm: 2, md: 3}}>
                        {products &&
                            products.map((product) => {
                                const selectedColor = colorSelections[product._id] || product.color_options?.[0]?.color;
                                const selectedColorOption = product.color_options?.find(
                                    (color) => color.color === selectedColor
                                ) || product.color_options?.[0];
                                const selectedHex = selectedColorOption?.hex;

                                const discountPercentage = calculateDiscount(
                                    selectedColorOption?.price?.original_price || 0,
                                    selectedColorOption?.price?.discounted_price || 0
                                );

                                return (
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={4}
                                        lg={4}
                                        xl={3}
                                        key={product.id}
                                        onMouseEnter={() => handleMouseEnter(product.id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Card
                                            sx={{
                                                position: "relative",
                                                borderRadius: "0px",
                                                overflow: "visible",
                                                boxShadow: "none",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    "&:hover .size-box": {
                                                        opacity: 1,
                                                        transform: "translateY(0)",
                                                    },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        height: {lg: "580px", sm: "580px", xs: "257px"},
                                                        position: "relative",
                                                        "&:hover .hover-img": {
                                                            opacity: 1,
                                                            visibility: "visible",
                                                        },
                                                        "&:hover .default-img": {
                                                            opacity: 0,
                                                            visibility: "hidden",
                                                        },
                                                    }}
                                                >
                                                    <Box
                                                        component="img"
                                                        src={selectedColorOption?.product_images[0] || "fallback-image-url"}
                                                        alt="Product"
                                                        className="default-img"
                                                        sx={{
                                                            width: "100%",
                                                            height: "100%",
                                                            opacity: 1,
                                                            visibility: "visible",
                                                            transition:
                                                                "opacity 0.3s ease, visibility 0.3s ease",
                                                        }}
                                                    />
                                                    <Box
                                                        onClick={() =>
                                                            navigate(`/single-product/${product._id}`)
                                                        }
                                                        component="img"
                                                        src={selectedColorOption?.product_images[1] || "fallback-image-url"}
                                                        alt="Product Hover"
                                                        className="hover-img"
                                                        sx={{
                                                            width: "100%",
                                                            height: "100%",
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            opacity: 0,
                                                            visibility: "hidden",
                                                            transition:
                                                                "opacity 0.3s ease, visibility 0.3s ease",
                                                            cursor: "pointer",
                                                        }}
                                                    />

                                                    {selectedColor && (
                                                        <Box
                                                            className="size-box"
                                                            sx={{
                                                                position: "absolute",
                                                                bottom: 0,
                                                                left: 0,
                                                                width: "100%",
                                                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                                padding: {xs: "8px", sm: "10px", md: "15px"},
                                                                textAlign: "start",
                                                                opacity: 0,
                                                                transform: "translateY(20px)",
                                                                transition:
                                                                    "opacity 0.3s ease, transform 0.3s ease",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    mb: {xs: 1, sm: 1.5},
                                                                    fontSize: {
                                                                        xs: "8px",
                                                                        sm: "12px",
                                                                        md: "14px",
                                                                    },
                                                                    mx: 1,
                                                                }}
                                                            >
                                                                <strong>Quick Shop</strong> (Select Your Size)
                                                            </Typography>
                                                            <Grid
                                                                container
                                                                spacing={{xs: 1, sm: 2}}
                                                                justifyContent="start"
                                                                alignItems="center"
                                                            >
                                                                <Grid container spacing={2}>
                                                                    {product.color_options
                                                                        ?.find((colorOption) => colorOption.color === selectedColor)
                                                                        ?.size_options?.map((option) => (
                                                                            <Grid
                                                                                item
                                                                                xs={3}
                                                                                sm={2.3}
                                                                                md={3}
                                                                                lg={2.3}
                                                                                key={`${selectedColor}-${option.size}`}
                                                                            >
                                                                                <Box
                                                                                    onClick={() => handleSizeSelect(option.size)}
                                                                                    sx={{
                                                                                        padding: {
                                                                                            xs: "8px",
                                                                                            sm: "10px",
                                                                                            md: "35px"
                                                                                        },
                                                                                        // padding: { xs: "8px", sm: "10px", md: "15px" },
                                                                                        width: "100%",
                                                                                        height: {
                                                                                            xs: "30px",
                                                                                            sm: "35px",
                                                                                            md: "40px",
                                                                                        },
                                                                                        display: "flex",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        cursor: "pointer",
                                                                                        fontSize: {
                                                                                            xs: "12px",
                                                                                            sm: "14px",
                                                                                            md: "14px",
                                                                                        },
                                                                                        fontWeight: "500",
                                                                                        // backgroundColor:
                                                                                        //   selectedSize === option.size ? "#dcdcdc" : "transparent",
                                                                                        "&:hover": {
                                                                                            textDecorationLine: "underline",
                                                                                            fontWeight: "800",
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    {option.size}
                                                                                </Box>
                                                                            </Grid>
                                                                        ))}
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    )}
                                                </Box>
                                                <IconButton
                                                    onClick={() => handleFavoriteClick(product)}
                                                    sx={{
                                                        position: "absolute",
                                                        top: {xs: "5px", sm: "15px"},
                                                        right: {xs: "10px", sm: "15px"},
                                                        background:
                                                            isClicked === product._id ? "black" : "white",
                                                        border: "1px solid #eee",
                                                        borderRadius: "50%",
                                                        width: "40px",
                                                        height: "40px",
                                                        "&:hover": {
                                                            background:
                                                                isClicked === product._id
                                                                    ? "rgba(0, 0, 0, 0.8)"
                                                                    : "rgba(255, 255, 255, 0.8)",
                                                        },
                                                    }}
                                                >
                                                    {/* <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: '#000' }} />} checked={product.isWishlisted} /> */}

                                                    {
                                                        loadingProductId === product._id ? (
                                                            <CircularProgress sx={{color: "black", padding: "0"}}
                                                                              size="20px"/>
                                                        ) : (
                                                            <Checkbox
                                                                {...label}
                                                                icon={<FavoriteBorder/>}
                                                                checkedIcon={<Favorite sx={{color: "#000"}}/>}
                                                                checked={
                                                                    localStorage.getItem("token") &&
                                                                    product.isWishlisted
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                        )
                                                    }

                                                </IconButton>
                                                {discountPercentage > 0 && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            position: "absolute",
                                                            top: {xs: "4px", sm: "15px"},
                                                            left: {xs: "0px", sm: "-12px"},
                                                            background: "black",
                                                            color: "white",
                                                            padding: {xs: "4px 12px", sm: "2px 24px"},
                                                            fontSize: {xs: "8px", sm: "12px", md: "14px"},
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        Sale -{Math.round(discountPercentage)}%
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Box
                                                sx={{
                                                    padding: "10px 15px 10px 0",
                                                    mt: {xs: 1, sm: 0},
                                                    ml: {xs: 1, sm: 0},
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "black",
                                                        mb: 1,
                                                        fontSize: {xs: "12px", sm: "14px"},
                                                        fontWeight: "600",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        textTransform: "uppercase",
                                                    }}
                                                >
                                                    {product.title}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: {xs: "block", sm: "flex"},
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            textDecoration: "line-through",
                                                            color: "#000",
                                                            fontSize: {xs: "14px", sm: "16px"},
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        {/* ₹{product.price.orignal_price} */}
                                                        ₹{selectedColorOption?.price?.original_price || "N/A"}

                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: "#b51f29",
                                                            fontSize: {xs: "16px", sm: "18px"},
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        ₹{selectedColorOption?.price?.discounted_price || "N/A"}
                                                    </Typography>
                                                </Box>

                                                <Button
                                                    onClick={(event) => handleOpen(event, product._id)}
                                                    sx={{
                                                        color: "#000",
                                                        bgcolor: "#FFF",
                                                        mt: 2,
                                                        border: "0.5px solid #000",
                                                        borderRadius: "0px",
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 22,
                                                            height: 22,
                                                            borderRadius: "50%",
                                                            backgroundColor: selectedHex,
                                                            display: "inline-block",
                                                            marginRight: 1,
                                                            border: "1px solid #ddd",
                                                        }}
                                                    ></Box>
                                                    {product.color_options?.length} Colors
                                                </Button>

                                                <Box
                                                    onClick={(event) => handleClose(event)}
                                                    sx={{
                                                        display: "block",
                                                        gridTemplateColumns: "repeat(auto-fill, 40px)",
                                                        gap: 1,
                                                        maxWidth: 300,
                                                        position: 'relative'
                                                    }}
                                                >
                                                    {anchorEl?.productId === product._id && (
                                                        <Box
                                                            sx={{
                                                                padding: 2,
                                                                backgroundColor: "white",
                                                                border: "1px solid #ddd",
                                                                width: "100%",
                                                                position: "absolute",
                                                                bottom: 26,
                                                                left: 0,
                                                                transform: "translateY(-12px)",
                                                                zIndex: 1000,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body1"
                                                                sx={{p: "10px 0 20px 0"}}
                                                            >
                                                                Color:{" "}
                                                                <strong>
                                                                    {selectedColor}
                                                                </strong>
                                                            </Typography>
                                                            <Box
                                                                onClick={(event) => event.stopPropagation()}
                                                                sx={{
                                                                    zIndex: 1000,
                                                                }}
                                                            >
                                                                {product &&
                                                                    product.color_options?.map((color) => (
                                                                        <Box
                                                                            onClick={(event) =>
                                                                                handleColorSelect(
                                                                                    color.color,
                                                                                    product._id,
                                                                                    event
                                                                                )
                                                                            }
                                                                            key={color.color}
                                                                            sx={{
                                                                                display: "inline-block",
                                                                                width: 30,
                                                                                height: 30,
                                                                                borderRadius: "50%",
                                                                                marginRight: 2,
                                                                                cursor: "pointer",
                                                                                backgroundColor: color.hex,
                                                                                border:
                                                                                    selectedColor === color.color
                                                                                        ? "1.5px solid black"
                                                                                        : "1.5px solid #eee",
                                                                            }}
                                                                        />
                                                                    ))}
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Card>
                                    </Grid>
                                );
                            })}
                    </Grid>
                ) : (
                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "20px",
                            color: "gray",
                            fontWeight: "bold",
                        }}
                    >
                        No Products Available.
                    </Typography>
                )}
            </div>
        </Box>
    );
};

export default ProductListing;
