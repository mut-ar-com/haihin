import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useTheme,
} from '@mui/material';

interface EstimateHistoryItem {
  id: string;
  date: string;
  companyName: string;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  category: 'memory' | 'trace' | 'cycle';
}

// 仮のデータ（実際のアプリケーションではAPIから取得）
const mockHistory: EstimateHistoryItem[] = [
  {
    id: '1',
    date: '2024-03-15',
    companyName: '株式会社サンプル',
    totalAmount: 150000,
    status: 'approved',
    category: 'memory',
  },
  {
    id: '2',
    date: '2024-03-14',
    companyName: '株式会社テスト',
    totalAmount: 250000,
    status: 'pending',
    category: 'trace',
  },
  {
    id: '3',
    date: '2024-03-13',
    companyName: '株式会社デモ',
    totalAmount: 180000,
    status: 'rejected',
    category: 'cycle',
  },
];

const getStatusText = (status: EstimateHistoryItem['status']) => {
  switch (status) {
    case 'pending':
      return '変容中';
    case 'approved':
      return '再構築済み';
    case 'rejected':
      return '未完了';
    default:
      return '';
  }
};

const getStatusColor = (status: EstimateHistoryItem['status'], theme: any) => {
  switch (status) {
    case 'pending':
      return theme.palette.warning.main;
    case 'approved':
      return theme.palette.success.main;
    case 'rejected':
      return theme.palette.error.main;
    default:
      return theme.palette.text.primary;
  }
};

const getCategoryColor = (category: EstimateHistoryItem['category'], theme: any) => {
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

const EstimateHistory: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell>組織名</TableCell>
              <TableCell align="right">金額</TableCell>
              <TableCell>状態</TableCell>
              <TableCell>カテゴリー</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.companyName}</TableCell>
                <TableCell align="right">
                  ¥{item.totalAmount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Typography color={getStatusColor(item.status, theme)}>
                    {getStatusText(item.status)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color={getCategoryColor(item.category, theme)}>
                    {item.category === 'memory' && '記憶'}
                    {item.category === 'trace' && '痕跡'}
                    {item.category === 'cycle' && '循環'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.location.href = `/estimate/${item.id}`}
                    sx={{
                      borderColor: getCategoryColor(item.category, theme),
                      color: getCategoryColor(item.category, theme),
                      '&:hover': {
                        borderColor: getCategoryColor(item.category, theme),
                        backgroundColor: `${getCategoryColor(item.category, theme)}10`,
                      },
                    }}
                  >
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EstimateHistory; 