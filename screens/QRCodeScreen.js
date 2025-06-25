import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { styles } from '../styles/AppStyles';

export default function QRCodeScreen({ cardData, setCurrentView }) {
  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.name}
ORG:${cardData.company}
TITLE:${cardData.title}
TEL:${cardData.phone}
EMAIL:${cardData.email}
URL:${cardData.website}
ADR:;;${cardData.address};;;;
NOTE:LinkedIn: ${cardData.linkedin}
END:VCARD`;
    return vcard;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>QR Code</Text>
        <Text style={styles.headerSubtitle}>Scan to get contact info</Text>
      </LinearGradient>

      <View style={styles.qrContainer}>
        <View style={styles.qrCodeWrapper}>
          <QRCode
            value={generateVCard()}
            size={250}
            backgroundColor="white"
            color="black"
          />
        </View>
        
        <Text style={styles.qrText}>
          Scan this QR code to save {cardData.name}'s contact information
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setCurrentView('preview')}
          >
            <Text style={styles.secondaryButtonText}>Back to Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setCurrentView('form')}
          >
            <Text style={styles.buttonText}>Edit Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}