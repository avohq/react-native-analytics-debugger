import {
    StyleSheet
  } from 'react-native';
  import { colors } from '../colors';

export const styles = StyleSheet.create({
    expendedRowsContainer: {alignSelf: 'stretch', marginStart: 16, marginEnd: 16},
    errorMessage: { fontSize: 10, marginBottom: 16, color: colors.error },
    expendedRow: { height: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    expendedRowLabel: { fontWeight: 'bold', fontSize: 12 },
    expendedRowValue: { fontSize: 12 }
})