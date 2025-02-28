import React, { useEffect, useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import axiosInstance from '../../Instance';
import { useNavigate } from 'react-router-dom';

const SortDropdown = ({updatedCategories}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Sort');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/api/product');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [selectedOption]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option.label);
    handleClose();
  };  

  const options = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price (low-high)', value: 'price-low-high' },
    { label: 'Price (high-low)', value: 'price-high-low' },
  ];

  return (
    <div>
      <Button
        variant="outlined"
        endIcon={<SortIcon />}
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          color: 'black',
          border: '1px solid #000',
          fontWeight: 'bold',
          borderRadius: '8px',
          p: '6px 5px 6px 8px',
          "&:hover": {
            bgcolor: "#FFF",
            boxShadow: "none",
            borderColor: '#000',
          },
        }}
      >
        {selectedOption}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            marginTop: '4px',
            minWidth: '190px',
            border: '1px solid #000',
            borderRadius: '0px',
            boxShadow: 'none',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
          key={index}
          onClick={() => {
            handleMenuItemClick(option);
            navigate(`/product?sort=${option.value}&&categoryId=${updatedCategories.join(",")}`);
          }}
          sx={{
            py: 1,
            fontSize: '16px',
            fontWeight: 'bold',
            color: selectedOption === option.label ? '#fff' : 'black',
            bgcolor: selectedOption === option.label ? '#000' : 'transparent',
            '&:hover': { backgroundColor: '#000', color: '#fff' },
          }}
        >
          {option.label}
        </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SortDropdown;
