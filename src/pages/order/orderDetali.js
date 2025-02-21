import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Container, Button } from '@mui/material';
import axiosInstance from '../../Instance';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { format } from 'date-fns';
import toast from "react-hot-toast";
import Loader from '../../Loader';

const steps = ['Placed', 'Confirmed', 'Shipped', 'Delivered'];

const CustomStepIconRoot = styled('div')(({ ownerState }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: ownerState.isRed
    ? '#ff0000'
    : ownerState.completed
      ? '#28a745'
      : ownerState.active
        ? '#28a745'
        : '#ccc',
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
}));

const getActiveStep = (status) => {
  if (!status) return 0;
  if (status.toLowerCase() === 'cancelled') {
    return steps.indexOf('Shipped');
  }
  return steps.indexOf(status.charAt(0).toUpperCase() + status.slice(1).toLowerCase());
};

function CustomStepIcon(props) {
  const { active, completed, status, index, label } = props;

  const isCancelled = label === "Cancelled";
  const isRed = isCancelled || (status?.toLowerCase() === 'cancelled' && index > getActiveStep(status));

  return (
    <CustomStepIconRoot ownerState={{ active, completed, status, isRed }}>
      {completed || active ? <Check /> : <div />}
    </CustomStepIconRoot>
  );
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  status: PropTypes.string,
  index: PropTypes.number,
  label: PropTypes.string,
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderWidth: 3,
  },
  [`&.Mui-active .${stepConnectorClasses.line}, &.Mui-completed .${stepConnectorClasses.line}`]: {
    borderColor: '#28a745',
  },
}));

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/order/${id}`);
      setOrder(response.data);
    } catch (err) {
      setError("Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handleCancelOrder = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this order?'));

    if (order.status === 'delivered' || order.status === 'cancelled') {
      alert('Order cannot be canceled as it is already delivered or cancelled.');
      return;
    }

    try {
      const response = await axiosInstance.put(`/api/order/${id}`, { status: 'cancelled' });

      if (response.status === 200) {
        setOrder((prevOrder) => ({ ...prevOrder, status: 'cancelled' }));
        toast.success('Order cancelled successfully.');
        fetchOrderDetails(); // Call this function to refresh order details
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order. Please try again.');
    }
  }

  // Function to update steps based on status
  const getUpdatedSteps = (status) => {
    const stepOrder = ['Placed', 'Confirmed', 'Shipped', 'Delivered'];

    if (status?.toLowerCase() === 'cancelled') {
      const activeStep = getActiveStep(status);
      stepOrder[activeStep] = 'Cancelled';
    }

    return stepOrder;
  };

  const stepsForOrder = getUpdatedSteps(order?.status);

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!order) return <Typography>No order details available.</Typography>;

  return (
    <Box mt={{ xs: '50px', md: '100px' }} p={{ xs: 2, md: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ borderBottom: '1px solid #000', mb: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography className='lato' sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 600 }}>
            Order Details :
          </Typography>
          <Box>
            {order?.status !== 'cancelled' && order?.status !== 'delivered' && (
              <Button
                variant="contained"
                color="error"
                sx={{
                  ml: { xs: 0, sm: 14 },
                  mt: { xs: 2, md: 0 },
                  width: { xs: "100%", sm: "200px" },
                  height: { xs: "40px", sm: "50px" },
                  textTransform: "unset",
                  border: "1px solid black",
                  padding: { xs: "8px 12px", sm: "5px 10px" },
                  fontSize: { xs: "14px", sm: "16px" },
                  fontWeight: "500",
                  borderRadius: "0px",
                  boxShadow: "none",
                  bgcolor: '#fff',
                  color: '#000',
                  "&:hover": {
                    backgroundColor: "#000000",
                    color: '#fff',
                    boxShadow: "none",
                  },
                }}
                onClick={() => handleCancelOrder(order._id)}
              >
                Cancel Order
              </Button>
            )}
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12} lg={8}>
            <Box sx={{ p: 2, border: '1px solid #ddd' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, borderBottom: '1px solid #000', py: 3 }}>
                <Box sx={{ width: '100%', maxWidth: '100px', mx: { xs: 'auto', sm: 4 }, mb: { xs: 2, md: 0 } }}>
                  <img src={order?.color?.product_images[0]} alt={order?.product_id?.title} style={{ width: '100%', height: 'auto' }} />
                </Box>
                <Box sx={{ mx: { xs: 1, md: 4 }, flex: 1 }}>
                  <Typography className='lato' sx={{ fontSize: { xs: 14, sm: 16, md: 20 }, fontWeight: 600, my: 1 }}>{order.product_id?.title}</Typography>
                  <Typography className='lato' sx={{ fontSize: { xs: 14, sm: 16, md: 20 }, fontWeight: 600, my: 1 }}>Ordered on <Typography component={'span'} sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }}>{order?.createdAt ? format(new Date(order.createdAt), 'MMMM d, yyyy') : "N/A"}</Typography></Typography>
                  <Typography className='lato' sx={{ fontSize: { xs: 14, sm: 16, md: 20 }, fontWeight: 600, my: 1 }}>Color: <Typography component={'span'} sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }}>{order?.color?.color || 'N/A'}</Typography></Typography>
                  <Typography className='lato' sx={{ fontSize: { xs: 14, sm: 16, md: 20 }, fontWeight: 600, my: 1 }}>Size: <Typography component={'span'} sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }}>{order?.size || 'N/A'}</Typography></Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  gap: { xs: 2, md: 4 },
                  alignItems: { xs: "center", md: "flex-start" }
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    ml: { xs: 0, md: 4 },
                    spacing: 4,
                    my: "40px"
                  }}
                >
                  <Stepper
                    activeStep={getActiveStep(order?.status)}
                    orientation="vertical"
                    connector={<CustomConnector />}
                  >
                    {stepsForOrder.map((label, index) => (
                      <Step key={index}>
                        <StepLabel
                          StepIconComponent={(props) => (
                            <CustomStepIcon {...props} status={order?.status} label={label} />
                          )}
                        >
                          {label === "Cancelled" ? (
                            <Typography sx={{ color: "red", fontWeight: "bold" }}>Cancelled</Typography>
                          ) : (
                            label
                          )}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Stack>

                <Box
                  p={1}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography className="lato" sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, my: 3 }}>
                    Order ID: {order._id}
                  </Typography>
                  <Typography className="lato" sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, my: 3 }}>
                    Ordered Update: {format(new Date(order.updatedAt), "MMMM d, yyyy")}
                  </Typography>
                  <Typography className="lato" sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, my: 3 }}>
                    Status:
                    <Typography
                      className="lato"
                      component="span"
                      sx={{
                        fontSize: { xs: 14, sm: 16, md: 20 },
                        fontWeight: 600,
                        my: 1, ml: 1,
                        color: order.status === "cancelled" ? "red" : "green"
                      }}
                    >
                      {order.status}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <Box sx={{ p: 2, border: '1px solid #ddd', mb: 1 }}>
              <Typography className='lato' sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 600, my: 2, borderBottom: "2px solid black", pb: 1 }}>Address Details:</Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 600, my: 1 }}>Name: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 }, ml: 1 }} > {order?.user_id?.first_name} {order?.user_id?.last_name}</Typography></Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 600, my: 1 }}>Address: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 }, ml: 1 }} >{order?.user_id?.address_details?.address_1}</Typography></Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 600, my: 1 }}>City: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 }, ml: 1 }} >{order?.user_id?.address_details?.city}</Typography></Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 600, my: 1 }}>State: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 }, ml: 1 }} >{order?.user_id?.address_details?.state}</Typography></Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 600, my: 1 }}>Country: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 }, ml: 1 }} >{order?.user_id?.address_details?.country}</Typography></Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 600, my: 1 }}>Zip Code: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 }, ml: 1 }} >{order?.user_id?.address_details?.zipcode}</Typography></Typography>
            </Box>
            <Box sx={{ p: 2, py: 4, border: '1px solid #ddd' }}>
              <Typography className='lato' sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 600, my: 2, borderBottom: "2px solid black", pb: 1 }}>Bill Details:</Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 16, md: 20 }, my: 1, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>Original Price: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 }, color: '#999' }}>₹{order?.color?.price?.original_price || 'N/A'}</Typography></Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 16, md: 20 }, my: 1, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}> Discounted Price: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 } }}>₹{order?.color?.price?.discounted_price || 'N/A'}</Typography> </Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 16, md: 20 }, my: 1, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>Quantity: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 } }}>{order?.qty || 1}</Typography></Typography>
              <Typography className='lato' sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 700, my: 2, borderTop: "2px solid black", pt: 1, display: 'flex', justifyContent: 'space-between' }}>Total Amount: <Typography component={'span'} sx={{ fontSize: { xs: 16, md: 20 } }}>₹{(order?.color?.price?.discounted_price * order?.qty) || 'N/A'}</Typography></Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrderDetail;
