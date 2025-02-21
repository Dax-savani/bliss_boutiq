import React, {useState} from 'react';
import OrderForm from "../../components/Order/OrderForm";
import Order from "../../components/Order/Order";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Box from "@mui/material/Box";
import {Button, Container, Grid} from "@mui/material";
import OrderProduct from "../../components/Order/OrderProduct";

function OrderPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const steps = ['Shipping', 'Address Detail', 'Payment'];

    const totalSteps = () => steps.length;

    const completedSteps = () => Object.keys(completed).length;

    const isLastStep = () => activeStep === totalSteps() - 1;

    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep = isLastStep() && !allStepsCompleted()
            ? steps.findIndex((step, index) => !(index in completed))
            : activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({...completed, [activeStep]: true});
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Container>
            <Box mt={20}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 && <OrderProduct handleComplete={handleComplete}/>}
                {activeStep === 1 && <OrderForm handleComplete={handleComplete}/>}
                {activeStep === 2 && <Order/>}

            </Box>
        </Container>
    );
}

export default OrderPage;
