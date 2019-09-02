import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../images';
import { colors } from '../colors';
import {styles} from './AvoBarStyles';
import {baseStyles} from '../BaseStyles';

export default function AvoBar(props) {

    let backgroundColor = colors.background;
    if (props.hasErrors) {
        backgroundColor = colors.error;
    }

    let leftIcon = images.tick;
    if (props.hasErrors) {
        leftIcon = images.white_warning;
    }

    let rightIcon = images.drag_handle_dark;
    if (props.hasErrors) {
        rightIcon = images.drag_handle_light;
    }

    let timestampColor = colors.foregroundLight;
    if (props.hasErrors) {
        timestampColor = colors.foregroundLighter;
    }

    let eventNameColor = colors.foreground;
    if (props.hasErrors) {
        eventNameColor = colors.background;
    }

    const eventDate = new Date();
    eventDate.setTime(props.lastItemTimestamp);
    const hours = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    const seconds = eventDate.getSeconds();
    const ms = eventDate.getMilliseconds();
    eventTimeString = hours + ":" + minutes + ":" + seconds + '.' + ms;

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <View style={baseStyles.divider} />

            <View style={styles.rowStyle}>
                <Image style={styles.icon} source={leftIcon} />
                <View style={styles.timestampAndNameContainer}>
                    <Text style={[styles.timestamp, {color: timestampColor}]}>{eventTimeString}</Text>
                    <Text style={[styles.eventname, {color: eventNameColor}]}>{props.lastItemName}</Text>
                </View>

                <Image style={styles.icon} source={rightIcon} />
            </View>

            <View style={baseStyles.divider} />
        </View>
    );
}

AvoBar.propTypes = {
    hasErrors: PropTypes.bool,
    lastItemName: PropTypes.string,
    lastItemTimestamp: PropTypes.number,
}