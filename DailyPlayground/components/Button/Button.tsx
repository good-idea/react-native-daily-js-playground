import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Text,
} from 'react-native';

type Props = {
  onPress: () => void;
  disabled?: boolean;
  label: string;
  type?: string;
};

const Button = ({
  onPress,
  disabled = false,
  label,
  type = 'primary',
}: Props) => {
  const animatedValue = new Animated.Value(0);

  const animatedScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.button,
          type === 'primary' ? styles.primary : styles.secondary,
          disabled && styles.disabled,
          {
            transform: [{ scaleX: animatedScale }, { scaleY: animatedScale }],
          },
        ]}
      >
        <Text style={styles.text}>{label}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 8,
  },
  primary: {
    backgroundColor: '#72cc18',
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c8d1dc',
  },
  disabled: {
    backgroundColor: '#e6eaef',
  },
  text: {
    fontFamily: 'Helvetica Neue',
    color: '#121a24',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Button;
