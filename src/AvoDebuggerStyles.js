import {
    StyleSheet
  } from 'react-native';

export const styles = StyleSheet.create({
    barContainer: 
        { flex: 1, position: "absolute", left: 0, bottom: -1, right: 0, alignContent: "center", zIndex: 999 },
    bubbleContainer:
        { flex: 1, position: "absolute", bottom: 16, right: 0, alignContent: "center", textAlign: 'center', textAlignVertical: "center", zIndex: 999 }
})