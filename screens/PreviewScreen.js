import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { styles } from '../styles/AppStyles';

export default function PreviewScreen({ cardData, setCurrentView }) {
  const viewShotRef = useRef();

  const shareCard = async () => {
    const cardText = `${cardData.name}
${cardData.title} at ${cardData.company}
📞 ${cardData.phone}
📧 ${cardData.email}
🔗 ${cardData.linkedin}
🌐 ${cardData.website}
📍 ${cardData.address}`;

    try {
      await Share.share({
        message: cardText,
        title: 'Digital Visiting Card',
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share the card');
    }
  };

  const saveCardAsImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant photo library access');
        return;
      }

      const uri = await viewShotRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Success', 'Card saved to photo library!');
    } catch (error) {
      Alert.alert('Error', 'Could not save the card');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Your Digital Card</Text>
        <Text style={styles.headerSubtitle}>Preview & Share</Text>
      </LinearGradient>

      <ScrollView style={styles.previewContainer}>
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
          <LinearGradient
            colors={['#ff9a56', '#ff6b95']}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardName}>{cardData.name}</Text>
              {cardData.title && (
                <Text style={styles.cardTitle}>{cardData.title}</Text>
              )}
              {cardData.company && (
                <Text style={styles.cardCompany}>{cardData.company}</Text>
              )}
              
              <View style={styles.cardDivider} />
              
              <View style={styles.contactInfo}>
                <Text style={styles.contactItem}>📞 {cardData.phone}</Text>
                <Text style={styles.contactItem}>📧 {cardData.email}</Text>
                {cardData.linkedin && (
                  <Text style={styles.contactItem}>🔗 {cardData.linkedin}</Text>
                )}
                {cardData.website && (
                  <Text style={styles.contactItem}>🌐 {cardData.website}</Text>
                )}
                {cardData.address && (
                  <Text style={styles.contactItem}>📍 {cardData.address}</Text>
                )}
              </View>
            </View>
          </LinearGradient>
        </ViewShot>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setCurrentView('qr')}
          >
            <Text style={styles.secondaryButtonText}>Show QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={shareCard}
          >
            <Text style={styles.secondaryButtonText}>Share Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={saveCardAsImage}
          >
            <Text style={styles.secondaryButtonText}>Save as Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setCurrentView('form')}
          >
            <Text style={styles.buttonText}>Edit Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}