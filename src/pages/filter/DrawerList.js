// import React, { useEffect, useState } from "react";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import TuneIcon from "@mui/icons-material/Tune";
// import Collapse from "@mui/material/Collapse";
// import SportsGolfIcon from "@mui/icons-material/SportsGolf";
// import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
// import { Checkbox, Grid, Typography, Box, Drawer, Button, List, ListItemButton } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import axiosInstance from "../../Instance";
// import { useLocation, useNavigate,  useParams,  useSearchParams } from "react-router-dom";
// import useQueryParams from "../../hooks/useQueryParams";

// const DrawerList = ({selectedCategories, setSelectedCategories}) => {


//   const queryParams = useQueryParams();



//   const navigate = useNavigate();
//   const [openDrawer, setOpenDrawer] = useState(false);


//   const [categoriesList, setCategoriesList] = useState(false);
//   const [categories, setCategories] = useState([]);

//   const [sizeList, setSizeList] = useState(false);
//   const [sizes, setSizes] = useState([]);

//   const [colorList, setColorList] = useState(false);
//   const [colors, setColors] = useState([]);

//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axiosInstance.get("/api/product/attributes");
//       setCategories(response.data.data.categories || [null]);
//       setSizes(response.data.data.sizes || []);
//       setColors(response.data.data.colors || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDrawerOpen = () => { setOpenDrawer(true) };
//   const handleDrawerClose = () => { setOpenDrawer(false) };
//   const handleClick = () => { setCategoriesList(!categoriesList) };
//   const handleClickSize = () => { setSizeList(!sizeList) };
//   const handleClickColor = () => { setColorList(!colorList) };


//   const handleCategorySelect = (categoryId) => {
//     setSelectedCategories((prevSelected) => {
//       let updatedCategories;
//       if (prevSelected.includes(categoryId)) {
//         updatedCategories = prevSelected.filter((id) => id !== categoryId); // Deselect category
//       } else {
//         updatedCategories = [...prevSelected, categoryId]; // Select category
//       }

//       // Navigate with selected categories in the URL
//       navigate(`/product?gender=${queryParams.gender ? queryParams.gender : ''}&&categoryId=${updatedCategories.join(",")}`);
//       return updatedCategories;
//     });
//   };

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//     navigate(`/product?gender=${queryParams.gender ? queryParams.gender : ''}&&categoryId=${selectedCategories.join(",")}&&size=${size}`);
//   };




//   return (
//     <div>
//       <Button
//         onClick={handleDrawerOpen}
//         sx={{
//           textTransform: "none",
//           bgcolor: "black",
//           fontWeight: "bold",
//           borderRadius: "8px",
//           p: "6px 5px 6px 8px",
//           "&:hover": {
//             bgcolor: "#000",
//             boxShadow: "none",
//           },
//         }}
//       >
//         <Typography sx={{ color: "#fff", mx: 1 }}>Filter</Typography>
//         <TuneIcon sx={{ color: "#FFF", mx: 1 }} />
//       </Button>

//       <Drawer open={openDrawer}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", padding: "20px 30px 0px 30px" }}>
//           <Typography sx={{ textAlign: "center", fontWeight: "900" }}>SELECT FILTER</Typography>
//           <Box sx={{ display: "flex", justifyContent: "end" }}>
//             <CloseIcon onClick={handleDrawerClose} sx={{ cursor: "pointer" }} />
//           </Box>
//         </Box>

//         <Box
//           sx={{ width: { lg: 450, xs: 320 }, display: "flex", justifyContent: "center", position: "relative" }}
//           role="presentation"
//           onClick={handleDrawerOpen}
//         >
//           <List sx={{ width: "100%", maxWidth: 430, bgcolor: "background.paper", overflow: "auto" }} component="nav">
//             {/* Category */}
//             <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
//               <ListItemButton onClick={handleClick} sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>CATEGORY</Typography>
//                 {categoriesList ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//               <Collapse in={categoriesList} timeout="auto" unmountOnExit>
//                 <Grid item container xs={12}>
//                   {categories.map((category) => (
//                     <Grid item xs={6} key={category._id}>
//                       <Typography
//                         onClick={() => handleCategorySelect(category._id)}
//                         sx={{
//                           display: "flex",
//                           gap: 1,
//                           alignItems: "center",
//                           fontSize: "15px",
//                           cursor: "pointer",
//                           "&:hover": { color: '#999' }
//                         }}
//                       >
//                         <Checkbox
//                           size="small"
//                           checked={selectedCategories.includes(category._id)}
//                           onChange={() => handleCategorySelect(category._id)}
//                         />
//                         {category.name}
//                       </Typography>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Collapse>
//             </Box>

//             {/* Size */}
//             <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
//               <ListItemButton onClick={handleClickSize} sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>SIZE</Typography>
//                 {sizeList ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//               <Collapse in={sizeList} timeout="auto" unmountOnExit>
//                 <Grid container spacing={1}>
//                   {sizes && sizes.map((item, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                       <Typography
//                        onClick={() => handleSizeSelect(item)}
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           mb: "10px",
//                           cursor: "pointer",
//                           "&:hover": { bgcolor: "#000", color: "#fff" },
//                           fontSize: "16px",
//                         }}
//                       >
//                         {item}
//                       </Typography>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Collapse>
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "#F4F9F8",
//                 justifyContent: "space-between",
//                 px: 2,
//                 my: 2,
//               }}
//             >
//               <Typography
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   py: 1,
//                   fontWeight: "800",
//                 }}
//                 variant="subtitle2"
//               >
//                 <SportsGolfIcon
//                   fontSize="medium"
//                   sx={{
//                     backgroundColor: "#1E8479",
//                     color: "#FFF",
//                     borderRadius: "50%",
//                   }}
//                 />
//                 What’s my size?
//               </Typography>
//               <ErrorOutlineRoundedIcon fontSize="medium" />
//             </Box>

//             {/* Color */}
//             <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
//               <ListItemButton
//                 onClick={() => {
//                   handleClickColor();
//                 }}
//                 sx={{ display: "flex", justifyContent: "space-between" }}
//               >
//                 <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>COLOR</Typography>
//                 {colorList ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//               <Collapse in={colorList} timeout="auto" unmountOnExit>
//                 <Grid item container xs={12} sx={{ display: "flex", justifyContent: "center" }} spacing={1}>
//                   {colors.map((item) => (
//                     <Grid item xs={5} key={item.color}>
//                       <Box
//                         sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2, cursor: "pointer" }}
//                         onClick={() => {
//                           setSelectedColor(item.color);
//                           navigate(`/product?gender=${queryParams.gender ? queryParams.gender : ''}&&categoryId=${selectedCategories.join(",")}&&size=${selectedSize ? selectedSize : ''}&&color=${item.color}`);
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             border: "1px solid black",
//                             height: "18px",
//                             width: "18px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                           }}
//                         >
//                           <Box sx={{ height: "14px", width: "14px", backgroundColor: item.hex , }} />
//                         </Box>
//                         <Typography sx={{ fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                           {item.color}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Collapse>
//             </Box>
//           </List>
//         </Box>
//       </Drawer>
//     </div>
//   );
// };

// export default DrawerList;


import React, { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";
import Collapse from "@mui/material/Collapse";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Checkbox, Grid, Typography, Box, Drawer, Button, List, ListItemButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from "../../Instance";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";

const DrawerList = ({ selectedCategories, setSelectedCategories }) => {
  const queryParams = useQueryParams();
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [categoriesList, setCategoriesList] = useState(false);
  const [sizeList, setSizeList] = useState(false);
  const [colorList, setColorList] = useState(false);

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Fetch Filter Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/product/attributes");
        setCategories(response.data.data.categories || []);
        setSizes(response.data.data.sizes || []);
        setColors(response.data.data.colors || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to Update URL with Filters
  const updateFilters = (updatedCategories, updatedSize, updatedColor) => {
    const query = new URLSearchParams();

    if (queryParams.gender) query.set("gender", queryParams.gender);
    if (updatedCategories.length > 0) query.set("categoryId", updatedCategories.join(","));
    if (updatedSize) query.set("size", updatedSize);
    if (updatedColor) query.set("color", updatedColor);

    navigate(`/product?${query.toString()}`);
  };

  // Category Selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      const updatedCategories = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId) // Deselect
        : [...prevSelected, categoryId]; // Select

      updateFilters(updatedCategories, selectedSize, selectedColor);
      return updatedCategories;
    });
  };

  // Size Selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    updateFilters(selectedCategories, size, selectedColor);
  };

  // Color Selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    updateFilters(selectedCategories, selectedSize, color);
  };

  return (
    <div>
      {/* Filter Button */}
      <Button
        onClick={() => setOpenDrawer(true)}
        sx={{
          textTransform: "none",
          bgcolor: "black",
          fontWeight: "bold",
          borderRadius: "8px",
          p: "6px 5px 6px 8px",
          "&:hover": {
            bgcolor: "#000",
            boxShadow: "none",
          },
        }}
      >
        <Typography sx={{ color: "#fff", mx: 1 }}>Filter</Typography>
        <TuneIcon sx={{ color: "#FFF", mx: 1 }} />
      </Button>

      {/* Drawer */}
      <Drawer open={openDrawer}>
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: "20px 30px 0px 30px" }}>
          <Typography sx={{ textAlign: "center", fontWeight: "900" }}>SELECT FILTER</Typography>
          <CloseIcon onClick={() => setOpenDrawer(false)} sx={{ cursor: "pointer" }} />
        </Box>

        <Box sx={{ width: { lg: 450, xs: 320 }, display: "flex", justifyContent: "center" }}>
          <List sx={{ width: "100%", maxWidth: 430, bgcolor: "background.paper", overflow: "auto" }} component="nav">

            {/* Category Filter */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton onClick={() => setCategoriesList(!categoriesList)} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>CATEGORY</Typography>
                {categoriesList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={categoriesList} timeout="auto" unmountOnExit>
                <Grid container>
                  {categories.map((category) => (
                    <Grid item xs={6} key={category._id}>
                      <Typography
                        onClick={() => handleCategorySelect(category._id)}
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          fontSize: "15px",
                          cursor: "pointer",
                          "&:hover": { color: '#999' }
                        }}
                      >
                        <Checkbox size="small" checked={selectedCategories.includes(category._id)} />
                        {category.name}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Size Filter */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton onClick={() => setSizeList(!sizeList)} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>SIZE</Typography>
                {sizeList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={sizeList} timeout="auto" unmountOnExit>
                <Grid container spacing={1}>
                  {sizes.map((size) => (
                    <Grid item xs={12} sm={6} md={4} key={size}>
                      <Typography
                        onClick={() => handleSizeSelect(size)}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mb: "10px",
                          cursor: "pointer",
                          "&:hover": { bgcolor: "#000", color: "#fff" },
                          fontSize: "16px",
                        }}
                      >
                        {size}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F4F9F8",
                justifyContent: "space-between",
                px: 2,
                my: 2,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 1,
                  fontWeight: "800",
                }}
                variant="subtitle2"
              >
                <SportsGolfIcon
                  fontSize="medium"
                  sx={{
                    backgroundColor: "#1E8479",
                    color: "#FFF",
                    borderRadius: "50%",
                  }}
                />
                What’s my size?
              </Typography>
              <ErrorOutlineRoundedIcon fontSize="medium" />
            </Box>

            {/* Color Filter */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton onClick={() => setColorList(!colorList)} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>COLOR</Typography>
                {colorList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={colorList} timeout="auto" unmountOnExit>
                <Grid container spacing={1}>
                  {colors.map((color) => (
                    <Grid item xs={5} key={color.color}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, cursor: "pointer" }} onClick={() => handleColorSelect(color.color)}>
                        <Box sx={{ border: "1px solid black", height: "18px", width: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Box sx={{ height: "14px", width: "14px", backgroundColor: color.hex }} />
                        </Box>
                        <Typography sx={{ fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{color.color}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerList;
