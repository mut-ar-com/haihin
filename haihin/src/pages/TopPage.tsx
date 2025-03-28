import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RecyclingIcon from '@mui/icons-material/Recycling';
import VerifiedIcon from '@mui/icons-material/Verified';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeedIcon from '@mui/icons-material/Speed';
import NightlightIcon from '@mui/icons-material/Nightlight';
import PhoneIcon from '@mui/icons-material/Phone';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Helmet } from 'react-helmet-async';
import InfoIcon from '@mui/icons-material/Info';

const features = [
  {
    icon: <CalendarTodayIcon sx={{ fontSize: 40 }} />,
    title: '前日予約',
    description: '前日までに予約いただければ、ご希望の時間帯に回収に伺います。',
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
    title: '時間指定',
    description: '午前・午後・夜間から、ご希望の時間帯を選択できます。',
  },
  {
    icon: <DeleteOutlineIcon sx={{ fontSize: 40 }} />,
    title: '幅広い品目',
    description: '家具、家電、オフィス用品など、様々な不用品の回収に対応。',
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
    title: '安心の料金',
    description: '事前にお見積りし、追加料金なしの明確な料金体系です。',
  },
];

const steps = [
  {
    icon: <PhoneIcon sx={{ fontSize: 40 }} />,
    title: "ご依頼",
    description: "LINE@または電話で24時間受付"
  },
  {
    icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
    title: "時間調整",
    description: "夜間20時〜24時の間で調整"
  },
  {
    icon: <HomeIcon sx={{ fontSize: 40 }} />,
    title: "玄関先に設置",
    description: "玄関先に出しておくだけでOK"
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: "オプションサービス",
    description: "データ消去証明・写真報告など"
  }
];

const faqs = [
  {
    question: "LINE@での見積もりの流れを教えてください",
    answer: "1. LINE@で友だち追加\n2. 不用品の写真を送信\n3. 住所と希望日時を送信\n4. 即日見積もりを返信\n5. ご確認後、予約完了"
  },
  {
    question: "見積もりは無料ですか？",
    answer: "はい、見積もりは完全無料です。お気軽にご相談ください。"
  },
  {
    question: "夜間対応の時間帯は？",
    answer: "夜間対応は19:00〜23:00の間で承っております。"
  },
  {
    question: "当日予約は可能ですか？",
    answer: "はい、当日予約も可能です。ただし、時間帯によっては満員の場合もございますので、お早めのご予約をお勧めします。"
  }
];

const TopPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>MUT - 不用品回収・粗大ゴミ回収</title>
        <meta name="description" content="MUTの不用品回収・粗大ゴミ回収サービス。即日対応可能、格安料金で安心の回収サービスを提供しています。" />
      </Helmet>
      <Box>
        {/* ヒーローセクション */}
        <Box
          sx={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* 背景画像 */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
                zIndex: 1,
              },
            }}
          >
            <Box
              component="img"
              src="/images/collection-hero.jpg"
              alt="回収イメージ"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.9)',
              }}
            />
          </Box>

          {/* コンテンツ */}
          <Container
            maxWidth="lg"
            sx={{
              height: '100%',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      color: 'white',
                      mb: 3,
                      fontWeight: 700,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    回収は明日？今日？
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 4,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    LINEですぐに予約できます
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<WhatsAppIcon />}
                        href="https://lin.ee/your-line-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          bgcolor: '#25D366',
                          '&:hover': {
                            bgcolor: '#128C7E',
                          },
                          minWidth: 200,
                        }}
                      >
                        今すぐLINEで予約
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/estimate')}
                        sx={{
                          minWidth: 200,
                        }}
                      >
                        料金の目安をチェックする
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/price')}
                        sx={{
                          minWidth: 200,
                        }}
                      >
                        料金表を確認する
                      </Button>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        mt: 2,
                        textAlign: 'center',
                      }}
                    >
                      「どのくらいかかる？」が気になる方へ
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, width: '100%', maxWidth: '300px' }}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/estimate')}
                        sx={{
                          borderColor: 'white',
                          color: 'white',
                          '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                          },
                          fontSize: '1.1rem',
                          py: 1.5,
                          px: 4,
                          flex: 1,
                        }}
                      >
                        簡易見積もり
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* 選ばれる理由 */}
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              sx={{ mb: 6, fontWeight: 700 }}
            >
              選ばれる理由
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                        },
                      }}
                    >
                      <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ご利用の流れ */}
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" sx={{ mb: 6, fontWeight: 700 }}>
              ご利用の流れ
            </Typography>
            <Grid container spacing={4}>
              {steps.map((step, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                      '&:not(:last-child)::after': {
                        content: '""',
                        position: 'absolute',
                        right: -20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 40,
                        height: 2,
                        bgcolor: 'primary.main',
                        display: { xs: 'none', md: 'block' },
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {step.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {step.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* よくある質問 */}
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              align="center"
              sx={{ mb: 6, fontWeight: 700 }}
            >
              よくある質問
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </Box>

        {/* フッター */}
        <Box
          sx={{
            py: 6,
            bgcolor: 'background.default',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  予約受付時間
                </Typography>
                <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                  24時間受付中
                </Typography>
                <Typography color="text.secondary">
                  前日までの予約で、ご希望の時間帯に回収いたします。
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: { md: 'right' } }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/estimate')}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  予約する
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default TopPage; 