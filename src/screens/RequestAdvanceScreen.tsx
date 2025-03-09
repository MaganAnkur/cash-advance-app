import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCreateCashAdvance} from '../api/cashAdvanceApi';
import {v4 as uuidv4} from 'uuid';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';
import Icon from '@react-native-vector-icons/material-design-icons';

export const RequestAdvanceScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const {mutate: createAdvance} = useCreateCashAdvance();

  const successAnim = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(successAnim.value, [0, 1], [0, 1]),
      transform: [
        {
          scale: interpolate(successAnim.value, [0, 1], [0.8, 1]),
        },
      ],
    };
  });

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    createAdvance(
      {
        id: uuidv4(),
        amount: numAmount,
        requestedAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          successAnim.value = withSpring(1, {
            damping: 12,
            stiffness: 100,
          });
          setTimeout(() => {
            navigation.goBack();
          }, 1500);
        },
        onError: () => {
          Alert.alert('Error', 'Failed to create cash advance request');
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Cash Advance</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.successOverlay, animatedStyle]}>
        <View style={styles.successContent}>
          <Icon name="check-circle" size={48} color="#10B981" />
          <Text style={styles.successText}>Request Submitted</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0066CC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContent: {
    alignItems: 'center',
    gap: 16,
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
  },
});
