import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
  useTheme,
} from '@mui/material';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'memory' | 'trace' | 'cycle';
}

const services: Service[] = [
  {
    id: 'digital-memory',
    name: 'デジタル記憶の回収',
    description: '電子機器に刻まれた記憶の回収と保存',
    price: 500000,
    category: 'memory',
  },
  {
    id: 'physical-trace',
    name: '物理的痕跡の回収',
    description: 'オフィス家具や設備に残された痕跡の回収',
    price: 800000,
    category: 'trace',
  },
  {
    id: 'data-cycle',
    name: 'データの循環',
    description: '保存されたデータの安全な消去と再構築',
    price: 300000,
    category: 'cycle',
  },
  {
    id: 'art-transformation',
    name: 'アートへの変容',
    description: '回収物のアート作品への変容プロセス',
    price: 200000,
    category: 'cycle',
  },
];

interface ServiceSelectionFormProps {
  onSubmit: (data: Service[]) => void;
  data: Service[];
}

const ServiceSelectionForm: React.FC<ServiceSelectionFormProps> = ({
  onSubmit,
  data,
}) => {
  const theme = useTheme();
  const [selectedServices, setSelectedServices] = useState<Service[]>(data);

  const handleServiceToggle = (service: Service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.id === service.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedServices);
  };

  const getCategoryColor = (category: Service['category']) => {
    switch (category) {
      case 'memory':
        return theme.palette.primary.main;
      case 'trace':
        return theme.palette.secondary.main;
      case 'cycle':
        return theme.palette.success.main;
      default:
        return theme.palette.text.primary;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: 'center',
          mb: 4,
          fontWeight: 300,
          letterSpacing: '0.05em',
        }}
      >
        記憶の選択
      </Typography>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} key={service.id}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedServices.some((s) => s.id === service.id)}
                    onChange={() => handleServiceToggle(service)}
                    sx={{
                      color: getCategoryColor(service.category),
                      '&.Mui-checked': {
                        color: getCategoryColor(service.category),
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: getCategoryColor(service.category),
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {service.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1, fontStyle: 'italic' }}
                    >
                      {service.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: getCategoryColor(service.category),
                        fontWeight: 500,
                      }}
                    >
                      ¥{service.price.toLocaleString()}
                    </Typography>
                  </Box>
                }
              />
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              mt: 2,
              py: 2,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            次のステップへ
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceSelectionForm; 