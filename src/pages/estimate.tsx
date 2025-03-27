import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  useTheme,
} from '@mui/material';
import BasicInfoForm from '../components/estimate/BasicInfoForm';
import ServiceSelectionForm from '../components/estimate/ServiceSelectionForm';
import OptionSelectionForm from '../components/estimate/OptionSelectionForm';
import EstimateResult from '../components/estimate/EstimateResult';
import EstimateHistory from '../components/estimate/EstimateHistory';

const steps = ['痕跡の記録', '記憶の選択', '循環の選択', '痕跡の再構築'];

const EstimatePage: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [estimateData, setEstimateData] = useState({
    basicInfo: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
    },
    services: [],
    options: [],
    totalAmount: 0,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleBasicInfoSubmit = (data: any) => {
    setEstimateData((prev) => ({
      ...prev,
      basicInfo: data,
    }));
    handleNext();
  };

  const handleServiceSubmit = (data: any) => {
    setEstimateData((prev) => ({
      ...prev,
      services: data,
    }));
    handleNext();
  };

  const handleOptionSubmit = (data: any) => {
    setEstimateData((prev) => ({
      ...prev,
      options: data,
    }));
    handleNext();
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicInfoForm onSubmit={handleBasicInfoSubmit} data={estimateData.basicInfo} />;
      case 1:
        return <ServiceSelectionForm onSubmit={handleServiceSubmit} data={estimateData.services} />;
      case 2:
        return <OptionSelectionForm onSubmit={handleOptionSubmit} data={estimateData.options} />;
      case 3:
        return <EstimateResult data={estimateData} />;
      default:
        return '不明なステップです。';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 8 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 300,
            letterSpacing: '0.1em',
          }}
        >
          痕跡の循環
        </Typography>
        
        <Paper 
          sx={{ 
            p: 4, 
            mb: 6,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'serif',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Paper 
          sx={{ 
            p: 4,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {getStepContent(activeStep)}
        </Paper>

        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 300,
              letterSpacing: '0.05em',
            }}
          >
            記憶の履歴
          </Typography>
          <EstimateHistory />
        </Box>
      </Box>
    </Container>
  );
};

export default EstimatePage; 