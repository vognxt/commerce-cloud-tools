import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Camera, 
  TrendingUp, 
  Users, 
  User,
  Heart,
  Share2,
  ShoppingBag,
  Sparkles,
  Eye,
  DollarSign,
  Trophy,
  Star,
  Play,
  MessageCircle,
  BarChart3,
  Crown,
  Gift,
  Zap,
  Flame,
  Target,
  Clock,
  ChevronRight,
  ArrowUp,
  Percent
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ARTryOn from '../components/ARTryOn';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    overflow-x: hidden;
  }
`;

// Theme
const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#ef4444',
    dark: '#1f2937',
    light: '#f8fafc',
    gray: '#64748b'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accent: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    success: 'linear-gradient(135deg, #4ade80 0%, #06d6a0 100%)',
    gold: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)'
  }
};

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme?.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  position: relative;
`;

const MobileFrame = styled.div`
  max-width: 414px;
  margin: 0 auto;
  min-height: 100vh;
  background: white;
  position: relative;
  box-shadow: 0 0 30px rgba(0,0,0,0.3);
`;

const Header = styled(motion.div)`
  padding: 60px 20px 20px;
  background: ${props => props.theme.gradients.primary};
  color: white;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient(45deg, #fff, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Tagline = styled.p`
  font-size: 14px;
  opacity: 0.9;
  font-weight: 500;
`;

const ContentArea = styled.div`
  flex: 1;
  background: #f8fafc;
  min-height: calc(100vh - 140px);
  overflow-y: auto;
`;

const TabBar = styled.div`
  display: flex;
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 10px 0;
  position: sticky;
  bottom: 0;
  z-index: 100;
`;

const TabButton = styled(motion.button)`
  flex: 1;
  background: none;
  border: none;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  svg {
    width: 24px;
    height: 24px;
    color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray};
  }
  
  span {
    font-size: 11px;
    font-weight: ${props => props.active ? '600' : '500'};
    color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray};
  }
`;

// Component Templates
const PageContainer = styled(motion.div)`
  padding: 20px;
  min-height: 100%;
`;

const SectionHeader = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 8px;
`;

const SectionSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.gray};
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
`;

const ProductCard = styled(Card)`
  position: relative;
  overflow: hidden;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.bg || 'linear-gradient(45deg, #f093fb, #f5576c)'};
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 4px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionButton = styled(motion.button)`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  
  &.primary {
    background: ${props => props.theme.gradients.primary};
    color: white;
  }
  
  &.secondary {
    background: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.gray};
    border: 1px solid #e2e8f0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 16px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
`;

// Mock Data
const mockProducts = [
  { id: 1, title: "AI Smart Jacket", price: "$299", trend: "+24%", likes: 1234, bg: "linear-gradient(45deg, #667eea, #764ba2)" },
  { id: 2, title: "VR Sunglasses", price: "$199", trend: "+18%", likes: 892, bg: "linear-gradient(45deg, #f093fb, #f5576c)" },
  { id: 3, title: "Holo Sneakers", price: "$399", trend: "+31%", likes: 2156, bg: "linear-gradient(45deg, #4ade80, #06d6a0)" },
];

const mockCreators = [
  { id: 1, name: "Sarah Chen", followers: "2.4M", earnings: "$45,2K", category: "Fashion" },
  { id: 2, name: "Mike Rivera", followers: "1.8M", earnings: "$38,7K", category: "Tech" },
  { id: 3, name: "Luna Park", followers: "3.1M", earnings: "$52,3K", category: "Beauty" },
];

// Page Components
const DiscoverPage = () => (
  <PageContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <SectionHeader>
      <SectionTitle>Trending Now</SectionTitle>
      <SectionSubtitle>AI-curated products just for you</SectionSubtitle>
    </SectionHeader>
    
    <Card style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)', color: 'white', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Flame size={20} />
          <span style={{ fontWeight: '600', fontSize: '16px' }}>Flash Sale</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
          <Clock size={14} />
          <span>23:45:12</span>
        </div>
      </div>
      <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9 }}>
        Up to 70% off trending items! Limited time only.
      </p>
      <ActionButton className="secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }} whileTap={{ scale: 0.95 }}>
        <Target size={12} />
        Shop Now
      </ActionButton>
    </Card>
    
    <StatsGrid>
      <StatCard whileHover={{ scale: 1.02 }}>
        <StatValue>+247%</StatValue>
        <StatLabel>Weekly Growth</StatLabel>
      </StatCard>
      <StatCard whileHover={{ scale: 1.02 }}>
        <StatValue>1.2M</StatValue>
        <StatLabel>Active Users</StatLabel>
      </StatCard>
      <StatCard whileHover={{ scale: 1.02 }}>
        <StatValue>94%</StatValue>
        <StatLabel>AR Accuracy</StatLabel>
      </StatCard>
      <StatCard whileHover={{ scale: 1.02 }}>
        <StatValue>$127</StatValue>
        <StatLabel>Avg. Order Value</StatLabel>
      </StatCard>
    </StatsGrid>

    {mockProducts.map(product => (
      <ProductCard key={product.id} whileHover={{ scale: 1.02 }}>
        <ProductImage bg={product.bg}>
          <Sparkles />
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ArrowUp size={10} />
            {product.trend}
          </div>
        </ProductImage>
        <ProductInfo>
          <div>
            <ProductTitle>{product.title}</ProductTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <div style={{ fontSize: '12px', color: '#4ade80', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={12} />
                Trending
              </div>
              <div style={{ fontSize: '12px', color: '#667eea', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Eye size={12} />
                AR Ready
              </div>
            </div>
          </div>
          <ProductPrice>{product.price}</ProductPrice>
        </ProductInfo>
        <ProductActions>
          <ActionButton className="primary" whileTap={{ scale: 0.95 }} onClick={() => setShowAR(true)}>
            <Eye size={12} />
            Try AR
          </ActionButton>
          <ActionButton className="secondary" whileTap={{ scale: 0.95 }}>
            <Heart size={12} />
            {product.likes}
          </ActionButton>
          <ActionButton className="secondary" whileTap={{ scale: 0.95 }}>
            <Share2 size={12} />
          </ActionButton>
        </ProductActions>
      </ProductCard>
    ))}

    <Card style={{ textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
      <Zap size={32} style={{ margin: '0 auto 12px' }} />
      <h4 style={{ marginBottom: '8px' }}>AI Shopping Assistant</h4>
      <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '16px' }}>
        Get personalized recommendations based on your style and preferences
      </p>
      <ActionButton className="secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }} whileTap={{ scale: 0.95 }}>
        <Sparkles size={12} />
        Get AI Suggestions
      </ActionButton>
    </Card>
  </PageContainer>
);

const TryOnPage = () => (
  <PageContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <SectionHeader>
      <SectionTitle>AR Try-On Studio</SectionTitle>
      <SectionSubtitle>Virtual fitting room powered by AI</SectionSubtitle>
    </SectionHeader>

    <Card style={{ textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Camera size={64} style={{ margin: '0 auto 20px', color: '#667eea' }} />
      <h3 style={{ marginBottom: '12px', color: '#1f2937' }}>Start AR Session</h3>
      <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
        Try on clothes, accessories, makeup and more with our advanced AR technology
      </p>
      <ActionButton className="primary" style={{ alignSelf: 'center' }} whileTap={{ scale: 0.95 }} onClick={() => setShowAR(true)}>
        <Camera size={16} />
        Launch Camera
      </ActionButton>
    </Card>

    <Card>
      <h4 style={{ marginBottom: '16px', color: '#1f2937' }}>Recent Try-Ons</h4>
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
        {['Fashion', 'Beauty', 'Accessories'].map(category => (
          <div key={category} style={{
            minWidth: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, #f093fb, #f5576c)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {category}
          </div>
        ))}
      </div>
    </Card>

    <Card style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
      <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={20} />
        AI Style Recommendations
      </h4>
      <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9 }}>
        Based on your recent try-ons and trending styles
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {['Casual Chic', 'Business Pro', 'Evening Glam'].map((style, index) => (
          <div key={style} style={{
            padding: '8px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '10px',
            fontWeight: '600'
          }}>
            {style}
          </div>
        ))}
      </div>
    </Card>
  </PageContainer>
);

const TrendingPage = () => (
  <PageContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <SectionHeader>
      <SectionTitle>Viral Content</SectionTitle>
      <SectionSubtitle>What's trending in social shopping</SectionSubtitle>
    </SectionHeader>

    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ width: '48px', height: '48px', background: 'linear-gradient(45deg, #667eea, #764ba2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Play size={20} />
        </div>
        <div>
          <h4 style={{ color: '#1f2937', marginBottom: '4px' }}>Live Shopping Event</h4>
          <p style={{ color: '#64748b', fontSize: '12px' }}>Sarah Chen • 12.4K viewers</p>
        </div>
        <div style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '600' }}>
          LIVE
        </div>
      </div>
      <ActionButton className="primary" style={{ width: '100%' }} whileTap={{ scale: 0.95 }}>
        <Play size={16} />
        Join Live Event
      </ActionButton>
    </Card>

    {['#ShopVibeStyle', '#ARFashion', '#TechWear'].map((hashtag, index) => (
      <Card key={hashtag}>
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ color: '#1f2937' }}>{hashtag}</h4>
          <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: '600' }}>
            +{25 + index * 5}% engagement
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '80px', background: `linear-gradient(45deg, ${['#667eea', '#f093fb', '#4ade80'][index]}, ${['#764ba2', '#f5576c', '#06d6a0'][index]})`, borderRadius: '8px' }}></div>
          <div style={{ flex: 1, height: '80px', background: `linear-gradient(45deg, ${['#764ba2', '#f5576c', '#06d6a0'][index]}, ${['#667eea', '#f093fb', '#4ade80'][index]})`, borderRadius: '8px' }}></div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <ActionButton className="secondary" whileTap={{ scale: 0.95 }}>
            <Heart size={12} />
            {1200 + index * 300}
          </ActionButton>
          <ActionButton className="secondary" whileTap={{ scale: 0.95 }}>
            <MessageCircle size={12} />
            {89 + index * 20}
          </ActionButton>
          <ActionButton className="secondary" whileTap={{ scale: 0.95 }}>
            <Share2 size={12} />
          </ActionButton>
        </div>
      </Card>
    ))}
  </PageContainer>
);

const CreatorsPage = () => (
  <PageContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <SectionHeader>
      <SectionTitle>Creator Marketplace</SectionTitle>
      <SectionSubtitle>Connect with top influencers</SectionSubtitle>
    </SectionHeader>

    <Card style={{ background: 'linear-gradient(135deg, #ffd700, #ffb347)', color: 'white', textAlign: 'center' }}>
      <Crown size={32} style={{ margin: '0 auto 12px' }} />
      <h4 style={{ marginBottom: '8px' }}>Creator Rewards Program</h4>
      <p style={{ fontSize: '14px', opacity: 0.9 }}>Earn up to 25% commission on every sale</p>
    </Card>

    {mockCreators.map(creator => (
      <Card key={creator.id}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'linear-gradient(45deg, #667eea, #764ba2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px', fontWeight: '600' }}>
            {creator.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#1f2937', marginBottom: '4px' }}>{creator.name}</h4>
            <p style={{ color: '#64748b', fontSize: '12px' }}>{creator.category} • {creator.followers} followers</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#4ade80', fontWeight: '600', fontSize: '14px' }}>{creator.earnings}</div>
            <div style={{ color: '#64748b', fontSize: '10px' }}>monthly</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <ActionButton className="primary" whileTap={{ scale: 0.95 }}>
            <Users size={12} />
            Follow
          </ActionButton>
          <ActionButton className="secondary" whileTap={{ scale: 0.95 }}>
            <BarChart3 size={12} />
            Analytics
          </ActionButton>
          <ActionButton className="secondary" whileTap={{ scale: 0.95 }}>
            <MessageCircle size={12} />
            Message
          </ActionButton>
        </div>
      </Card>
    ))}
  </PageContainer>
);

const ProfilePage = () => (
  <PageContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <SectionHeader>
      <SectionTitle>Your Profile</SectionTitle>
      <SectionSubtitle>Track your social shopping journey</SectionSubtitle>
    </SectionHeader>

    <Card style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div style={{ width: '80px', height: '80px', background: 'linear-gradient(45deg, #667eea, #764ba2)', borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: '600' }}>
        JD
      </div>
      <h3 style={{ color: '#1f2937', marginBottom: '4px' }}>John Doe</h3>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>Level 3 Trendsetter</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '12px' }}>
        <div style={{ background: 'linear-gradient(45deg, #4ade80, #06d6a0)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '600' }}>
          Creator Verified
        </div>
        <div style={{ background: 'linear-gradient(45deg, #ffd700, #ffb347)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '600' }}>
          VIP Member
        </div>
      </div>
    </Card>

    <StatsGrid>
      <StatCard whileHover={{ scale: 1.02 }}>
        <StatValue>$2,847</StatValue>
        <StatLabel>Total Earnings</StatLabel>
      </StatCard>
      <StatCard whileHover={{ scale: 1.02 }}>
        <StatValue>156</StatValue>
        <StatLabel>Products Tried</StatLabel>
      </StatCard>
      <StatCard whileHover={{ scale: 1.02 }}>
        <StatValue>2.4K</StatValue>
        <StatLabel>Followers</StatLabel>
      </StatCard>
      <StatCard whileHover={{ scale: 1.02 }}>
        <StatValue>89</StatValue>
        <StatLabel>Reviews</StatLabel>
      </StatCard>
    </StatsGrid>

    <Card style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
      <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BarChart3 size={20} />
        Monthly Performance
      </h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px', color: '#4ade80' }}>+23%</div>
          <div style={{ fontSize: '10px', opacity: 0.9 }}>Engagement</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px', color: '#f093fb' }}>$1,245</div>
          <div style={{ fontSize: '10px', opacity: 0.9 }}>This Month</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px', color: '#ffd700' }}>94.2%</div>
          <div style={{ fontSize: '10px', opacity: 0.9 }}>Satisfaction</div>
        </div>
      </div>
      <ActionButton className="secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', width: '100%' }} whileTap={{ scale: 0.95 }}>
        <ChevronRight size={12} />
        View Detailed Analytics
      </ActionButton>
    </Card>

    <Card>
      <h4 style={{ marginBottom: '16px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Trophy style={{ color: '#ffd700' }} size={20} />
        Achievements
      </h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {['First Purchase', 'Style Influencer', 'AR Pioneer', 'Trend Setter'].map((achievement, index) => (
          <div key={achievement} style={{ 
            padding: '12px', 
            background: index < 2 ? 'linear-gradient(45deg, #ffd700, #ffb347)' : '#f1f5f9', 
            borderRadius: '8px', 
            textAlign: 'center',
            color: index < 2 ? 'white' : '#64748b',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {index < 2 && <Star size={16} style={{ marginBottom: '4px' }} />}
            {achievement}
          </div>
        ))}
      </div>
    </Card>

    <Card>
      <h4 style={{ marginBottom: '12px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Percent style={{ color: '#4ade80' }} size={20} />
        Creator Commission Tracker
      </h4>
      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Current Rate</span>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#4ade80' }}>15%</span>
        </div>
        <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(45deg, #4ade80, #06d6a0)', width: '60%', height: '100%' }}></div>
        </div>
        <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>
          Earn 20% at next level (3 more sales needed)
        </p>
      </div>
    </Card>

    <Card>
      <h4 style={{ marginBottom: '16px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Gift style={{ color: '#667eea' }} size={20} />
        Referral Program
      </h4>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>
        Invite friends and earn $10 for each signup
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <ActionButton className="primary" style={{ flex: 1 }} whileTap={{ scale: 0.95 }}>
          <Share2 size={12} />
          Share Code
        </ActionButton>
        <ActionButton className="secondary" whileTap={{ scale: 0.95 }}>
          Copy: JOHN2024
        </ActionButton>
      </div>
    </Card>
  </PageContainer>
);

// Main App Component
const ShopVibeApp = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [isLoading, setIsLoading] = useState(true);
  const [showAR, setShowAR] = useState(false);

  useEffect(() => {
    // Simulate app loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const tabs = [
    { id: 'discover', label: 'Discover', icon: Search, component: DiscoverPage },
    { id: 'tryon', label: 'Try-On', icon: Camera, component: TryOnPage },
    { id: 'trending', label: 'Trending', icon: TrendingUp, component: TrendingPage },
    { id: 'creators', label: 'Creators', icon: Users, component: CreatorsPage },
    { id: 'profile', label: 'Profile', icon: User, component: ProfilePage },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DiscoverPage;

  if (isLoading) {
    return (
      <AppContainer>
        <MobileFrame>
          <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={48} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: '32px', fontWeight: '800', marginTop: '20px' }}
            >
              ShopVibe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ fontSize: '16px', opacity: 0.9, marginTop: '8px' }}
            >
              AI-Powered Social Shopping
            </motion.p>
          </div>
        </MobileFrame>
      </AppContainer>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <MobileFrame>
          <Header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo>ShopVibe</Logo>
            <Tagline>AI-Powered Social Shopping Experience</Tagline>
          </Header>

          <ContentArea>
            <AnimatePresence mode="wait">
              <ActiveComponent key={activeTab} />
            </AnimatePresence>
          </ContentArea>

          <TabBar>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <TabButton
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    toast.success(`Switched to ${tab.label}`, {
                      icon: <Icon size={16} />,
                      duration: 1000,
                    });
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon />
                  <span>{tab.label}</span>
                </TabButton>
              );
            })}
          </TabBar>
        </MobileFrame>
        
        <AnimatePresence>
          {showAR && (
            <ARTryOn 
              isOpen={showAR} 
              onClose={() => {
                setShowAR(false);
                toast.success('AR session ended', {
                  icon: <Camera size={16} />,
                  duration: 2000,
                });
              }} 
            />
          )}
        </AnimatePresence>
        
        <Toaster position="top-center" />
      </AppContainer>
    </ThemeProvider>
  );
};

export default ShopVibeApp;