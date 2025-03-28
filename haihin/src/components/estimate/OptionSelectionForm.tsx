import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';

interface Option {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  category: 'memory' | 'trace' | 'cycle';
}

const options: Option[] = [
  {
    id: 'secure-transport',
    name: '安全な輸送',
    description: '痕跡を守るための専用輸送サービス',
    price: 10000,
    category: 'trace',
  },
  {
    id: 'data-erasure',
    name: 'データ消去証明',
    description: '記憶の消去を証明する書類の発行',
    price: 50000,
    category: 'memory',
  },
  {
    id: 'art-documentation',
    name: 'アート化プロセス記録',
    description: '変容の過程を記録するドキュメント',
    price: 50000,
    quantity: 1,
    category: 'cycle',
  },
  {
    id: 'exhibition',
    name: '展示会参加',
    description: '再構築された作品の展示会への参加',
    price: 100000,
    category: 'cycle',
  },
];

interface OptionSelectionFormProps {
  onSubmit: (data: Option[]) => void;
  data: Option[];
}

const OptionSelectionForm: React.FC<OptionSelectionFormProps> = ({
  onSubmit,
  data,
}) => {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(data);

  const handleOptionToggle = (option: Option) => {
    setSelectedOptions((prev) => {
      const isSelected = prev.some((o) => o.id === option.id);
      if (isSelected) {
        return prev.filter((o) => o.id !== option.id);
      } else {
        return [...prev, { ...option, quantity: option.quantity || 1 }];
      }
    });
  };

  const handleQuantityChange = (optionId: string, quantity: number) => {
    setSelectedOptions((prev) =>
      prev.map((option) =>
        option.id === optionId ? { ...option, quantity } : option
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedOptions);
  };

  const getCategoryColor = (category: Option['category']) => {
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
        循環の選択
      </Typography>
      <Grid container spacing={3}>
        {options.map((option) => (
          <Grid item xs={12} key={option.id}>
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
                    checked={selectedOptions.some((o) => o.id === option.id)}
                    onChange={() => handleOptionToggle(option)}
                    sx={{
                      color: getCategoryColor(option.category),
                      '&.Mui-checked': {
                        color: getCategoryColor(option.category),
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: getCategoryColor(option.category),
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {option.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1, fontStyle: 'italic' }}
                    >
                      {option.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: getCategoryColor(option.category),
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      ¥{option.price.toLocaleString()}
                    </Typography>
                    {option.quantity !== undefined && (
                      <TextField
                        type="number"
                        label="数量"
                        value={
                          selectedOptions.find((o) => o.id === option.id)
                            ?.quantity || 1
                        }
                        onChange={(e) =>
                          handleQuantityChange(option.id, parseInt(e.target.value))
                        }
                        inputProps={{ min: 1 }}
                        size="small"
                        sx={{
                          mt: 1,
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: getCategoryColor(option.category),
                            },
                            '&:hover fieldset': {
                              borderColor: getCategoryColor(option.category),
                            },
                          },
                        }}
                      />
                    )}
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

export default OptionSelectionForm; 