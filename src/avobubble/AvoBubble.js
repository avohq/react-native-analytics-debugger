import React from 'react';
import { View, Image, Text, Platform, ImageBackground } from 'react-native';
import { images } from '../images';
import { colors } from '../colors';
import PropTypes from 'prop-types';
import { styles } from './AvoBubbleStyles';

export default function AvoBubble(props) {

    let mainImage = images.avo_buuble;
    if (props.hasErrors) {
        mainImage = images.avo_bubble_error;
    }

    let badgeBackground = images.badge_green;
    if (props.hasErrors) {
        badgeBackground = images.badge_white;
    }

    let textColor = colors.background;
    if (props.hasErrors) {
        textColor = colors.error;
    }

    if (props.newItems > 0) {
        let itemsCounter = props.newItems;
        if (Platform.OS === 'android' && itemsCounter > 999) {
            itemsCounter = "...";
        }
        return (
            <View style={styles.mainImage}>
                <Image source={mainImage} style={styles.mainImage} />
                <ImageBackground style={styles.badge} source={badgeBackground}>
                    <Text adjustsFontSizeToFit={Platform.OS === 'ios'}
                        ellipsizeMode={'tail'} numberOfLines={1}
                        style={[styles.messageCounter, { color: textColor }]}>{itemsCounter}</Text>
                </ImageBackground>
            </View>
        );
    } else {
        return (
            <View>
                <Image source={mainImage} style={styles.mainImage} />
            </View>
        );
    }
}

AvoBubble.propTypes = {
    newItems: PropTypes.number,
    hasErrors: PropTypes.bool
}