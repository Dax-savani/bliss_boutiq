import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid, IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    useTheme
} from '@mui/material';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../../Instance';
import Loader from '../../Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

const MyWishlist = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/api/wishlist");
            setWishlist(response.data.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemoveFromWishlist = async (itemId) => {
        try {
            await axiosInstance.delete(`/api/wishlist/${itemId}`);
            fetchWishlist();
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
        }
    };

    const handleColorSelect = (wishlistItemId, index) => {
        setSelectedColors((prev) => ({
            ...prev,
            [wishlistItemId]: index,
        }));
    };

    const handleSizeSelect = (wishlistItemId, size) => {
        setSelectedSizes((prev) => ({
            ...prev,
            [wishlistItemId]: size,
        }));
    };

    const handleAddToCart = async (wishlistItem) => {
        const selectedColorIndex = selectedColors[wishlistItem._id] || 0;
        const selectedSize = selectedSizes[wishlistItem._id] || null;

        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }

        const payload = {
            product_id: wishlistItem.product_id._id,
            qty: 1,
            color_id: wishlistItem.product_id.color_options[selectedColorIndex]._id,
            size: selectedSize,
        };

        try {
            await axiosInstance.post("/api/cart", payload);
            toast.success("Item added to cart!");
            navigate("/cart");
        } catch (error) {
            console.error("Error adding item to cart:", error);
            toast.error("Failed to add item to cart.");
        }
    };

    if (loading) {
        return <Loader/>;
    }

    return (
        <Box mt={"100px"}>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "600",
                        justifyContent: "right",
                        cursor: "pointer",
                      }}
                    onClick={() => navigate("/my-account")}
                >
                    <ChevronLeftIcon/>
                    <Box>Back</Box>
                </Box>

                <Box sx={{borderBottom: `1px solid #f0f0f0`, mb: 2}}>
                    <Typography sx={{padding: "15px 30px", fontWeight: "800"}}>
                        ITEM
                    </Typography>
                </Box>

                {wishlist.length > 0 ? (
                    wishlist.map((wishlistItem) => {
                        const selectedColorIndex =
                            selectedColors[wishlistItem._id] || 0;

                        return (
                            <Box
                                key={wishlistItem._id}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mt: "30px",
                                    flexDirection: {xs: "column", sm: "row"},
                                    borderBottom: "1px solid #f0f0f0",
                                    paddingBottom: "20px",
                                }}
                            >
                                <Box
                                    sx={{
                                        flexBasis: {xs: "100%", sm: "20%"},
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mb: {xs: 2, sm: 0},
                                    }}
                                >
                                    <img
                                        src={
                                            wishlistItem?.product_id?.color_options[
                                                selectedColorIndex
                                                ]?.product_images[0]
                                        }
                                        alt={wishlistItem?.product_id?.title}
                                        style={{
                                            width: "150px",
                                            height: "auto",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        flexBasis: {xs: "100%", sm: "40%"},
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        paddingLeft: {xs: 0, sm: "20px"},
                                        mt: {xs: "15px", sm: 0},
                                    }}
                                >
                                    <Typography sx={{fontWeight: "600", fontSize: "14px"}}>
                                        {wishlistItem?.product_id?.title}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            mt: 2,
                                            flexWrap: "wrap",
                                            width: "85%",
                                        }}
                                    >
                                        {wishlistItem.product_id?.color_options?.map(
                                            (colorOption, index) => (
                                                <Box
                                                    key={index}
                                                    onClick={() =>
                                                        handleColorSelect(wishlistItem._id, index)
                                                    }
                                                    sx={{
                                                        width: "25px",
                                                        height: "25px",
                                                        backgroundColor: colorOption.hex,
                                                        borderRadius: "50%",
                                                        border:
                                                            selectedColorIndex === index
                                                                ? "2px solid black"
                                                                : "1px solid #ccc",
                                                        cursor: "pointer",
                                                    }}
                                                ></Box>
                                            )
                                        )}
                                    </Box>

                                    <FormControl sx={{width: "150px", mt: "20px"}}>
                                        <InputLabel
                                            id={`select-size-${wishlistItem._id}`}
                                            sx={{
                                                color: "black",
                                                "&.Mui-focused": {color: "black"},
                                            }}
                                        >
                                            Size
                                        </InputLabel>
                                        <Select
                                            labelId={`select-size-${wishlistItem._id}`}
                                            id={`select-size-${wishlistItem._id}`}
                                            value={selectedSizes[wishlistItem._id] || ""}
                                            onChange={(e) =>
                                                handleSizeSelect(wishlistItem._id, e.target.value)
                                            }
                                            label="Size"
                                        >
                                            {wishlistItem?.product_id?.color_options[
                                                selectedColorIndex
                                                ]?.size_options?.map((sizeOption) => (
                                                <MenuItem
                                                    key={sizeOption.size}
                                                    value={sizeOption.size}
                                                >
                                                    {sizeOption.size}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box
                                    sx={{
                                        flexBasis: {xs: "100%", sm: "30%"},
                                        textAlign: {xs: "center", sm: "start"},
                                        mt: {xs: "15px", sm: 0},
                                    }}
                                >
                                    <Typography variant="body2">Unit Price:</Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: {xs: "center", sm: "start"},
                                            alignItems: "center",
                                            mt: "10px",
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                textDecoration: "line-through",
                                                color: "gray",
                                                marginRight: "8px",
                                            }}
                                        >
                                            ₹
                                            {
                                                wishlistItem?.product_id?.color_options[
                                                    selectedColorIndex
                                                    ]?.price?.original_price
                                            }
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{fontWeight: "bold", color: "#b51f29"}}
                                        >
                                            ₹
                                            {
                                                wishlistItem?.product_id?.color_options[
                                                    selectedColorIndex
                                                    ]?.price?.discounted_price
                                            }
                                        </Typography>
                                    </Box>
                                    <Typography sx={{fontSize: "12px", marginTop: "5px", ml: 2}}>
                                        Price excl. VAT
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        mt: {xs: "20px", sm: 0},
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        gap: 2,
                                    }}
                                >
                                    <IconButton
                                        color="error"
                                        sx={{
                                            padding: 1,
                                            borderRadius: "20px",
                                            mb: 2,
                                        }}
                                        onClick={() =>
                                            handleRemoveFromWishlist(wishlistItem.product_id._id)
                                        }
                                    >
                                        <DeleteIcon/>
                                    </IconButton>

                                    <Button
                                        variant="outlined"
                                        sx={{
                                            color: "#f0f0f0",
                                            backgroundColor: "#000",
                                            fontWeight: "900",
                                            padding: "12px 20px",
                                            "&:hover": {
                                                color: "#f0f0f0",
                                                backgroundColor: "#000",
                                            },
                                        }}
                                        onClick={() => handleAddToCart(wishlistItem)}
                                    >
                                        ADD TO CART
                                    </Button>
                                </Box>
                            </Box>
                        );
                    })
                ) : (
                    <Typography
                        variant="body1"
                        sx={{textAlign: "center", marginTop: "20px"}}
                    >
                        No items in your wishlist.
                    </Typography>
                )}
            </Container>
        </Box>
    );
};


export default MyWishlist;
