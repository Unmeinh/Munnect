import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HelloComp from './Component/HelloComp';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
      'Aclonica': require('./assets/fonts/Aclonica.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
          await SplashScreen.hideAsync();
      }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
      return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <HelloComp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
