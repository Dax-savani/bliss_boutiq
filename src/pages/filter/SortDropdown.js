import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

const SortDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Sort');
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option); // Update the button text
    handleClose();
  };

  const options = [
    'Sort',
    'Most Popular',
    'Newest',
    'Price (low-high)',
    'Price (high-low)',
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
            onClick={() => handleMenuItemClick(option)}
            sx={{
              py: 1,
              fontSize: '16px',
              fontWeight: 'bold',
              color: selectedOption === option ? '#fff' : 'black',
              bgcolor: selectedOption === option ? '#000' : 'transparent',
              '&:hover': { backgroundColor: '#000', color: '#fff' },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SortDropdown;
