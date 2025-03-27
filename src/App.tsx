import React, { useState } from 'react';
import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { theme } from './theme';
import BasicInfoForm from './components/estimate/BasicInfoForm';
import ServiceSelectionForm from './components/estimate/ServiceSelectionForm';
import OptionSelectionForm from './components/estimate/OptionSelectionForm';
import EstimateResult from './components/estimate/EstimateResult';
import TopPage from './pages/TopPage';
import PricePage from './pages/PricePage';
import EstimatePage from './pages/EstimatePage';

const steps = ['痕跡の記録', '記憶の選択', '循環の選択', '痕跡の再構築'];

interface BasicInfo {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'memory' | 'trace' | 'cycle';
}

interface Option {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  category: 'memory' | 'trace' | 'cycle';
}

interface FormData {
  basicInfo: BasicInfo;
  services: Service[];
  options: Option[];
  totalAmount: number;
}

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
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

  const calculateTotal = (services: Service[], options: Option[]) => {
    const servicesTotal = services.reduce((sum, service) => sum + service.price, 0);
    const optionsTotal = options.reduce((sum, option) => {
      const quantity = option.quantity || 1;
      return sum + option.price * quantity;
    }, 0);
    return servicesTotal + optionsTotal;
  };

  const handleBasicInfoSubmit = (data: BasicInfo) => {
    setFormData((prev) => ({ ...prev, basicInfo: data }));
    setActiveStep((prev) => prev + 1);
  };

  const handleServiceSubmit = (data: Service[]) => {
    setFormData((prev) => ({
      ...prev,
      services: data,
      totalAmount: calculateTotal(data, prev.options),
    }));
    setActiveStep((prev) => prev + 1);
  };

  const handleOptionSubmit = (data: Option[]) => {
    setFormData((prev) => ({
      ...prev,
      options: data,
      totalAmount: calculateTotal(prev.services, data),
    }));
    setActiveStep((prev) => prev + 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = (data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [Object.keys(data)[0]]: Object.values(data)[0],
    }));
    handleNext();
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicInfoForm onSubmit={handleFormSubmit} />;
      case 1:
        return <ServiceSelectionForm onSubmit={handleFormSubmit} />;
      case 2:
        return <OptionSelectionForm onSubmit={handleFormSubmit} />;
      case 3:
        return <EstimateResult formData={formData} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route
              path="/estimate"
              element={
                <Container>
                  <Box sx={{ width: '100%', mt: 4 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    <Box sx={{ mt: 4 }}>{getStepContent(activeStep)}</Box>
                  </Box>
                </Container>
              }
            />
            <Route path="/price" element={<PricePage />} />
            <Route path="/estimate" element={<EstimatePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App; 