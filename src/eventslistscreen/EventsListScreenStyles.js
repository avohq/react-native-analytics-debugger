import {
    StyleSheet
  } from 'react-native';
import { colors } from '../colors';

export const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
        backgroundColor: colors.background,
    },
    avoLabelContainer: { height: 48, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    closeButtonTouchableArea: { height: 48, width: 48, position: 'absolute', top: 0, right: 0 },
    closeButton: { height: 10, width: 10, marginTop: 19, marginLeft: 19 },
    list: { backgroundColor: colors.background }
})