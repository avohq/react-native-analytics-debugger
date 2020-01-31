import { Platform, Dimensions, StatusBar } from 'react-native';

export function topOffset() {
    if (Platform.OS === 'ios') {
        const dimen = Dimensions.get('window');

        let possibleDimensions = [812, 896];

        let isCorrectDimension = possibleDimensions.filter(dimension => dimen.height === dimension || dimen.width === dimension).length > 0;

        if (isCorrectDimension) {
            return 48;
        }
    } else {
        return StatusBar.currentHeight;
    }
}

export function eventsHaveErrors(items) {
    return items.find(value => value.messages.length > 0) !== undefined;
}

export function pad(num, size) {
    var numString = String(num);
    while (numString.length < (size || 2)) {numString = "0" + numString;}
    return numString;
}