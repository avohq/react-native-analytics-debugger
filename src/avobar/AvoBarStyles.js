import {
    StyleSheet
  } from 'react-native';

export const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    rowStyle: { height: 52, flex: 1, flexDirection: "row", alignItems: "center" },
    icon: { height: 16, width: 16, margin: 16, resizeMode: 'contain' },
    timestamp: { fontWeight: "bold", textAlignVertical: "center", fontSize: 8 },
    eventname: { fontWeight: "bold", textAlignVertical: "center", fontSize: 16 },
    timestampAndNameContainer: { marginLeft: 8, flex: 1 }
})