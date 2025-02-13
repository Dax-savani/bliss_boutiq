import React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";
import Collapse from "@mui/material/Collapse";
import { Checkbox, Grid, Typography, Box, Drawer, Button, List, ListItemButton,  } from "@mui/material";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CloseIcon from '@mui/icons-material/Close';


const category = [
  { label: "Shoes (120)" },
  { label: "Suits (48)" },
  { label: "Shirt (141)" },
  { label: "Sweaters (107)" },
  { label: "Cardigans (12)" },
  { label: "Sweatshirts (63)" },
  { label: "Jackets (149)" },
  { label: "Coats (34)" },
  { label: "Jeans (81)" },
  { label: "Trousers (177)" },
  { label: "Polo Shirts (149)" },
  { label: "T-Shirts (141)" },
  { label: "Shorts (19)" },
  { label: "Blazers (76)" },
  { label: "Underwear (32)" },
  { label: "Waistcoats (3)" },
  { label: "Loungewear (17)" },
  { label: "Nightwear (21)" },
  { label: "Beachwear (44)" },
  { label: "Socks (19)" },
  { label: "Belts (26)" },
  { label: "Bags (18)" },
  { label: "Watches (23)" },
  { label: "Sunglasses (40)" },
  { label: "Scarves (4)" },
  { label: "Caps (11)" },
  { label: "Beanies (6)" },
  { label: "Gloves (2)" },
  { label: "Wallets (8)" },
  { label: "Jewellery (18)" },
  { label: "Ties (12)" },
  { label: "Bow Ties (3)" },
  { label: "Pocket Squares (5)" },
  { label: "Bathrobes (1)" },
  { label: "Lifestyle (1)" },
];

const size = [
  { row: ["XS", "S", "M", "L", "XL"] },
  { row: ["XXL", "XXXL", "8", "25", "26"] },
  { row: ["27", "29", "35", "36", "37"] },
  { row: ["38", "39", "39.5", "40", "40.5"] },
  { row: ["41", "41.5", "42", "42.5", "43"] },
  { row: ["43.5", "44", "44.5", "45", "45.5"] },
  { row: ["46", "47", "48", "49", "50"] },
  { row: ["52", "54", "56", "58", "60"] },
  { row: ["62", "64", "66", "80", "85"] },
  { row: ["90", "94", "95", "98", "100"] },
  { row: ["102", "105", "106", "110", "115"] },
  { row: ["29/32", "29/34", "30/32", "30/34", "31/32"] },
  { row: ["31/34", "32/30", "32/32", "32/34", "32/36"] },
  { row: ["33/30", "33/32", "33/34", "33/36", "34/30"] },
  { row: ["34/32", "34/34", "34/36", "35/30", "35/32"] },
  { row: ["35/34", "35/36", "35/38", "36/30", "36/32"] },
  { row: ["36/34", "36/36", "38/30", "38/32", "38/34"] },
  { row: ["38/36", "38L", "39/40", "39/42", "39L"] },
  { row: ["40/32", "40/34", "40/46", "40L", "41/42"] },
  { row: ["41L", "42/34", "42A", "42L", "43/44"] },
  { row: ["43/46", "43A", "43L", "44A", "44L"] },
  { row: ["45/46", "47/50", "4XL", "56A", "5XL"] },
  { row: ["ONESI"] },
];

const colorOptions = [
  { name: "Blue (84)", color: "Blue" },
  { name: "Black (84)", color: "black" },
  { name: "White (84)", color: "white" },
  { name: "Beige (71)", color: "#f5f5dc" },
  { name: "Grey (46)", color: "grey" },
  { name: "Natur (34)", color: "#e3dac9" },
  { name: "Green (30)", color: "green" },
  { name: "Red (27)", color: "red" },
  { name: "Brown (23)", color: "brown" },
  { name: "Purple (11)", color: "purple" },
  { name: "Pink (7)", color: "pink" },
  { name: "Orange (3)", color: "orange" },
  { name: "Silver (1)", color: "silver" },
  { name: "Yellow (1)", color: "yellow" },
];

const fits = [
  { label: 'Slim Fit (324)'},
  { label: 'Regular Fit (694)'},
  { label: 'Relaxed Fit (115)'},
  { label: 'Extra Slim Fit (1)'},
  { label: 'Tapered Fit (1)'}
];

const features = [
  { label: 'Water repellent (51)'},
  { label: 'Multipack (30)'},
  { label: 'Larger Size available (14)'},
  { label: 'Made in Italy (7)'},
  { label: 'All-gender (1)'}
];

const materials = [
  { label: 'Cotton (726)'},
  { label: 'Silk (17)'},
  { label: 'Linen (12)'},
  { label: 'Leather (114)'},
  { label: 'Wool (197)'},
  { label: 'Synthetic (401)'},
  { label: 'Cellulose (37)'},
  { label: 'Faux-leather (8)'},
];

const patterns = [
  { label: 'Plain (665)'},
  { label: 'Patterned (119)'},
  { label: 'Striped (50)'},
  { label: 'Melange (44)'},
  { label: 'Check (27)'},
  { label: 'Embroidery (14)'},
  { label: 'Mouline (8)'},
];

const collars = [
  { label: 'Kent collar (95)'},
  { label: 'Stand collar (50)'},
  { label: 'Hooded collar (25)'},
  { label: 'Spread collar (21)'},
  { label: 'Button-down collar (19)'},
  { label: 'Shirt collar (14)'},
  { label: 'Point collar (6)'},
  { label: 'Collarless (1)'},
];

const sleeves = [
  { label: 'Long sleeves (322)'},
  { label: 'Short sleeves (264)'},
  { label: 'Sleeveless (1)'},
];

const necklines = [
  { label: 'Crew neck (218)'},
  { label: 'Polo collar (147)'},
  { label: 'Zip neck (77)'},
  { label: 'Hooded (62)'},
  { label: 'Turtleneck (11)'},
  { label: 'V-neck (9)'},
  { label: 'Collage collar (5)'},
  { label: 'Ribbed collar (4)'},
  { label: 'Mock neck (3)'},
  { label: 'Shawl collar (2)'},
];

const DrawerFilter = () => {

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [sizeList, setSizeList] = React.useState(false);
  const [colorList, setColorList] = React.useState(false);
  const [fitList, setFitList] = React.useState(true);
  const [featuresList, setFeaturesList] = React.useState(false);
  const [materialsList, setMaterialsList] = React.useState(false);
  const [patternList, setPatternList] = React.useState(false);
  const [collarList, setCollarList] = React.useState(false);
  const [sleevesList, setSleevesList] = React.useState(false);
  const [necklineList, setNecklinesList] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickSize = () => {
    setSizeList(!sizeList);
  };

  const handleClickColor = () => {
    setColorList(!colorList);
  };

  const handleFit = () => {
    setFitList(!fitList);
  };

  const handleFeatures = () => {
    setFeaturesList(!featuresList);
  };

  const handleMaterial = () => {
    setMaterialsList(!materialsList);
  };

  const handlePattern = () => {
    setPatternList(!patternList);
  };

  const handleCollar = () => {
    setCollarList(!collarList);
  };

  const handleSleeves = () => {
    setSleevesList(!sleevesList);
  };

  const handlenecklines = () => {
    setNecklinesList(!necklineList);
  };

  return (
    <div>
      <Button
        onClick={handleDrawerOpen}
        sx={{
          bgcolor: "#000",
          borderRadius: "8px",
          "&:hover": {
            bgcolor: "#000",
            boxShadow: "none",
          },
        }}
      >
        <Typography sx={{ color: "#fff", mx: 2 }}>Filter</Typography>
        <TuneIcon sx={{ color: "#FFF", mx: 2 }} />
      </Button>
      <Drawer open={openDrawer}>
      <Typography sx={{textAlign:"center",fontWeight:"900",pt:"5px"}}>SELECT FILTER</Typography>
      <Box sx={{display:"flex",justifyContent:"end",padding:"20px 30px 0px 30px",cursor:"pointer"}} onClick={handleDrawerClose}><CloseIcon /></Box>
        <Box
          sx={{ width: 450, display: "flex", justifyContent: "center" }}
          role="presentation"
          onClick={handleDrawerOpen}
        >
          <List
            sx={{ width: "100%", maxWidth: 430, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {/* Category */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleClick}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>CATEGORY</Typography>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {category.map((item) => (
                    <Grid item xs={6}>
                      <Typography
                        sx={{ display: "flex", gap: 1, alignItems: "center",fontSize:"15px" }}
                      >
                        <Checkbox /> {item.label}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Size */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleClickSize}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>SIZE</Typography>
                {sizeList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={sizeList} timeout="auto" unmountOnExit>
                {size.map((group, index) => (
                  <List
                    component="div"
                    key={index}
                    disablePadding
                    sx={{ display: "flex", pt: 2 }}
                  >
                    {group.row.map((item, ind) => (
                      <Grid
                        item
                        container
                        xs={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Grid item xs={6} key={ind}>
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              mb: "10px",
                              cursor: "pointer",
                              "&:hover": {
                                bgcolor: "#000",
                                color: "#fff",
                              },
                              fontSize:"15px"
                            }}
                          >
                            {item}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </List>
                ))}
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
                  fontWeight: "900",
                }}
              >
                {" "}
                <SportsGolfIcon
                  fontSize="medium"
                  sx={{
                    backgroundColor: "#1E8479",
                    color: "#FFF",
                    borderRadius: "50%",
                  }}
                />{" "}
                What’s my size?
              </Typography>
              <ErrorOutlineRoundedIcon fontSize="medium" />
            </Box>

            {/* Color */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleClickColor}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>COLOR</Typography>
                {colorList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={colorList} timeout="auto" unmountOnExit>
                <Grid
                  item
                  container
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                  spacing={1}
                >
                  {colorOptions.map((item) => (
                    <Grid item xs={5}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          mt: 2,
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          sx={{
                            border: "1px solid black",
                            height: "25px",
                            width: "25px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              height: "19px",
                              width: "19px",
                              backgroundColor: item.color,
                              textAlign: "center",
                            }}
                          ></Typography>
                        </Box>
                        <Typography sx={{ color: "balck",fontSize:"15px" }}>
                          {item.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Fit */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleFit}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>FIT</Typography>
                {fitList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={fitList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {fits.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                         <Typography
                           sx={{ display: "flex", alignItems: "center",fontSize:"15px" }}
                         >
                           <Checkbox /> {item.label}
                         </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Features */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleFeatures}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>FEATURES</Typography>
                {featuresList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={featuresList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {features.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                         <Typography
                           sx={{ display: "flex", alignItems: "center",fontSize:"15px" }}
                         >
                           <Checkbox /> {item.label}
                         </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Material */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleMaterial}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>MATERIAL</Typography>
                {materialsList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={materialsList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {materials.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                         <Typography
                           sx={{ display: "flex", alignItems: "center",fontSize:"15px" }}
                         >
                           <Checkbox /> {item.label}
                         </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Pattern */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handlePattern}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>PATTERN</Typography>
                {patternList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={patternList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {patterns.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                         <Typography
                           sx={{ display: "flex", alignItems: "center",fontSize:"15px" }}
                         >
                           <Checkbox /> {item.label}
                         </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Collar */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleCollar}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>COLLAR</Typography>
                {collarList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={collarList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {collars.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                         <Typography
                           sx={{ display: "flex", alignItems: "center",fontSize:"15px" }}
                         >
                           <Checkbox /> {item.label}
                         </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Sleeves */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handleSleeves}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>SLEEVES</Typography>
                {sleevesList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={sleevesList} timeout="auto" unmountOnExit>
                  {sleeves.map((item) => (
                      <Box>
                         <Typography
                           sx={{ display: "flex", alignItems: "center",fontSize:"15px" }}
                         >
                           <Checkbox /> {item.label}
                         </Typography>
                      </Box>
                  ))}
              </Collapse>
            </Box>

            {/* Necklines */}
            <Box sx={{ borderBottom: "1px solid #ccc", py: 2 }}>
              <ListItemButton
                onClick={handlenecklines}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: "900" }}>NECKLINES</Typography>
                {necklineList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={necklineList} timeout="auto" unmountOnExit>
                <Grid item container xs={12}>
                  {necklines.map((item) => (
                    <Grid item xs={6}>
                      <Box>
                         <Typography
                           sx={{ display: "flex", alignItems: "center",fontSize:"15px" }}
                         >
                           <Checkbox /> {item.label}
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

export default DrawerFilter;