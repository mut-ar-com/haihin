import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  useTheme,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Helmet } from 'react-helmet-async';
import { items, options } from '../data/items';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const EstimatePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleItemQuantityChange = (itemId: string, change: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }));
  };

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const handleFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const basePrice = 4400;
  const itemsSubtotal = useMemo(() => {
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const item = items.find((i) => i.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  }, [selectedItems]);

  const optionsTotal = useMemo(() => {
    return Object.entries(selectedOptions).reduce((total, [optionId, isSelected]) => {
      if (!isSelected) return total;
      const option = options.find((o) => o.id === optionId);
      return total + (option ? option.price : 0);
    }, 0);
  }, [selectedOptions]);

  const total = useMemo(() => {
    return basePrice + itemsSubtotal + optionsTotal;
  }, [basePrice, itemsSubtotal, optionsTotal]);

  const handleLineRequest = () => {
    const selectedItemsText = Object.entries(selectedItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => `${items.find(i => i.id === itemId)?.name}: ${quantity}個`)
      .join('\n');

    const selectedOptionsText = Object.entries(selectedOptions)
      .filter(([_, selected]) => selected)
      .map(([optionId]) => options.find(o => o.id === optionId)?.name)
      .join('\n');

    const estimateText = `
【お見積もり内容】
基本料金: ¥${basePrice.toLocaleString()}
品目小計: ¥${itemsSubtotal.toLocaleString()}
オプション小計: ¥${optionsTotal.toLocaleString()}
合計: ¥${total.toLocaleString()}

【選択された品目】
${selectedItemsText}

【選択されたオプション】
${selectedOptionsText}

【お客様情報】
お名前: ${formData.name}
電話番号: ${formData.phone}
住所: ${formData.address}
希望日時: ${formData.date} ${formData.time}
備考: ${formData.notes}
    `.trim();

    const lineUrl = `https://line.me/R/ti/p/@nightexpress?text=${encodeURIComponent(estimateText)}`;
    window.open(lineUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>簡易見積もり | 夜間不用品回収サービス</title>
        <meta name="description" content="不用品回収の料金を簡単に計算できます。品目を選択して、おおよその料金を確認しましょう。" />
      </Helmet>
      <Box>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{ mb: 4 }}
            >
              トップページに戻る
            </Button>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              簡易見積もり
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              回収品目とオプションを選択して、おおよその料金を確認できます。
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="家具" />
              <Tab label="家電" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            {items
              .filter((item) => item.category === 'furniture')
              .map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography color="text.secondary">¥{item.price.toLocaleString()}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton onClick={() => handleItemQuantityChange(item.id, -1)}>
                        -
                      </IconButton>
                      <TextField
                        value={selectedItems[item.id] || 0}
                        InputProps={{ readOnly: true }}
                        sx={{ width: 60 }}
                      />
                      <IconButton onClick={() => handleItemQuantityChange(item.id, 1)}>
                        +
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {items
              .filter((item) => item.category === 'appliances')
              .map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography color="text.secondary">¥{item.price.toLocaleString()}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton onClick={() => handleItemQuantityChange(item.id, -1)}>
                        -
                      </IconButton>
                      <TextField
                        value={selectedItems[item.id] || 0}
                        InputProps={{ readOnly: true }}
                        sx={{ width: 60 }}
                      />
                      <IconButton onClick={() => handleItemQuantityChange(item.id, 1)}>
                        +
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
          </TabPanel>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              オプションサービス
            </Typography>
            {options.map((option) => (
              <Card key={option.id} sx={{ mb: 2 }}>
                <CardContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedOptions[option.id] || false}
                        onChange={() => handleOptionChange(option.id)}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="h6">{option.name}</Typography>
                        <Typography color="text.secondary">¥{option.price.toLocaleString()}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {option.description}
                        </Typography>
                      </Box>
                    }
                  />
                </CardContent>
              </Card>
            ))}
          </Box>

          <Paper sx={{ p: 4, mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              お客様情報
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="お名前"
                  value={formData.name}
                  onChange={handleFormChange('name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="電話番号"
                  value={formData.phone}
                  onChange={handleFormChange('phone')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="住所"
                  value={formData.address}
                  onChange={handleFormChange('address')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="希望日"
                  value={formData.date}
                  onChange={handleFormChange('date')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="希望時間"
                  value={formData.time}
                  onChange={handleFormChange('time')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="備考"
                  value={formData.notes}
                  onChange={handleFormChange('notes')}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>

        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'background.paper',
            zIndex: 1000,
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>品目小計</Typography>
                <Typography>¥{itemsSubtotal.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>オプション</Typography>
                <Typography>¥{optionsTotal.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>基本料金</Typography>
                <Typography>¥{basePrice.toLocaleString()}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">合計（税込）</Typography>
                <Typography variant="h6" color="error">
                  ¥{total.toLocaleString()}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleLineRequest}
              >
                LINEで見積もり依頼
              </Button>
            </Box>
          </Container>
        </Paper>
      </Box>
    </>
  );
};

export default EstimatePage; 