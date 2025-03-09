import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useNetwork} from '../hooks/useNetwork';
import {useCashAdvances} from '../api/cashAdvanceApi';
import {CashAdvance} from '../types';
import {CashAdvanceCard} from '../components/CashAdvanceCard';
import {FloatingActionButton} from '../components/FloatingActionButton';

export const CashAdvanceScreen = () => {
  const navigation = useNavigation();
  const {isOnline, hasPendingRequests, pendingRequestsCount} = useNetwork();
  const {data: advances, isLoading} = useCashAdvances();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  const renderAdvanceItem = ({item}: {item: CashAdvance}) => (
    <CashAdvanceCard advance={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {!isOnline && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineText}>
              You're offline. Requests will sync when connection is restored.
            </Text>
            {hasPendingRequests && (
              <Text style={styles.pendingText}>
                Pending requests: {pendingRequestsCount}
              </Text>
            )}
          </View>
        )}

        <FlatList
          data={advances}
          renderItem={renderAdvanceItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No cash advances found</Text>
          }
        />

        <FloatingActionButton
          onPress={() => navigation.navigate('RequestAdvance')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  offlineBanner: {
    backgroundColor: '#FEF3C7', // Light yellow background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FCD34D', // Darker yellow border
  },
  offlineText: {
    color: '#92400E', // Dark yellow/brown text
    fontSize: 14,
    fontWeight: '500',
  },
  pendingText: {
    color: '#92400E',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '400',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  advanceItem: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  amount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  status: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  fees: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
  },
  scheduleContainer: {
    marginTop: 12,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  scheduleItem: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 24,
  },
});
