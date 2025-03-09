import React, {useEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
  Easing,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  onPress: () => void;
}

export const FloatingActionButton = ({onPress}: Props) => {
  const scale = useSharedValue(0);
  const translateY = useSharedValue(100);

  useEffect(() => {
    // Entry animation
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });
    translateY.value = withSpring(0, {
      damping: 12,
      stiffness: 90,
    });

    // Floating animation
    translateY.value = withRepeat(
      withSequence(
        withTiming(-4, {
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
        }),
        withTiming(0, {
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
        }),
      ),
      -1, // Infinite repeat
      true, // Reverse
    );
  }, [scale, translateY]);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.9, {damping: 8, stiffness: 400}),
      withDelay(
        100,
        withSpring(1, {
          damping: 8,
          stiffness: 400,
        }),
      ),
    );
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}, {translateY: translateY.value}],
    };
  });

  return (
    <AnimatedTouchable
      style={[styles.fab, animatedStyle]}
      onPress={handlePress}>
      <Icon name="plus" size={24} color="#FFFFFF" />
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
