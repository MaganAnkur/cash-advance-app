import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {CashAdvance} from '../types';
import Icon from '@react-native-vector-icons/material-design-icons';

interface Props {
  advance: CashAdvance;
}

export const CashAdvanceCard = ({advance}: Props) => {
  const getStatusColor = (status: CashAdvance['status']) => {
    switch (status) {
      case 'approved':
        return '#10B981'; // green
      case 'pending':
        return '#F59E0B'; // yellow
      case 'rejected':
        return '#EF4444'; // red
      default:
        return '#6B7280'; // gray
    }
  };

  const statusColor = getStatusColor(advance.status);

  return (
    <Animated.View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <View style={styles.amountContainer}>
            <Icon name="currency-usd" size={24} color="#111827" />
            <Text style={styles.amount}>
              {advance.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, {backgroundColor: statusColor}]} />
            <Text style={[styles.statusText, {color: statusColor}]}>
              {advance.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.feesContainer}>
          <Text style={styles.feesLabel}>Fees</Text>
          <Text style={styles.feesAmount}>
            ${advance.fees.toLocaleString('en-US', {minimumFractionDigits: 2})}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Schedule Section */}
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleHeader}>
          <Icon name="calendar-today" size={20} color="#4B5563" />
          <Text style={styles.scheduleTitle}>Payback Schedule</Text>
        </View>
        {advance.paybackSchedule.map((schedule, index) => (
          <View key={`${advance.id}-${index}`} style={styles.scheduleItem}>
            <Text style={styles.scheduleDate}>
              {new Date(schedule.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </Text>
            <Text style={styles.scheduleAmount}>
              $
              {schedule.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  feesContainer: {
    alignItems: 'flex-end',
  },
  feesLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  feesAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  scheduleContainer: {
    gap: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  scheduleDate: {
    fontSize: 14,
    color: '#4B5563',
  },
  scheduleAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});
