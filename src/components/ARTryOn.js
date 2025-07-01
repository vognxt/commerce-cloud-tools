import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  RotateCcw,
  Download,
  Share2,
  Sparkles,
  Eye,
  Palette,
  Shirt,
  Crown,
  Watch,
  Glasses,
  Heart,
  X,
  CheckCircle,
  Zap,
  Magic
} from 'lucide-react';

const ARContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const CameraView = styled.div`
  flex: 1;
  position: relative;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CameraPreview = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FaceOverlay = styled(motion.div)`
  width: 280px;
  height: 350px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 1px solid rgba(240, 147, 251, 0.5);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.02); }
  }
`;

const VirtualItem = styled(motion.div)`
  position: absolute;
  ${props => props.position};
  z-index: 10;
`;

const ControlPanel = styled.div`
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const CategorySelector = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const CategoryButton = styled(motion.button)`
  padding: 12px 16px;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? 'linear-gradient(45deg, #f093fb, #f5576c)' : 'rgba(255,255,255,0.1)'};
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255,255,255,0.2)'};
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  max-height: 120px;
  overflow-y: auto;
`;

const ItemButton = styled(motion.button)`
  aspect-ratio: 1;
  border: none;
  border-radius: 12px;
  background: ${props => props.active ? 'linear-gradient(45deg, #f093fb, #f5576c)' : 'rgba(255,255,255,0.1)'};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  padding: 8px;
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255,255,255,0.2)'};
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled(motion.button)`
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: ${props => props.primary ? 'linear-gradient(45deg, #f093fb, #f5576c)' : 'rgba(255,255,255,0.1)'};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.2);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 60px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const AIInsights = styled(motion.div)`
  position: absolute;
  top: 60px;
  left: 20px;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px;
  color: white;
  max-width: 200px;
  z-index: 100;
`;

const categories = [
  { id: 'clothing', label: 'Clothing', icon: Shirt },
  { id: 'accessories', label: 'Accessories', icon: Crown },
  { id: 'eyewear', label: 'Eyewear', icon: Glasses },
  { id: 'watches', label: 'Watches', icon: Watch },
  { id: 'makeup', label: 'Makeup', icon: Palette },
];

const items = {
  clothing: [
    { id: 1, name: 'Blue Jacket', color: '#4169E1' },
    { id: 2, name: 'Red Dress', color: '#DC143C' },
    { id: 3, name: 'Green Tee', color: '#228B22' },
    { id: 4, name: 'Purple Hoodie', color: '#8A2BE2' },
    { id: 5, name: 'Pink Blouse', color: '#FF69B4' },
    { id: 6, name: 'Orange Shirt', color: '#FF6347' },
    { id: 7, name: 'Yellow Top', color: '#FFD700' },
    { id: 8, name: 'Black Suit', color: '#2F2F2F' },
  ],
  accessories: [
    { id: 1, name: 'Gold Crown', color: '#FFD700' },
    { id: 2, name: 'Silver Tiara', color: '#C0C0C0' },
    { id: 3, name: 'Pearl Necklace', color: '#F5F5DC' },
    { id: 4, name: 'Ruby Ring', color: '#E0115F' },
  ],
  eyewear: [
    { id: 1, name: 'Aviators', color: '#4169E1' },
    { id: 2, name: 'Round Glasses', color: '#2F2F2F' },
    { id: 3, name: 'Cat Eye', color: '#8A2BE2' },
    { id: 4, name: 'Sport Shades', color: '#FF6347' },
  ],
  watches: [
    { id: 1, name: 'Gold Watch', color: '#FFD700' },
    { id: 2, name: 'Silver Watch', color: '#C0C0C0' },
    { id: 3, name: 'Smart Watch', color: '#2F2F2F' },
    { id: 4, name: 'Sport Band', color: '#228B22' },
  ],
  makeup: [
    { id: 1, name: 'Red Lipstick', color: '#DC143C' },
    { id: 2, name: 'Pink Blush', color: '#FF69B4' },
    { id: 3, name: 'Blue Eyeshadow', color: '#4169E1' },
    { id: 4, name: 'Gold Highlight', color: '#FFD700' },
  ],
};

const virtualItems = {
  clothing: { top: '25%', left: '50%', transform: 'translateX(-50%)', width: '180px', height: '200px' },
  accessories: { top: '15%', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '80px' },
  eyewear: { top: '35%', left: '50%', transform: 'translateX(-50%)', width: '140px', height: '40px' },
  watches: { top: '60%', right: '25%', width: '60px', height: '60px' },
  makeup: { top: '45%', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '60px' },
};

const ARTryOn = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('clothing');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Simulate camera access
      setTimeout(() => {
        setShowAIInsights(true);
      }, 1000);
    }
  }, [isOpen]);

  const handleCapture = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      // Simulate photo capture
    }, 500);
  };

  const aiSuggestions = [
    "Perfect fit! This style complements your face shape.",
    "Try the blue variant for a more professional look.",
    "This color enhances your skin tone beautifully.",
    "Recommended for your body type and style preferences."
  ];

  if (!isOpen) return null;

  return (
    <ARContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CloseButton onClick={onClose} whileTap={{ scale: 0.9 }}>
        <X size={20} />
      </CloseButton>

      <AnimatePresence>
        {showAIInsights && (
          <AIInsights
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={16} style={{ color: '#f093fb' }} />
              <span style={{ fontSize: '12px', fontWeight: '600' }}>AI Styling Assistant</span>
            </div>
            <p style={{ fontSize: '11px', lineHeight: '1.4', opacity: 0.9 }}>
              {aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]}
            </p>
          </AIInsights>
        )}
      </AnimatePresence>

      <CameraView>
        <CameraPreview>
          <FaceOverlay
            animate={{ 
              borderColor: selectedItem ? 'rgba(240, 147, 251, 0.8)' : 'rgba(255,255,255,0.3)' 
            }}
            transition={{ duration: 0.3 }}
          >
            {selectedItem && (
              <VirtualItem
                position={virtualItems[activeCategory]}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: selectedItem.color,
                    borderRadius: activeCategory === 'eyewear' ? '20px' : activeCategory === 'watches' ? '50%' : '8px',
                    opacity: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '600',
                    textAlign: 'center',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  {selectedItem.name}
                </div>
              </VirtualItem>
            )}
          </FaceOverlay>
          
          <div style={{
            position: 'absolute',
            bottom: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textAlign: 'center',
            fontSize: '14px',
            opacity: 0.7
          }}>
            <Eye size={24} style={{ marginBottom: '8px' }} />
            <p>Position your face within the frame</p>
          </div>
        </CameraPreview>
      </CameraView>

      <ControlPanel>
        <CategorySelector>
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <CategoryButton
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
                {category.label}
              </CategoryButton>
            );
          })}
        </CategorySelector>

        <ItemGrid>
          {items[activeCategory]?.map(item => (
            <ItemButton
              key={item.id}
              active={selectedItem?.id === item.id}
              onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              whileTap={{ scale: 0.95 }}
              style={{ background: item.color }}
            >
              {item.name}
            </ItemButton>
          ))}
        </ItemGrid>

        <ActionBar>
          <ActionButton whileTap={{ scale: 0.9 }}>
            <RotateCcw size={24} />
          </ActionButton>

          <ActionButton
            primary
            onClick={handleCapture}
            whileTap={{ scale: 0.9 }}
            animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Camera size={24} />
          </ActionButton>

          <ActionButton whileTap={{ scale: 0.9 }}>
            <Share2 size={24} />
          </ActionButton>
        </ActionBar>
      </ControlPanel>
    </ARContainer>
  );
};

export default ARTryOn;