// import React, { useEffect, useState } from "react";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import TuneIcon from "@mui/icons-material/Tune";
// import Collapse from "@mui/material/Collapse";
// import { Checkbox, Grid, Typography, Box, Drawer, Button, List, ListItemButton, } from "@mui/material";
// import SportsGolfIcon from "@mui/icons-material/SportsGolf";
// import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
// import CloseIcon from '@mui/icons-material/Close';
// import axiosInstance from "../../Instance";
// import { useNavigate } from "react-router-dom";

// const DrawerList = () => {

//   const navigate = useNavigate();

//   const [openDrawer, setOpenDrawer] = React.useState(false);

//   const [categoriesList, setCategoriesList] = useState(false);
//   const [categories, setCategories] = useState([]);

//   const [sizeList, setSizeList] = useState(false);
//   const [sizes, setSizes] = useState([]);

//   const [colorList, setColorList] = useState(false);
//   const [colors, setColors] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axiosInstance.get("/api/product/attributes");
//       setCategories(response.data.data.categories || []);
//       setSizes(response.data.data.sizes);
//       setColors(response.data.data.colors);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);


//   const handleDrawerOpen = () => {
//     setOpenDrawer(true);
//   };

//   const handleDrawerClose = () => {
//     setOpenDrawer(false);
//   };

//   const handleClick = () => {
//     setCategoriesList(!categoriesList);
//   };

//   const handleClickSize = () => {
//     setSizeList(!sizeList);
//   };

//   const handleClickColor = () => {
//     setColorList(!colorList);
//   };

//   return (
//     <div>
//       <Button
//         onClick={handleDrawerOpen}
//         sx={{
//           textTransform: 'none',
//           bgcolor: 'black',
//           fontWeight: 'bold',
//           borderRadius: '8px',
//           p: '6px 5px 6px 8px',
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
//         <Box sx={{ display: "flex", justifyContent: 'space-between', padding: "20px 30px 0px 30px" }} >
//           <Typography sx={{ textAlign: "center", fontWeight: "900" }}>SELECT FILTER</Typography>
//           <Box sx={{ display: "flex", justifyContent: "end" }}>
//             <CloseIcon onClick={handleDrawerClose} sx={{ cursor: "pointer" }} />
//           </Box>
//         </Box>
//         <Box
//           sx={{ width: { lg: 450, xs: 320 }, display: "flex", justifyContent: "center", position: 'relative' }}
//           role="presentation"
//           onClick={handleDrawerOpen}
//         >
//           <List
//             sx={{ width: "100%", maxWidth: 430, bgcolor: "background.paper", overflow: 'auto' }}
//             component="nav"
//             aria-labelledby="nested-list-subheader"
//           >
//             {/* Category */}
//             <Box sx={{ borderBottom: '1px solid #ccc', py: 2 }}>
//               <ListItemButton onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: '800' }}>
//                   CATEGORY
//                 </Typography>
//                 {categoriesList ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//               <Collapse in={categoriesList} timeout="auto" unmountOnExit>
//                 <Grid item container xs={12}>
//                   {categories.map((category) => (
//                     <Grid item xs={6} key={category._id}>
//                       <Typography sx={{ display: 'flex', gap: 1, alignItems: 'center', fontSize: '15px' }}>
//                         <Checkbox size="small" />
//                         {category.name}
//                       </Typography>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Collapse>
//             </Box>

//             {/* Size */}
//             <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
//               <ListItemButton
//                 onClick={handleClickSize}
//                 sx={{ display: "flex", justifyContent: "space-between" }}
//               >
//                 <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>SIZE</Typography>
//                 {sizeList ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//               <Collapse in={sizeList} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding sx={{ display: "flex", pt: 2 }}>
//                   <Grid container spacing={1}>
//                     {sizes.map((item, index) => (
//                       <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Typography
//                           sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             mb: "10px",
//                             cursor: "pointer",
//                             "&:hover": {
//                               bgcolor: "#000",
//                               color: "#fff",
//                             },
//                             fontSize: "16px",
//                           }}
//                         >
//                           {item}
//                         </Typography>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </List>
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
//                   // navigate(`/product?color=${color}`);
//                 }}
//                 sx={{ display: "flex", justifyContent: "space-between" }}
//               >
//                 <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>COLOR</Typography>
//                 {colorList ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//               <Collapse in={colorList} timeout="auto" unmountOnExit>
//                 <Grid
//                   item
//                   container
//                   xs={12}
//                   sx={{ display: "flex", justifyContent: "center" }}
//                   spacing={1}
//                 >
//                   {colors.map((item) => (
//                     <Grid item xs={5}>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           gap: 2,
//                           alignItems: "center",
//                           mt: 2,
//                           cursor: "pointer",
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
//                           <Box
//                             sx={{
//                               height: "14px",
//                               width: "14px",
//                               backgroundColor: item.hex,
//                               textAlign: "center",
//                             }}
//                           />
//                         </Box>
//                         <Typography sx={{ color: "balck", fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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
//       </Drawer >
//     </div >
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
import { useLocation, useNavigate,  useParams,  useSearchParams } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";

const DrawerList = ({selectedCategories, setSelectedCategories}) => {
  

  const queryParams = useQueryParams();
  
  

  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  

  const [categoriesList, setCategoriesList] = useState(false);
  const [categories, setCategories] = useState([]);

  const [sizeList, setSizeList] = useState(false);
  const [sizes, setSizes] = useState([]);

  const [colorList, setColorList] = useState(false);
  const [colors, setColors] = useState([]);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/product/attributes");
      setCategories(response.data.data.categories || [null]);
      setSizes(response.data.data.sizes || []);
      setColors(response.data.data.colors || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDrawerOpen = () => { setOpenDrawer(true) };
  const handleDrawerClose = () => { setOpenDrawer(false) };
  const handleClick = () => { setCategoriesList(!categoriesList) };
  const handleClickSize = () => { setSizeList(!sizeList) };
  const handleClickColor = () => { setColorList(!colorList) };




  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      let updatedCategories;
      if (prevSelected.includes(categoryId)) {
        updatedCategories = prevSelected.filter((id) => id !== categoryId); // Deselect category
      } else {
        updatedCategories = [...prevSelected, categoryId]; // Select category
      }

      // Navigate with selected categories in the URL
      navigate(`/product?gender=${queryParams.gender ? queryParams.gender : ''}&&categoryId=${updatedCategories.join(",")}`);
      return updatedCategories;
    });
  };


  return (
    <div>
      <Button
        onClick={handleDrawerOpen}
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

      <Drawer open={openDrawer}>
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: "20px 30px 0px 30px" }}>
          <Typography sx={{ textAlign: "center", fontWeight: "900" }}>SELECT FILTER</Typography>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <CloseIcon onClick={handleDrawerClose} sx={{ cursor: "pointer" }} />
          </Box>
        </Box>

        <Box
          sx={{ width: { lg: 450, xs: 320 }, display: "flex", justifyContent: "center", position: "relative" }}
          role="presentation"
          onClick={handleDrawerOpen}
        >
          <List sx={{ width: "100%", maxWidth: 430, bgcolor: "background.paper", overflow: "auto" }} component="nav">
            {/* Category */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton onClick={handleClick} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>CATEGORY</Typography>
                {categoriesList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={categoriesList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
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
                        <Checkbox
                          size="small"
                          checked={selectedCategories.includes(category._id)}
                          onChange={() => handleCategorySelect(category._id)}
                        />
                        {category.name}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Size */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton onClick={handleClickSize} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>SIZE</Typography>
                {sizeList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={sizeList} timeout="auto" unmountOnExit>
                <Grid container spacing={1}>
                  {sizes && sizes.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Typography
                        onClick={() => {
                          setSelectedSize(item);
                          if (selectedSize) navigate(`/product?size=${selectedSize}`);
                        }}
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
                        {item}
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

            {/* Color */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={() => {
                  handleClickColor();
                }}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>COLOR</Typography>
                {colorList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={colorList} timeout="auto" unmountOnExit>
                <Grid item container xs={12} sx={{ display: "flex", justifyContent: "center" }} spacing={1}>
                  {colors.map((item) => (
                    <Grid item xs={5} key={item.color}>
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2, cursor: "pointer" }}
                        onClick={() => {
                          setSelectedColor(item.color);
                          if (selectedColor) navigate(`/product?color=${selectedColor}`);
                        }}
                      >
                        <Box
                          sx={{
                            border: "1px solid black",
                            height: "18px",
                            width: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box sx={{ height: "14px", width: "14px", backgroundColor: item.hex , }} />
                        </Box>
                        <Typography sx={{ fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.color}
                        </Typography>
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




// const fits = [
//   { label: 'Slim Fit (324)' },
//   { label: 'Regular Fit (694)' },
//   { label: 'Relaxed Fit (115)' },
//   { label: 'Extra Slim Fit (1)' },
//   { label: 'Tapered Fit (1)' }
// ];

// const features = [
//   { label: 'Water repellent (51)' },
//   { label: 'Multipack (30)' },
//   { label: 'Larger Size available (14)' },
//   { label: 'Made in Italy (7)' },
//   { label: 'All-gender (1)' }
// ];

// const materials = [
//   { label: 'Cotton (726)' },
//   { label: 'Silk (17)' },
//   { label: 'Linen (12)' },
//   { label: 'Leather (114)' },
//   { label: 'Wool (197)' },
//   { label: 'Synthetic (401)' },
//   { label: 'Cellulose (37)' },
//   { label: 'Faux-leather (8)' },
// ];

// const patterns = [
//   { label: 'Plain (665)' },
//   { label: 'Patterned (119)' },
//   { label: 'Striped (50)' },
//   { label: 'Melange (44)' },
//   { label: 'Check (27)' },
//   { label: 'Embroidery (14)' },
//   { label: 'Mouline (8)' },
// ];

// const collars = [
//   { label: 'Kent collar (95)' },
//   { label: 'Stand collar (50)' },
//   { label: 'Hooded collar (25)' },
//   { label: 'Spread collar (21)' },
//   { label: 'Button-down collar (19)' },
//   { label: 'Shirt collar (14)' },
//   { label: 'Point collar (6)' },
//   { label: 'Collarless (1)' },
// ];

// const sleeves = [
//   { label: 'Long sleeves (322)' },
//   { label: 'Short sleeves (264)' },
//   { label: 'Sleeveless (1)' },
// ];

// const necklines = [
//   { label: 'Crew neck (218)' },
//   { label: 'Polo collar (147)' },
//   { label: 'Zip neck (77)' },
//   { label: 'Hooded (62)' },
//   { label: 'Turtleneck (11)' },
//   { label: 'V-neck (9)' },
//   { label: 'Collage collar (5)' },
//   { label: 'Ribbed collar (4)' },
//   { label: 'Mock neck (3)' },
//   { label: 'Shawl collar (2)' },
// ];



// const handleFit = () => {
//   setFitList(!fitList);
// };

// const handleFeatures = () => {
//   setFeaturesList(!featuresList);
// };

// const handleMaterial = () => {
//   setMaterialsList(!materialsList);
// };

// const handlePattern = () => {
//   setPatternList(!patternList);
// };

// const handleCollar = () => {
//   setCollarList(!collarList);
// };

// const handleSleeves = () => {
//   setSleevesList(!sleevesList);
// };

// const handlenecklines = () => {
//   setNecklinesList(!necklineList);
// };


{/* Fit */ }
{/* <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleFit}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>FIT</Typography>
                {fitList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={fitList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {fits.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                        <Typography
                          sx={{ display: "flex", alignItems: "center", fontSize: "15px" }}
                        >
                          <Checkbox size="small" /> {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box> */}

{/* Features */ }
{/* <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleFeatures}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>FEATURES</Typography>
                {featuresList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={featuresList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {features.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                        <Typography
                          sx={{ display: "flex", alignItems: "center", fontSize: "15px" }}
                        >
                          <Checkbox size="small" /> {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box> */}

{/* Material */ }
{/* <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleMaterial}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>MATERIAL</Typography>
                {materialsList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={materialsList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {materials.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                        <Typography
                          sx={{ display: "flex", alignItems: "center", fontSize: "15px" }}
                        >
                          <Checkbox size="small" /> {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box> */}

{/* Pattern */ }
{/* <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handlePattern}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>PATTERN</Typography>
                {patternList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={patternList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {patterns.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                        <Typography
                          sx={{ display: "flex", alignItems: "center", fontSize: "15px" }}
                        >
                          <Checkbox size="small" /> {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box> */}

{/* Collar */ }
{/* <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleCollar}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>COLLAR</Typography>
                {collarList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={collarList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {collars.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                        <Typography
                          sx={{ display: "flex", alignItems: "center", fontSize: "15px" }}
                        >
                          <Checkbox size="small" /> {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box> */}

{/* Sleeves */ }
{/* <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleSleeves}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>SLEEVES</Typography>
                {sleevesList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={sleevesList} timeout="auto" unmountOnExit>
                {sleeves.map((item) => (
                  <Box>
                    <Typography
                      sx={{ display: "flex", alignItems: "center", fontSize: "15px" }}
                    >
                      <Checkbox size="small" /> {item.label}
                    </Typography>
                  </Box>
                ))}
              </Collapse>
            </Box> */}

{/* Necklines */ }
{/* <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handlenecklines}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "800" }}>NECKLINES</Typography>
                {necklineList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={necklineList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {necklines.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                        <Typography
                          sx={{ display: "flex", alignItems: "center", fontSize: "15px" }}
                        >
                          <Checkbox size="small" /> {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>*/}


{/* <Button
            sx={{
              bgcolor: 'black',
              color: 'white',
              fontSize: '18px',
              display: 'block',
              fontWeight: '700',
              padding: "20px 0px",
              width: { lg: 450, xs: 320 },
              cursor: 'pointer',
              position: 'fixed',
              bottom: '0px',
              left: '0px',
              borderRadius: '0px',
              '&:hover': { bgcolor: 'black' }
            }}>
            show 1691 results
          </Button> */}