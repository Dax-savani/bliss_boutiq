import { useTheme } from "@emotion/react";
import {
    Box,
    Button,
    Container,
    Divider, FormControl,
    Grid,
    IconButton,
    InputLabel, MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Instance";
import paymentimg1 from "../../assets/images/cart/amex.svg";
import paymentimg2 from "../../assets/images/cart/paypal.svg";
import paymentimg3 from "../../assets/images/cart/mc.svg";
import paymentimg4 from "../../assets/images/cart/visa.svg";
import logo from '../../assets/images/header/Asset 2@4x.png'
import Loader from "../../Loader";
import EditIcon from '@mui/icons-material/Edit';
import toast from "react-hot-toast";

const CartPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemId, setItemId] = useState('');
    const [editItem, setEditItem] = useState({});
    const token = localStorage.getItem("token");

    const fetchCartItems = async () => {
        try {
            const response = await axiosInstance.get("/api/cart", {
                headers: { " token": `Bearer ${token}` },
            });

            setCartItems(response.data || []);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleRemove = async (itemId) => {
        try {
            await axiosInstance.delete(`/api/cart/${itemId}`, {
                headers: { "token": `Bearer ${token}` },
            });
            setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleColorChange = (e) => {
        const selectedColor = e.target.value;

        const selectedColorOption = cartItems
            .find(item => item._id === editItem._id)
            ?.product_id?.color_options?.find(colorOption => colorOption.color === selectedColor);

        if (selectedColorOption) {

            setEditItem({
                ...editItem,
                color: selectedColor,
                color_id: selectedColorOption._id,
                size: "",
                stock: 0,
                qty: 1,
            });
        }
    };


    const handleSizeChange = (e) => {
        const selectedSize = e.target.value;
        const selectedColorOption = cartItems
            .find(item => item._id === editItem._id)
            ?.product_id?.color_options?.find(colorOption => colorOption._id === editItem.color_id);

        if (selectedColorOption) {
            const selectedSizeOption = selectedColorOption.size_options.find(
                (sizeOption) => sizeOption.size === selectedSize
            );

            setEditItem({
                ...editItem,
                size: selectedSize,
                stock: selectedSizeOption?.stock || 0,
            });
        }
    };

    const handleQuantityChange = (operation) => {
        let newQty = editItem.qty;

        if (operation === "increase" && newQty < (editItem.stock || 10)) {
            newQty += 1;
        } else if (operation === "decrease" && newQty > 1) {
            newQty -= 1;
        }
        setEditItem({
            ...editItem,
            qty: newQty,
        });
    };

    const subtotal = cartItems
        .reduce((subtotal, item) => {
            if (!item.product_id || !item.product_id.color_options) {
                return subtotal;
            }
            const colorOption = item.product_id.color_options.find(
                (color) => color._id === (itemId === item._id ? editItem.color : item.color_id)
            );
            if (colorOption && colorOption.price?.discounted_price) {
                return subtotal + colorOption.price.discounted_price * (item.qty || 1);
            }
            return subtotal;
        }, 0)
        .toFixed(2);

    const additionalFee = cartItems.length > 0 ? 100 : 0;

    const total = (parseFloat(subtotal) + additionalFee).toFixed(2);

    const handleEdit = (item) => {
        const selectedColor = item.product_id.color_options.find(
            (colorOption) => colorOption._id === item.color_id
        )?.color;

        setItemId(item._id);
        setEditItem({
            _id: item._id,
            color: selectedColor || "",
            size: item.size || "",
            qty: item.qty || 1,
            color_id: item.color_id || "",
            product_id: item.product_id._id,
        });
    };

    const handleSaveEdit = async () => {
        try {
            const selectedColorOption = cartItems
                .find((item) => item._id === editItem._id)
                ?.product_id?.color_options?.find(
                    (colorOption) => colorOption._id === editItem.color_id
                );
            if (!selectedColorOption) {
                console.error("Invalid color selected.");
                return;
            }

            await axiosInstance.put(`/api/cart/${editItem._id}`, {
                product_id: editItem.product_id,
                qty: editItem.qty,
                color_id: editItem.color_id,
                size: editItem.size,
            });
            setCartItems((prevItems) =>
                prevItems.map((cartItem) =>
                    cartItem._id === editItem._id ? { ...cartItem, ...editItem } : cartItem
                )
            );
            setItemId("");
        } catch (error) {
            console.error("Error updating cart item:", error);
        }
    };

    const [userAddress, setUserAddress] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get("/api/user/me");
            const user = response.data.data;

            if (user.address_details) {
                setUserAddress(user.address_details);
            }
            
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const incompleteItem = cartItems.find(item => !item.product_id?.color_options);
        if (incompleteItem) {
            window.location.reload();
        }
        fetchUserData()
    }, [cartItems]);

    if (loading) {
        return <Loader />;
    }

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const paymentHandler = async (event) => {
        event.preventDefault();

        if (!userAddress.address_1) {
        navigate('/orderform')
        return;
    }

        const orders = cartItems;
        const totalAmount = total;

        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            alert("Failed to load Razorpay. Please check your internet connection.");
            return;
        }

        try {
            const { data: order } = await axiosInstance.post(
                '/api/order/razorpay-order',
                {
                    orders,
                    totalAmount,
                },
                {
                    headers: { 'Content-Type': 'application/json', 'token': `Bearer ${token}` }
                }
            );

            const options = {
                key: "rzp_test_huqEwaD9wjrEMb",
                name: "Bliss Boutiq",
                description: "Test Transaction",
                image: logo,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const payload = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orders: cartItems.map(item => ({
                                product_id: item.product_id._id,
                                qty: item.qty,
                                color_id: item.color_id,
                                size: item.size
                            }))
                        };

                        console.log("Sending payload:", JSON.stringify(payload, null, 2));

                        const validateResponse = await axiosInstance.post(
                            '/api/order/razorpay-validate',
                            payload,
                            { headers: { 'Content-Type': 'application/json', 'token': `Bearer ${token}` } }
                        );

                        console.log('jsonResponse', validateResponse.data);
                        fetchCartItems();
                    } catch (error) {
                        console.error("Validation failed:", error.response?.data || error.message);
                    }
                },
                prefill: {
                    name: "Web Coder",
                    email: "webcoder@example.com",
                    contact: "9000000000",
                },
                // notes: {
                //     address: userAddress,  // Use user's saved address
                // },
                theme: {
                    color: "#3399CC",
                },
            };

            const rzp1 = new window.Razorpay(options);

            rzp1.on("payment.failed", function (response) {
                alert(`Error: ${response.error.code}\nDescription: ${response.error.description}`);
            });

            rzp1.open();
        } catch (error) {
            console.error("Payment initiation failed:", error.response?.data || error.message);
        }
    };
    

    return (
        <Box bgcolor={theme.palette.liteGrayBack}>
            <Container maxWidth="">
                <Box sx={{ margin: "32px 0px 20px", padding: "0px 0px 0px 16px" }}>
                    <Typography
                        variant="h2"
                        className="lato"
                        pt={8}
                        sx={{
                            fontSize: "20px",
                            fontWeight: "500",
                            color: theme.palette.lightBlack,
                        }}
                    >
                        Your Shopping Bag
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ backgroundColor: "white" }} px={2}>
                            <Box sx={{ margin: "0px 0px 20px 0px", padding: "20px 0px" }}>
                                <Button
                                    sx={{
                                        textTransform: "unset",
                                        border: "1px solid black",
                                        padding: "14px 16px",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        borderRadius: "0px",
                                        color: theme.palette.common.black,
                                        "&:hover": {
                                            backgroundColor: "#000000",
                                            color: theme.palette.common.white,
                                        },
                                    }}
                                    onClick={() => navigate("/")}
                                >
                                    Continue Shopping
                                </Button>
                            </Box>

                            {cartItems.map((item) => {
                                if (!item.product_id?.color_options) {
                                    return (null);
                                }

                                const colorOption = item.product_id.color_options.find(
                                    (color) => color._id === item.color_id
                                );

                                return (
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Box key={item._id} display={{ xs: "block", sm: "flex" }}
                                            sx={{ paddingBottom: "20px", marginBottom: "20px" }}>
                                            <Box sx={{ height: "260px", width: "195px", margin: "0px 20px 0px 0px" }}>
                                                {itemId === item._id ? (
                                                    item.product_id.color_options.find((colorOption) => colorOption.color === editItem.color)
                                                        ?.product_images?.length > 0 ? (
                                                        <img
                                                            src={
                                                                item.product_id.color_options
                                                                    .find((colorOption) => colorOption.color === editItem.color)
                                                                    ?.product_images[0]
                                                            }
                                                            alt={`Product ${item._id}`}
                                                            style={{
                                                                width: "150px",
                                                                margin: "0px 10px",
                                                                border: "1px solid black",
                                                            }}
                                                        />
                                                    ) : (
                                                        <p>No images available.</p>
                                                    )
                                                ) : (

                                                    colorOption?.product_images?.length > 0 ? (
                                                        <img
                                                            src={colorOption.product_images[0]}
                                                            alt={`Product ${item._id}`}
                                                            style={{
                                                                width: "150px",
                                                                margin: "0px 10px",
                                                                border: "1px solid black",
                                                            }}
                                                        />
                                                    ) : (
                                                        <p>No images available.</p>
                                                    )
                                                )}
                                            </Box>

                                            <Box pt={{ xs: 2, sm: 0 }}>
                                                <Typography sx={{
                                                    fontSize: "15px",
                                                    marginBottom: "4px",
                                                    color: theme.palette.lightBlack
                                                }}>
                                                    {item.product_id.title}
                                                </Typography>
                                                <Typography sx={{
                                                    fontSize: "15px",
                                                    marginBottom: "4px",
                                                    color: theme.palette.lightBlack
                                                }}>
                                                    Total Price :
                                                    ₹{(colorOption?.price.discounted_price || 0) * (item.qty || 1)}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "14px",
                                                        marginBottom: "4px",
                                                        color: theme.palette.gray,
                                                    }}
                                                >
                                                    {itemId === item._id
                                                        ?
                                                        `Discounted Price: ₹${item.product_id.color_options.find(
                                                            (colorOption) => colorOption.color === editItem.color
                                                        )?.price.discounted_price || "N/A"
                                                        }`
                                                        :
                                                        `Discounted Price: ₹${colorOption?.price.discounted_price || "N/A"}`}
                                                </Typography>


                                                {itemId === item._id ? (
                                                    <Box mt={2}>
                                                    <Grid container spacing={2}>
                                                        {/* Color Selection */}
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <FormControl fullWidth>
                                                                <InputLabel>Color</InputLabel>
                                                                <Select
                                                                    value={editItem.color || ""}
                                                                    onChange={handleColorChange}
                                                                    label="Color"
                                                                >
                                                                    {item.product_id.color_options.map((colorOption) => (
                                                                        <MenuItem key={colorOption._id} value={colorOption.color}>
                                                                            {colorOption.color}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                
                                                        {/* Size Selection */}
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <FormControl fullWidth disabled={!editItem.color}>
                                                                <InputLabel>Size</InputLabel>
                                                                <Select
                                                                    value={editItem.size || ""}
                                                                    onChange={handleSizeChange}
                                                                    label="Size"
                                                                >
                                                                    {item.product_id.color_options
                                                                        .find((colorOption) => colorOption.color === editItem.color)
                                                                        ?.size_options.map((sizeOption) => (
                                                                            <MenuItem key={sizeOption.size} value={sizeOption.size}>
                                                                                {sizeOption.size}
                                                                            </MenuItem>
                                                                        ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                
                                                        {/* Quantity Selection */}
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Box display="flex" alignItems="center">
                                                                <Typography>Quantity: </Typography>
                                                                <Button
                                                                    onClick={() => handleQuantityChange("decrease")}
                                                                    sx={{
                                                                        minWidth: "30px",
                                                                        height: "30px",
                                                                        margin: "0 8px",
                                                                        color: "#000",
                                                                        border: "0.5px solid #000",
                                                                        borderRadius: 0,
                                                                    }}
                                                                >
                                                                    -
                                                                </Button>
                                                                <Typography>{editItem.qty}</Typography>
                                                                <Button
                                                                    onClick={() => handleQuantityChange("increase")}
                                                                    sx={{
                                                                        minWidth: "30px",
                                                                        height: "30px",
                                                                        margin: "0 8px",
                                                                        color: "#000",
                                                                        border: "0.5px solid #000",
                                                                        borderRadius: 0,
                                                                    }}
                                                                >
                                                                    +
                                                                </Button>
                                                            </Box>
                                                        </Grid>
                                                
                                                        {/* Save Button */}
                                                        <Grid item xs={12} display="flex" justifyContent={{ xs: "center", md: "flex-start" }}>
                                                            <Button
                                                                onClick={handleSaveEdit}
                                                                sx={{
                                                                    textTransform: "unset",
                                                                    border: "1px solid black",
                                                                    padding: "5px 10px",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                    borderRadius: "0px",
                                                                    color: theme.palette.common.black,
                                                                    "&:hover": {
                                                                        backgroundColor: "#000000",
                                                                        color: theme.palette.common.white,
                                                                    },
                                                                }}
                                                            >
                                                                Save
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                
                                                ) : (
                                                    <Box>
                                                        <Box mt={2} sx={{ fontSize: "14px", color: "#666666" }}>
                                                            <Typography>Colour: {colorOption?.color || "Unknown"}</Typography>
                                                            <Typography>Size: {item.size}</Typography>
                                                            <Box display="flex" alignItems="center">
                                                                <Typography>Quantity: </Typography>
                                                                <Typography>{item.qty}</Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box mt={3}>
                                                            <Button
                                                                sx={{
                                                                    textTransform: "unset",
                                                                    border: "1px solid black",
                                                                    padding: "5px 10px",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                    borderRadius: "0px",
                                                                    color: theme.palette.common.black,
                                                                    "&:hover": {
                                                                        backgroundColor: "#000000",
                                                                        color: theme.palette.common.white,
                                                                    },
                                                                }}
                                                                onClick={() => handleRemove(item._id)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                        <Box>
                                            <IconButton sx={{ color: "gray" }} onClick={() => handleEdit(item)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={5} sx={{ padding: "16px 0px" }}>
                        <Box sx={{ backgroundColor: "white" }} px={2}>
                            <Box pt={2}>
                                <Typography
                                    pb={2}
                                    sx={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        borderBottom: "1px solid #E4E4E4",
                                    }}
                                >
                                    Overview
                                </Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} py={2}>
                                <Typography
                                    sx={{ color: theme.palette.lightBlack, fontSize: "18px" }}
                                >
                                    Subtotal
                                </Typography>
                                <Typography> ₹{subtotal}</Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} pt={0}>
                                <Typography
                                    sx={{ color: theme.palette.lightBlack, fontSize: "18px" }}
                                >
                                    Standard delivery
                                </Typography>
                                <Typography>
                                    ₹{additionalFee}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    pb={2}
                                    sx={{ color: theme.palette.lightBlack, fontSize: "12px" }}
                                >
                                    within 5 - 6 working days
                                </Typography>
                            </Box>
                            {/* <Box pb={2}>
                                <Box pb={1}>
                                    <Typography sx={{ fontSize: "18px" }}>
                                        Got a promotion code?
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <TextField
                                        variant="outlined"
                                        placeholder="Enter code"
                                        sx={{
                                            borderRadius: "0px",
                                            flexGrow: 1,
                                            "& .MuiOutlinedInput-root": {
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: 0,
                                                borderTopLeftRadius: 0,
                                                borderBottomLeftRadius: 0,
                                            },
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius: "0px",
                                            padding: "15.5px 50px",
                                            backgroundColor: theme.palette.common.black,
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: theme.palette.gray,
                                            },
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </Box>
                                <Box mt={1}>
                                    <Typography>
                                        Promotion codes cannot be used in combination with other
                                        promotions or promotion codes
                                    </Typography>
                                </Box>
                            </Box> */}
                            <Box display={"flex"} justifyContent={"space-between"} py={2} sx={{ borderTop: "1px solid #E4E4E4" }}>
                                <Typography
                                    sx={{ color: theme.palette.lightBlack, fontSize: "16px" }}
                                >
                                    {/* Total (1 Item) inc. VAT */}
                                    Total inc. VAT
                                </Typography>
                                <Typography>{total}</Typography>
                            </Box>
                            <Box>
                                <Button
                                    onClick={paymentHandler}
                                    sx={{
                                        width: "100%",
                                        margin: "20px 0px",
                                        textTransform: "unset",
                                        border: "1px solid black",
                                        padding: "16px 18px",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        borderRadius: "0px",
                                        backgroundColor: theme.palette.common.black,
                                        color: theme.palette.common.white,
                                        "&:hover": {
                                            backgroundColor: theme.palette.common.white,
                                            color: theme.palette.common.black,
                                        },
                                    }}
                                >
                                    Proceed To Checkout
                                </Button>
                            </Box>
                            <Box sx={{ padding: "20px" }}>
                                {/* <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{ display: "flex", alignItems: "center" }}
                                    >
                                        <Typography>
                                            Free delivery on all orders over ₹75
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{ display: "flex", alignItems: "center" }}
                                    >
                                        <Typography>
                                            60-day free returns. For returns, a fee of 4,95 EUR
                                            applies.
                                        </Typography>
                                    </Grid>
                                </Grid> */}
                                <Divider sx={{ marginBottom: "10px" }} />
                                <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                                    Accepted Payment Methods
                                </Typography>
                                <Box sx={{ display: "flex" }}>
                                    <img
                                        src={paymentimg1}
                                        alt="American Express"
                                        style={{
                                            height: "34px",
                                            width: "44px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <img
                                        src={paymentimg2}
                                        alt="MasterCard"
                                        style={{
                                            height: "34px",
                                            width: "44px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <img
                                        src={paymentimg3}
                                        alt="PayPal"
                                        style={{
                                            height: "34px",
                                            width: "44px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <img
                                        src={paymentimg4}
                                        alt="Visa"
                                        style={{
                                            height: "34px",
                                            width: "44px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CartPage;