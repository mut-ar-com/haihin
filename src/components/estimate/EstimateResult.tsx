import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  useTheme,
} from '@mui/material';

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

interface BasicInfo {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

interface EstimateResultProps {
  data: {
    basicInfo: BasicInfo;
    services: Service[];
    options: Option[];
    totalAmount: number;
  };
}

const EstimateResult: React.FC<EstimateResultProps> = ({ data }) => {
  const theme = useTheme();

  const calculateTotal = () => {
    const servicesTotal = data.services.reduce((sum, service) => sum + service.price, 0);
    const optionsTotal = data.options.reduce((sum, option) => {
      const quantity = option.quantity || 1;
      return sum + option.price * quantity;
    }, 0);
    return servicesTotal + optionsTotal;
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

  const totalAmount = calculateTotal();

  return (
    <Box>
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
        痕跡の再構築
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
          }}
        >
          基本情報
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              組織名
            </Typography>
            <Typography variant="body1">{data.basicInfo.companyName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              担当者名
            </Typography>
            <Typography variant="body1">{data.basicInfo.contactName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              メールアドレス
            </Typography>
            <Typography variant="body1">{data.basicInfo.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              電話番号
            </Typography>
            <Typography variant="body1">{data.basicInfo.phone}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
          }}
        >
          選択された記憶
        </Typography>
        {data.services.map((service) => (
          <Box key={service.id} sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: getCategoryColor(service.category),
                fontWeight: 500,
              }}
            >
              {service.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
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
        ))}
      </Paper>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
          }}
        >
          選択された循環
        </Typography>
        {data.options.map((option) => (
          <Box key={option.id} sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: getCategoryColor(option.category),
                fontWeight: 500,
              }}
            >
              {option.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {option.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: getCategoryColor(option.category),
                fontWeight: 500,
              }}
            >
              ¥{option.price.toLocaleString()}
              {option.quantity && option.quantity > 1 && ` × ${option.quantity}`}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          総額
        </Typography>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            color: theme.palette.primary.main,
            fontWeight: 300,
          }}
        >
          ¥{totalAmount.toLocaleString()}
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={() => window.print()}
          sx={{
            py: 2,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.9)',
            },
          }}
        >
          痕跡を印刷
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          size="large"
          onClick={() => window.location.href = '/estimate/new'}
          sx={{
            py: 2,
            borderColor: 'rgba(0, 0, 0, 0.8)',
            '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.9)',
            },
          }}
        >
          新しい痕跡
        </Button>
      </Box>
    </Box>
  );
};

export default EstimateResult; 