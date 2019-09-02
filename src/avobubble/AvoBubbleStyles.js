import {
    StyleSheet, Platform
  } from 'react-native';

export const styles = StyleSheet.create({
    mainImage: 
        { width: 50, height: 50 },
    badge:
        { position:'absolute', bottom:0, left:0, width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
    messageCounter:
        { paddingBottom: 4, fontSize: 9 , textAlign: 'center', textAlignVertical: 'center'}
})