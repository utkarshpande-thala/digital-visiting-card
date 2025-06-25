import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/AppStyles';

export default function FormScreen({ cardData, handleInputChange, isFormValid, setCurrentView }) {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Create Digital Card</Text>
        <Text style={styles.headerSubtitle}>Fill in your details</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={cardData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Job Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Software Developer"
            value={cardData.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.input}
            placeholder="Company name"
            value={cardData.company}
            onChangeText={(text) => handleInputChange('company', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone *</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 234 567 8900"
            value={cardData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            value={cardData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>LinkedIn</Text>
          <TextInput
            style={styles.input}
            placeholder="linkedin.com/in/yourprofile"
            value={cardData.linkedin}
            onChangeText={(text) => handleInputChange('linkedin', text)}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            placeholder="www.yourwebsite.com"
            value={cardData.website}
            onChangeText={(text) => handleInputChange('website', text)}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your address"
            value={cardData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !isFormValid() && styles.buttonDisabled]}
          onPress={() => setCurrentView('preview')}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Preview Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}