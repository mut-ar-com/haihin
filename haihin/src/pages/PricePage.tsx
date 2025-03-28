import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';
import DiscountIcon from '@mui/icons-material/Discount';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from 'react-helmet-async';

// 基本料金データ
const basicFees = [
  {
    name: '夜間基本料金',
    price: 4400,
    description: '18:00〜24:00の間の回収',
  },
  {
    name: '地域追加料金',
    price: 1100,
    description: '対象エリア外の場合',
  },
];

// 特急対応料金データ
const expressFees = [
  {
    name: '標準対応',
    price: 0,
    time: '予約時間から3時間以内に到着',
    description: '通常の回収サービス',
  },
  {
    name: '特急便',
    price: 3300,
    time: '予約から1時間以内に到着',
    description: '急ぎの回収に対応',
  },
  {
    name: '超特急便',
    price: 5500,
    time: '予約から30分以内に到着',
    description: '最短での回収が必要な場合',
  },
];

// 時間指定料金データ
const timeSlotFees = [
  {
    name: '3時間枠指定',
    price: 0,
    example: '例：18:00〜21:00',
  },
  {
    name: '2時間枠指定',
    price: 1100,
    example: '例：19:00〜21:00',
  },
  {
    name: '1時間枠指定',
    price: 2200,
    example: '例：20:00〜21:00',
  },
];

// 品目別料金データ
const itemCategories = {
  smallAppliances: {
    title: '小型家電',
    items: [
      { name: '電子レンジ', size: '-', price: 2200 },
      { name: '掃除機', size: '-', price: 1100 },
      { name: '扇風機', size: '-', price: 1100 },
      { name: 'テレビ', size: '32インチまで', price: 4400 },
      { name: 'テレビ', size: '33〜50インチ', price: 6600 },
      { name: 'テレビ', size: '51インチ以上', price: 8800 },
      { name: 'パソコン', size: 'ノート', price: 1100 },
      { name: 'パソコン', size: 'デスクトップ', price: 2200 },
    ],
  },
  largeAppliances: {
    title: '大型家電',
    items: [
      { name: '冷蔵庫', size: '100L未満', price: 4400 },
      { name: '冷蔵庫', size: '100L〜300L', price: 6600 },
      { name: '冷蔵庫', size: '301L〜500L', price: 8800 },
      { name: '冷蔵庫', size: '501L以上', price: 11000 },
      { name: '洗濯機', size: '縦型', price: 4400 },
      { name: '洗濯機', size: 'ドラム式', price: 6600 },
      { name: 'エアコン', size: '-', price: 0, note: '要見積もり' },
    ],
  },
  furniture: {
    title: '家具',
    items: [
      { name: 'ソファ', size: '1人掛け', price: 3300 },
      { name: 'ソファ', size: '2人掛け', price: 5500 },
      { name: 'ソファ', size: '3人掛け', price: 7700 },
      { name: 'ベッド', size: 'シングル', price: 4400 },
      { name: 'ベッド', size: 'ダブル', price: 6600 },
      { name: 'ベッド', size: 'クイーン/キング', price: 11000 },
      { name: 'マットレス', size: 'シングル', price: 3300 },
      { name: 'マットレス', size: 'ダブル', price: 5500 },
      { name: 'マットレス', size: 'クイーン/キング', price: 8800 },
      { name: 'タンス・食器棚', size: '小（幅90cm未満）', price: 3300 },
      { name: 'タンス・食器棚', size: '中（幅90-150cm）', price: 5500 },
      { name: 'タンス・食器棚', size: '大（幅150cm以上）', price: 8800 },
    ],
  },
};

const priceExamples = [
  {
    title: "1Kマンションの引っ越し",
    items: [
      { name: "シングルベッド", price: "3,000円" },
      { name: "衣装ケース", price: "2,000円" },
      { name: "テレビ台", price: "2,500円" },
      { name: "本棚", price: "2,000円" },
      { name: "その他小物", price: "1,500円" },
    ],
    total: "11,000円",
    note: "基本料金3,000円 + 品目別料金8,000円"
  },
  {
    title: "オフィス移転",
    items: [
      { name: "オフィスチェア", price: "2,500円" },
      { name: "デスク", price: "4,000円" },
      { name: "キャビネット", price: "3,500円" },
      { name: "パーティション", price: "3,000円" },
      { name: "その他備品", price: "2,000円" },
    ],
    total: "15,000円",
    note: "基本料金3,000円 + 品目別料金12,000円"
  }
];

const referenceCompanies = [
  {
    name: "株式会社〇〇",
    url: "https://example.com",
    description: "夜間対応の不用品回収サービスを提供"
  },
  {
    name: "△△リサイクル",
    url: "https://example.com",
    description: "即日対応の回収サービスを展開"
  }
];

const estimateExamples = [
  {
    title: "夜の引越しで困っていたAさん",
    background: "引越しの準備で不要になった家具を処分したい。日中は仕事で時間が取れず、夜間の対応を探していた。",
    staffComment: "夜間対応でスムーズに回収。玄関先に設置していただくだけで、非対面での回収も可能です。",
    items: [
      { category: "基本料金", name: "夜間基本料金", quantity: 1, unitPrice: 4400, subtotal: 4400 },
      { category: "家具", name: "シングルベッド", quantity: 1, unitPrice: 4400, subtotal: 4400 },
      { category: "家具", name: "衣装ケース", quantity: 2, unitPrice: 3300, subtotal: 6600 },
      { category: "家具", name: "テレビ台", quantity: 1, unitPrice: 2200, subtotal: 2200 },
      { category: "オプション", name: "データ消去証明", quantity: 1, unitPrice: 1100, subtotal: 1100 },
    ],
    total: 18700,
    note: "深夜割引（22時以降）適用で10%オフ"
  },
  {
    title: "オフィス移転を控えるB社",
    background: "オフィス移転に伴い、古いオフィス家具を処分したい。平日の夜間で対応可能な業者を探していた。",
    staffComment: "平日夜間の対応で、業務への影響を最小限に抑えられます。",
    items: [
      { category: "基本料金", name: "夜間基本料金", quantity: 1, unitPrice: 4400, subtotal: 4400 },
      { category: "家具", name: "オフィスチェア", quantity: 5, unitPrice: 2200, subtotal: 11000 },
      { category: "家具", name: "デスク", quantity: 3, unitPrice: 4400, subtotal: 13200 },
      { category: "家具", name: "キャビネット", quantity: 2, unitPrice: 5500, subtotal: 11000 },
      { category: "オプション", name: "写真報告", quantity: 1, unitPrice: 1100, subtotal: 1100 },
    ],
    total: 40700,
    note: "平日割引（月〜木）適用で5%オフ"
  },
  {
    title: "急な引越しで困っていたCさん",
    background: "急な引越しが決まり、不要になった家電を即日で処分したい。",
    staffComment: "特急便で対応。LINE@で写真を送っていただき、即日見積もりを実施しました。",
    items: [
      { category: "基本料金", name: "夜間基本料金", quantity: 1, unitPrice: 4400, subtotal: 4400 },
      { category: "特急対応", name: "特急便", quantity: 1, unitPrice: 3300, subtotal: 3300 },
      { category: "家電", name: "冷蔵庫（200L）", quantity: 1, unitPrice: 6600, subtotal: 6600 },
      { category: "家電", name: "洗濯機（縦型）", quantity: 1, unitPrice: 4400, subtotal: 4400 },
      { category: "家電", name: "テレビ（40インチ）", quantity: 1, unitPrice: 6600, subtotal: 6600 },
    ],
    total: 25300,
    note: "特急便の追加料金が発生"
  }
];

const optionServices = [
  {
    name: "データ消去証明書発行",
    price: 1100,
    description: "PDF形式・HDD破壊可"
  },
  {
    name: "写真報告",
    price: 1100,
    description: "法人 or 不在ユーザー向け"
  },
  {
    name: "吊り作業（二階）",
    price: 12100,
    description: "事前写真要／スタッフ2名〜"
  }
];

const quickEstimates = [
  {
    scenario: "一人暮らしの引越し",
    items: "ベッド・棚・家電3点",
    price: "約¥11,000〜¥15,000"
  },
  {
    scenario: "小オフィス整理",
    items: "デスク2・チェア2・キャビネット",
    price: "約¥18,000〜¥25,000"
  },
  {
    scenario: "急な大型家電処分",
    items: "冷蔵庫・洗濯機・テレビ",
    price: "約¥20,000前後（オプション込）"
  }
];

const PricePage: React.FC = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Helmet>
        <title>料金案内 | 夜間不用品回収サービス</title>
        <meta name="description" content="不用品回収の基本料金・品目別料金・料金事例などを掲載しています。" />
      </Helmet>
      <Box>
        {/* ヘッダーセクション */}
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
              料金案内
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              シンプルで分かりやすい料金体系。
              <br />
              深夜割引で更にお得に。
            </Typography>
          </Container>
        </Box>

        {/* 基本料金セクション */}
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
          <Grid container spacing={4}>
            {/* 基本料金 */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    基本料金
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>項目</TableCell>
                          <TableCell align="right">料金（税込）</TableCell>
                          <TableCell>備考</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {basicFees.map((fee) => (
                          <TableRow key={fee.name}>
                            <TableCell>{fee.name}</TableCell>
                            <TableCell align="right">¥{fee.price.toLocaleString()}</TableCell>
                            <TableCell>{fee.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </motion.div>
            </Grid>

            {/* 特急対応料金 */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    特急対応料金
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>対応速度</TableCell>
                          <TableCell align="right">追加料金（税込）</TableCell>
                          <TableCell>対応時間</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {expressFees.map((fee) => (
                          <TableRow key={fee.name}>
                            <TableCell>{fee.name}</TableCell>
                            <TableCell align="right">¥{fee.price.toLocaleString()}</TableCell>
                            <TableCell>{fee.time}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* 品目別料金 */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              品目別料金
            </Typography>
            <Paper sx={{ width: '100%', mt: 3 }}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="小型家電" />
                <Tab label="大型家電" />
                <Tab label="家具" />
              </Tabs>
              <Box sx={{ p: 3 }}>
                {Object.values(itemCategories).map((category, index) => (
                  <div
                    key={category.title}
                    role="tabpanel"
                    hidden={selectedTab !== index}
                  >
                    {selectedTab === index && (
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>品目</TableCell>
                              <TableCell>サイズ</TableCell>
                              <TableCell align="right">料金（税込）</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {category.items.map((item, itemIndex) => (
                              <TableRow key={`${item.name}-${item.size}`}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.size}</TableCell>
                                <TableCell align="right">
                                  {item.note || `¥${item.price.toLocaleString()}`}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </div>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* 割引情報 */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              お得な割引情報
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    深夜割引
                  </Typography>
                  <Typography>
                    22:00以降の回収で
                    <br />
                    基本料金から10%オフ
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <LocalShippingIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    平日割引
                  </Typography>
                  <Typography>
                    月〜木曜日は
                    <br />
                    基本料金から5%オフ
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <DiscountIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    リピーター割引
                  </Typography>
                  <Typography>
                    2回目以降のご利用で
                    <br />
                    基本料金から5%オフ
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* 料金表とシナリオ例 */}
          <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
              <Typography variant="h2" align="center" sx={{ mb: 6, fontWeight: 700 }}>
                料金表
              </Typography>
              <Grid container spacing={4}>
                {/* 左側：料金表 */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 4, height: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                      基本料金
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {basicFees.map((fee, index) => (
                            <TableRow key={index}>
                              <TableCell>{fee.name}</TableCell>
                              <TableCell align="right">
                                <Typography color="primary" fontWeight="bold">
                                  {fee.price}円
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
                {/* 右側：シナリオ例 */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 4, height: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                      料金例
                    </Typography>
                    {priceExamples.map((example, index) => (
                      <Box key={index} sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                          {example.title}
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableBody>
                              {example.items.map((item, itemIndex) => (
                                <TableRow key={itemIndex}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell align="right">{item.price}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Box sx={{ mt: 2, textAlign: 'right' }}>
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            合計: {example.total}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {example.note}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* 具体的な見積もり例 */}
          <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
              <Typography variant="h2" align="center" sx={{ mb: 6, fontWeight: 700 }}>
                お見積り例
              </Typography>
              {estimateExamples.map((example, index) => (
                <Accordion key={index} sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {example.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" color="text.secondary" paragraph>
                        {example.background}
                      </Typography>
                      <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                        <Typography variant="body1">
                          {example.staffComment}
                        </Typography>
                      </Paper>
                    </Box>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>カテゴリ</TableCell>
                            <TableCell>品目</TableCell>
                            <TableCell align="right">数量</TableCell>
                            <TableCell align="right">単価</TableCell>
                            <TableCell align="right">小計</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {example.items.map((item, itemIndex) => (
                            <TableRow key={itemIndex}>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell align="right">{item.quantity}</TableCell>
                              <TableCell align="right">¥{item.unitPrice.toLocaleString()}</TableCell>
                              <TableCell align="right">¥{item.subtotal.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold' }}>
                              合計（税込）
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                              ¥{example.total.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {example.note && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        ※ {example.note}
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Container>
          </Box>

          {/* オプションサービス */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              オプションサービス
            </Typography>
            <Paper sx={{ p: 4, bgcolor: 'background.default' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>オプション内容</TableCell>
                      <TableCell align="right">金額（税込）</TableCell>
                      <TableCell>備考</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {optionServices.map((option) => (
                      <TableRow key={option.name}>
                        <TableCell>{option.name}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          ¥{option.price.toLocaleString()}
                        </TableCell>
                        <TableCell>{option.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          {/* 概算見積り早見表 */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              概算見積り早見表
            </Typography>
            <Paper sx={{ p: 4, bgcolor: 'background.default' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>シーン</TableCell>
                      <TableCell>回収品例</TableCell>
                      <TableCell align="right">合計</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quickEstimates.map((estimate) => (
                      <TableRow key={estimate.scenario}>
                        <TableCell>{estimate.scenario}</TableCell>
                        <TableCell>{estimate.items}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          {estimate.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                ※ あくまでも目安です。実際の料金は回収品目・距離・オプションによって変動する場合があります。
              </Typography>
            </Paper>
          </Box>

          {/* 注意書き */}
          <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
              <Paper sx={{ p: 4, bgcolor: 'background.default' }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
                  ⚠️ ご注意事項
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="料金は回収品目・距離・オプションによって変動する場合があります"
                      secondary="正確な料金は、お問い合わせ時にご案内いたします"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="まずはお問い合わせください"
                      secondary="LINE@で簡単に料金の見積もりができます"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Container>
          </Box>

          {/* 注意事項 */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              ご利用に関する注意事項
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">特急対応について</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  特急対応は道路状況や天候により遅延する場合があります。
                  また、エリアによっては対応できない場合もございます。
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">お支払い方法について</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  現金、クレジットカード（VISA, Mastercard, JCB, AMEX）、
                  QRコード決済（PayPay, LINE Pay, d払い）がご利用いただけます。
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">キャンセルについて</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  作業開始2時間前まで：無料
                  <br />
                  作業開始2時間前〜1時間前：基本料金の50%
                  <br />
                  作業開始1時間前以降：基本料金の100%
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default PricePage; 