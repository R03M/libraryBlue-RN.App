import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

const DotsLoading = () => {
  const [dot1] = useState(new Animated.Value(0));
  const [dot2] = useState(new Animated.Value(0));
  const [dot3] = useState(new Animated.Value(0));
  const animationRef = useRef();

  useEffect(() => {
    animateDots();
    return () => {
      animationRef.current && animationRef.current.stop();
    };
  }, []);

  const animateDots = () => {
    const duration = 100;
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(dot1, {
          toValue: 0,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 0,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 0,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    animationRef.current.start();
  };

  const dot1Style = {
    opacity: dot1,
    backgroundColor: '#0F0',
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    transform: [{ scale: dot1 }],
  };

  const dot2Style = {
    opacity: dot2,
    backgroundColor: '#0F0',
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    transform: [{ scale: dot2 }],
  };

  const dot3Style = {
    opacity: dot3,
    backgroundColor: '#0F0',
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    transform: [{ scale: dot3 }],
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Animated.View style={dot1Style} />
      <Animated.View style={dot2Style} />
      <Animated.View style={dot3Style} />
    </View>
  );
};

export default DotsLoading;
