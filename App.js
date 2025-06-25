import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import FormScreen from './screens/FormScreen';
import PreviewScreen from './screens/PreviewScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import { styles } from './styles/AppStyles';

export default function DigitalCardApp() {
  const [currentView, setCurrentView] = useState('form'); // 'form', 'preview', 'qr'
  const [cardData, setCardData] = useState({
    name: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    linkedin: '',
    website: '',
    address: '',
  });

  const handleInputChange = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return cardData.name.trim() && cardData.phone.trim() && cardData.email.trim();
  };

  return (
    <View style={styles.app}>
      <StatusBar barStyle="light-content" />
      {currentView === 'form' && (
        <FormScreen 
          cardData={cardData}
          handleInputChange={handleInputChange}
          isFormValid={isFormValid}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'preview' && (
        <PreviewScreen 
          cardData={cardData}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'qr' && (
        <QRCodeScreen 
          cardData={cardData}
          setCurrentView={setCurrentView}
        />
      )}
    </View>
  );
}