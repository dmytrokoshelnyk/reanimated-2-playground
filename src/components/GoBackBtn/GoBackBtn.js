import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TOP_BUTTON_MARGIN = 10;

export const GoBackBtn = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.goBackBtn, {top: insets.top + TOP_BUTTON_MARGIN}]}>
      <Text style={styles.goBackText}>Go Back </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goBackBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  goBackText: {
    color: 'white',
  },
});
