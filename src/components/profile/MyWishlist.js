// import React, { useEffect, useState } from 'react';
// import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from '@mui/material';
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../Instance';
// import Loader from '../../Loader';
// import DeleteIcon from '@mui/icons-material/Delete';

// const MyWishlist = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);


//   const fetchWishlist = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/api/wishlist");
//       setWishlist(response.data.data);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {

//     fetchWishlist();
//   }, []);

//   const handleRemoveFromWishlist = async (itemId) => {
//     console.log(itemId,"yfy");

//     try {
//       await axiosInstance.delete(`/api/wishlist/${itemId}`);  
//       fetchWishlist()
//     } catch (error) {
//       console.error("Error removing item from wishlist:", error);
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Box mt={"100px"}>
//       <Container maxWidth="xl">
//         <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", fontWeight: "600", cursor: "pointer" }} onClick={() => navigate("/product")}>
//           <ChevronLeftIcon />
//           <Typography>Back</Typography>
//         </Box>

//         <Box sx={{ borderBottom: `1px solid ${theme.palette.textLightGray}` }}>
//           <Typography sx={{ padding: "15px 30px", fontWeight: "800" }}>ITEM</Typography>
//         </Box>

//         {wishlist?.length > 0 ? (
//           wishlist.map((item) => (
//             <Container>
//               <Box key={item._id} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "30px", flexDirection: "column", borderBottom: "1px solid #f0f0f0", paddingBottom: "20px" }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "start" }}>
//                   {/* Item Image */}
//                   <Box sx={{ flexBasis: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                     <Box sx={{ height: "200px", width: "150px" }}>
//                       <img
//                         src={item?.product_id?.product_images?.[0]}
//                         alt={item?.product_id?.title}
//                         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                       />
//                     </Box>
//                   </Box>

//                   {/* Item Details */}
//                   <Box sx={{ flexBasis: "40%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "20px" }}>
//                     <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{item?.product_id?.title}</Typography>
//                     <FormControl sx={{ width: "150px", mt: "20px" }}>
//                       <InputLabel id={`select-size-${item._id}`} sx={{ color: "black", "&.Mui-focused": { color: "black" } }}>
//                         Size
//                       </InputLabel>
//                       <Select
//                         labelId={`select-size-${item._id}`}
//                         id={`select-size-${item._id}`}
//                         label="Size"
//                         sx={{
//                           "&:hover .MuiOutlinedInput-notchedOutline": {
//                             borderColor: "unset",
//                           },
//                           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                             borderColor: "black",
//                           },
//                         }}
//                       >
//                         {item?.product_id?.size_options?.map((sizeOption) => (
//                           <MenuItem key={sizeOption.size} value={sizeOption.size}>
//                             {sizeOption.size}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Box>

//                   {/* Price Details */}
//                   <Box sx={{ flexBasis: "30%", textAlign: "start" }}>
//                     <Typography variant="body2">Unit Price:</Typography>
//                     <Box sx={{ display: 'flex' }}>
//                       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "10px" }}>
//                         <Typography variant="body1" sx={{ textDecoration: "line-through", color: "gray", marginRight: "8px" }}>
//                           ₹{item?.product_id?.price?.orignal_price}
//                         </Typography>
//                         <Typography variant="body1" sx={{ fontWeight: "bold", color: "#b51f29" }}>
//                           ₹{item?.product_id?.price?.discounted_price}
//                         </Typography>
//                       </Box>
//                       <Typography sx={{ fontSize: "12px", marginTop: "5px", ml: 2 }}>Price excl. VAT</Typography>
//                     </Box>
//                   </Box>

//                   {/* Add to Cart Button */}
//                   <Box>
//                   <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         sx={{
//                           padding:1,
//                           borderRadius: '20px',
//                           mb:2,
//                           "&:hover": {
//                             color: theme.palette.liteGrayBack,
//                             backgroundColor: theme.palette.black,
//                             borderColor: theme.palette.black,
//                           },
//                         }}
//                         onClick={() => handleRemoveFromWishlist(item.product_id._id)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </Button>
//                     </Box>
//                     <Box sx={{ flexBasis: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                       <Button
//                         variant="outlined"
//                         sx={{
//                           color: theme.palette.liteGrayBack,
//                           backgroundColor: theme.palette.black,
//                           fontWeight: "900",
//                           padding: "12px 20px",
//                           textWrap: "nowrap",
//                           "&:hover": {
//                             color: theme.palette.liteGrayBack,
//                             backgroundColor: theme.palette.black,
//                             borderColor: theme.palette.black,
//                           },
//                         }}
//                       >
//                         ADD TO CART
//                       </Button>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Container>
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: "center", marginTop: "20px" }}>
//             No items in your wishlist.
//           </Typography>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default MyWishlist;


// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
//   useTheme
// } from '@mui/material';
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../Instance';
// import Loader from '../../Loader';
// import DeleteIcon from '@mui/icons-material/Delete';
//
// const MyWishlist = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   const fetchWishlist = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/api/wishlist");
//       setWishlist(response.data.data);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   console.log(wishlist,"sad");
//
//   useEffect(() => {
//     fetchWishlist();
//   }, []);
//
//   const handleRemoveFromWishlist = async (itemId) => {
//     console.log(itemId, "yfy");
//     try {
//       await axiosInstance.delete(`/api/wishlist/${itemId}`);
//       fetchWishlist();
//     } catch (error) {
//       console.error("Error removing item from wishlist:", error);
//     }
//   };
//
//   if (loading) {
//     return <Loader />;
//   }
//
//   return (
//     <Box mt={"100px"}>
//       <Container maxWidth="xl">
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             fontWeight: "600",
//             cursor: "pointer",
//             mb: 2
//           }}
//           onClick={() => navigate("/product")}
//         >
//           <ChevronLeftIcon />
//           <Typography>Back</Typography>
//         </Box>
//
//         <Box sx={{ borderBottom: `1px solid ${theme.palette.textLightGray}`, mb: 2 }}>
//           <Typography sx={{ padding: "15px 30px", fontWeight: "800" }}>ITEM</Typography>
//         </Box>
//
//         {wishlist?.length > 0 ? (
//           wishlist.map((item) => (
//             <Container key={item._id}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   mt: "30px",
//                   flexDirection: { xs: "column", sm: "row" },
//                   borderBottom: "1px solid #f0f0f0",
//                   paddingBottom: "20px",
//                 }}
//               >
//                 {/* Item Image */}
//                 <Box
//                   sx={{
//                     flexBasis: { xs: "100%", sm: "20%" },
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     mb: { xs: 2, sm: 0 }
//                   }}
//                 >
//                 {/*  <Box sx={{ height: "200px", width: "150px" }}>*/}
//                 {/*    <img*/}
//                 {/*      src={item?.product_id?.color_options?.product_images?.[0]}*/}
//                 {/*      alt={item?.product_id?.title}*/}
//                 {/*      style={{ width: "100%", height: "100%", objectFit: "cover" }}*/}
//                 {/*    />*/}
//                 {/*  </Box>*/}
//                 {/*</Box>*/}
//
//                   <Box display={{md: "flex", xs: "none"}}>
//                     <Grid container spacing={1}>
//                       {wishlist &&
//                           wishlist?.color_options?.map((option, index) => (
//                               <Grid item xs={6} sm={4} md={3} key={index}>
//                                 <Box
//                                     sx={{
//                                       display: "flex",
//                                       flexDirection: "column",
//                                       alignItems: "center",
//                                       cursor: "pointer",
//                                       transition: "0.3s",
//                                       "&:hover": {
//                                         border: "1.4px solid black",
//                                       },
//                                     }}
//                                 >
//                                   <Box sx={{
//                                     width: "100%",
//                                     height: "100%",
//                                     marginBottom: "8px",
//                                     overflow: "hidden",
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     padding: "10px"
//                                   }}>
//                                     <img src={option.product_images[0]}
//                                          alt={`Product color: ${option.color}`}
//                                          style={{
//                                       width: "100%",
//                                       height: "100%",
//                                       objectFit: "cover"
//                                     }}/>
//                                   </Box>
//                                 </Box>
//                               </Grid>
//                           ))}
//                     </Grid>
//                   </Box>
//                 </Box>
//                 {/* Item Details */}
//                 <Box
//                   sx={{
//                     flexBasis: { xs: "100%", sm: "40%" },
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "flex-start",
//                     paddingLeft: { xs: 0, sm: "20px" },
//                     mt: { xs: "15px", sm: 0 }
//                   }}
//                 >
//                   <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{item?.product_id?.title}</Typography>
//                   <FormControl sx={{ width: "150px", mt: "20px" }}>
//                     <InputLabel
//                       id={`select-size-${item._id}`}
//                       sx={{
//                         color: "black",
//                         "&.Mui-focused": { color: "black" },
//                       }}
//                     >
//                       Size
//                     </InputLabel>
//                     <Select
//                       labelId={`select-size-${item._id}`}
//                       id={`select-size-${item._id}`}
//                       label="Size"
//                       sx={{
//                         "&:hover .MuiOutlinedInput-notchedOutline": {
//                           borderColor: "unset",
//                         },
//                         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                           borderColor: "black",
//                         },
//                       }}
//                     >
//                       {item?.product_id?.size_options?.map((sizeOption) => (
//                         <MenuItem key={sizeOption.size} value={sizeOption.size}>
//                           {sizeOption.size}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Box>
//
//                 {/* Price Details */}
//                 <Box
//                   sx={{
//                     flexBasis: { xs: "100%", sm: "30%" },
//                     textAlign: { xs: "center", sm: "start" },
//                     mt: { xs: "15px", sm: 0 }
//                   }}
//                 >
//                   <Typography variant="body2">Unit Price:</Typography>
//                   <Box sx={{ display: 'flex', justifyContent: { xs: "center", sm: "start" }, alignItems: "center", mt: "10px" }}>
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         textDecoration: "line-through",
//                         color: "gray",
//                         marginRight: "8px",
//                       }}
//                     >
//                       ₹{item?.product_id?.price?.orignal_price}
//                     </Typography>
//                     <Typography
//                       variant="body1"
//                       sx={{ fontWeight: "bold", color: "#b51f29" }}
//                     >
//                       ₹{item?.product_id?.price?.discounted_price}
//                     </Typography>
//                   </Box>
//                   <Typography sx={{ fontSize: "12px", marginTop: "5px", ml: 2 }}>
//                     Price excl. VAT
//                   </Typography>
//                 </Box>
//
//                 {/* Buttons */}
//                 <Box
//                   sx={{
//                     mt: { xs: "20px", sm: 0 },
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "center",
//                     flexDirection: "column",
//                     alignItems: "flex-end",
//                     gap: 2
//                   }}
//                 >
//                   {/* Remove from Wishlist Button */}
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     sx={{
//                       padding: 1,
//                       borderRadius: '20px',
//                       mb: 2,
//                       "&:hover": {
//                         color: theme.palette.liteGrayBack,
//                         backgroundColor: theme.palette.black,
//                         borderColor: theme.palette.black,
//                       },
//                     }}
//                     onClick={() => handleRemoveFromWishlist(item.product_id._id)}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </Button>
//
//                   {/* Add to Cart Button */}
//                   <Button
//                     variant="outlined"
//                     sx={{
//                       color: theme.palette.liteGrayBack,
//                       backgroundColor: theme.palette.black,
//                       fontWeight: "900",
//                       padding: "12px 20px",
//                       textWrap: "nowrap",
//                       "&:hover": {
//                         color: theme.palette.liteGrayBack,
//                         backgroundColor: theme.palette.black,
//                         borderColor: theme.palette.black,
//                       },
//                     }}
//                   >
//                     ADD TO CART
//                   </Button>
//                 </Box>
//               </Box>
//             </Container>
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: "center", marginTop: "20px" }}>
//             No items in your wishlist.
//           </Typography>
//         )}
//       </Container>
//     </Box>
//   );
// };
//
// export default MyWishlist;


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
            qty: 1, // You can modify this to allow for different quantities
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
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        fontWeight: "600",
                        cursor: "pointer",
                        mb: 2,
                    }}
                    onClick={() => navigate("/product")}
                >
                    <ChevronLeftIcon/>
                    <Typography>Back</Typography>
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
