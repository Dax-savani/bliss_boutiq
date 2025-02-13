// import React, {useEffect, useState} from "react";
// import ProductListing from "../../components/Home/ProductListing";
// import Product from "../../components/product/Product";
// import Hero from "../../components/product/Hero";
// import CategorySection from "../../components/product/CategorySection";
// import img from "../../assets/images/product/hero/1.webp";
// import img1
//     from "../../assets/images/product/hero/240816_HBME_112_WI24_BOSS_Global_Campaign_Gisele_Look2_Hero_001_1920x880.webp";
// import {Box, Typography} from "@mui/material";
// import DrawerList from "../filter/DrawerList";
// import SortDropdown from "../filter/SortDropdown";
// import Loader from "../../Loader";
// import {useLocation} from "react-router-dom";
//
// const ProductPage = () => {
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     const handleCategorySelect = (categoryId) => {
//         setSelectedCategory(categoryId);
//     };
//
//
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 2000);
//         return () => clearTimeout(timer);
//     }, []);
//
//     const path = useLocation();
//
//     const titel = path.search.split('=')[2]
//     const titel1 = path.search.split('=')[1]
//
//     return (
//         <div>
//             {loading ? (<Loader/>) : (
//                 <>
//                     <Hero img={img}/>
//                     <CategorySection onCategorySelect={handleCategorySelect}/>
//
//                     <Box
//                         sx={{
//                             mt: "100px",
//                             mb: {xs: "20px", sm: "25px", md: "30px"},
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                         }}
//                     >
//                         <Typography
//                             variant="h1"
//                             className="lato"
//                             sx={{
//                                 fontSize: {xs: "24px", sm: "30px", md: "38px"},
//                                 fontWeight: "900",
//                                 lineHeight: 1,
//                                 textTransform: "uppercase",
//                                 textAlign: "center",
//                             }}
//                         >
//                             {
//                                 titel ? (
//                                     <Box>
//                                         All {titel || titel1} Products
//                                     </Box>
//                                 ) : (
//                                     <Box>
//                                         All Products
//                                     </Box>
//                                 )
//                             }
//                         </Typography>
//                     </Box>
//
//                     {/* Main Content */}
//                     <Box sx={{width: "100%", px: {xs: "0px", sm: "30px"}}}>
//                         {/* Header with Filter Button */}
//                         <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", mb: 3,}}>
//                             <Box sx={{
//                                 bgcolor: "#FFF",
//                                 borderRadius: "8px",
//                                 boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//                                 p: 0.5,
//                                 display: "flex",
//                                 gap: 1,
//                             }}>
//                                 <DrawerList/>
//                                 <SortDropdown/>
//                             </Box>
//                         </Box>
//                     </Box>
//
//                     <ProductListing selectedCategory={selectedCategory}/>
//                 </>
//             )}
//         </div>
//     );
// };
//
// export default ProductPage;


import React, {useEffect, useState} from "react";
import ProductListing from "../../components/Home/ProductListing";
import Hero from "../../components/product/Hero";
import CategorySection from "../../components/product/CategorySection";
import imgMen from "../../assets/images/product/hero/1.webp"; // Hero image for Men
import imgWomen
    from "../../assets/images/product/hero/240816_HBME_112_WI24_BOSS_Global_Campaign_Gisele_Look2_Hero_001_1920x880.webp"; // Hero image for Women
import {Box, Typography} from "@mui/material";
import DrawerList from "../filter/DrawerList";
import SortDropdown from "../filter/SortDropdown";
import Loader from "../../Loader";
import {useLocation} from "react-router-dom";

const ProductPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const path = useLocation();
    const gender = new URLSearchParams(path.search).get("gender") || "default";
    const heroImage = gender === "male" ? imgMen : gender === "female" ? imgWomen : imgMen;

    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <Hero img={heroImage}/> {/* Show Hero Image based on selected category */}

                    <CategorySection onCategorySelect={handleCategorySelect}/>

                    <Box
                        sx={{
                            mt: "100px",
                            mb: {xs: "20px", sm: "25px", md: "30px"},
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h1"
                            className="lato"
                            sx={{
                                fontSize: {xs: "24px", sm: "30px", md: "38px"},
                                fontWeight: "900",
                                lineHeight: 1,
                                textTransform: "uppercase",
                                textAlign: "center",
                            }}
                        >
                            {gender ? (
                                <Box>All {gender} Products</Box>
                            ) : (
                                <Box>All Products</Box>
                            )}
                        </Typography>
                    </Box>

                    {/* Main Content */}
                    <Box sx={{width: "100%", px: {xs: "0px", sm: "30px"}}}>
                        {/* Header with Filter Button */}
                        <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", mb: 3}}>
                            <Box
                                sx={{
                                    bgcolor: "#FFF",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                    p: 0.5,
                                    display: "flex",
                                    gap: 1,
                                }}
                            >
                                <DrawerList/>
                                <SortDropdown/>
                            </Box>
                        </Box>
                    </Box>

                    {/* Pass selected category to ProductListing */}
                    <ProductListing selectedCategory={selectedCategory}/>
                </>
            )}
        </div>
    );
};

export default ProductPage;