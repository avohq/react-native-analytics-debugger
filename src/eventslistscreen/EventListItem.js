import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {images} from '../images';
import {colors} from '../colors';
import {eventsHaveErrors} from '../utils';
import {styles as barStyles} from '../avobar/AvoBarStyles';
import {baseStyles} from '../BaseStyles';
import {styles} from './EventListItemStyles';

export default class EventsListItem extends Component {
  state = {expended: this.props.expended};

  rowClick = () => {
    this.setState(prevState => ({expended: !prevState.expended}));
  };

  render() {
    let hasError = eventsHaveErrors([this.props.item]);

    let backgroundColor = colors.background;

    let leftIcon = images.tick;
    if (hasError) {
      leftIcon = images.red_warning;
    }

    let rightIcon = images.expend_arrow;
    if (this.state.expended === true) {
      rightIcon = images.collapse_arrow;
    }

    let timestampColor = colors.foregroundLight;

    let eventNameColor = colors.foreground;
    if (hasError) {
      eventNameColor = colors.error;
    }

    const eventDate = new Date();
    eventDate.setTime(this.props.item.timestamp);
    const hours = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    const seconds = eventDate.getSeconds();
    const ms = eventDate.getMilliseconds();
    eventTimeString = hours + ':' + minutes + ':' + seconds + '.' + ms;

    return (
      <View style={[barStyles.container, {backgroundColor: backgroundColor}]}>
        <TouchableOpacity style={barStyles.rowStyle} onPress={this.rowClick}>
          <Image style={barStyles.icon} source={leftIcon} />
          <View style={barStyles.timestampAndNameContainer}>
            <Text style={[barStyles.timestamp, {color: timestampColor}]}>
              {eventTimeString}
            </Text>
            <Text style={[barStyles.eventname, {color: eventNameColor}]}>
              {this.props.item.name}
            </Text>
          </View>

          <Image
            style={{height: 6, width: 10, margin: 19}}
            source={rightIcon}
          />
        </TouchableOpacity>

        {this.bottomView()}

        <View style={baseStyles.divider} />
      </View>
    );
  }

  bottomView() {
    if (this.state.expended) {
      var rows = [];
      for (
        var eventPropIndex = 0;
        eventPropIndex < this.props.item.eventProps.length;
        eventPropIndex++
      ) {
        rows.push(
          this.bottomViewRow(this.props.item.eventProps[eventPropIndex])
        );
        rows.push(<View key={eventPropIndex} style={baseStyles.divider} />);
      }
      for (
        var userPropIndex = 0;
        userPropIndex < this.props.item.userProps.length;
        userPropIndex++
      ) {
        rows.push(this.bottomViewRow(this.props.item.userProps[userPropIndex]));
        rows.push(
          <View
            key={eventPropIndex + userPropIndex}
            style={baseStyles.divider}
          />
        );
      }
      rows.pop();

      return <View style={styles.expendedRowsContainer}>{rows}</View>;
    } else {
      return null;
    }
  }

  bottomViewRow(prop) {
    let error = this.props.item.messages.find(value => {
      return value.propertyId === prop.id;
    });

    let textColor = colors.foregroundLightish;
    let errorMessageView = null;
    if (error) {
      textColor = colors.error;
      errorMessageView = this.boldifyErrorMessage(error);
    }

    return (
      <View key={prop.id} style={{flexDirection: 'column'}}>
        <View style={styles.expendedRow}>
          <Text style={[styles.expendedRowLabel, {color: textColor}]}>
            {prop.name}
          </Text>
          <Text style={[styles.expendedRowValue, {color: textColor}]}>
            {prop.value}
          </Text>
        </View>
        {errorMessageView}
      </View>
    );
  }

  boldifyErrorMessage(error) {
    if (!error.allowedTypes || !error.providedType) {
      return <Text style={styles.errorMessage}>{error.message}</Text>;
    }

    let boldIndexes = [error.message.search(error.propertyId)];
    let boldLengths = [error.propertyId.length];

    for (
      var allowedTypeIndex = 0;
      allowedTypeIndex < error.allowedTypes.length;
      allowedTypeIndex++
    ) {
      boldIndexes.push(
        error.message.search(error.allowedTypes[allowedTypeIndex])
      );
      boldLengths.push(error.allowedTypes[allowedTypeIndex].length);
    }

    boldIndexes.push(error.message.search(error.providedType));
    boldLengths.push(error.providedType.length);

    let styledTextParts = [];
    let startIndex = 0;
    for (var boldIndex = 0; boldIndex < boldIndexes.length; boldIndex++) {
      if (boldIndex !== 0) {
        startIndex = boldIndexes[boldIndex - 1] + boldLengths[boldIndex - 1];
      }

      let nonBoldPart = error.message.substring(
        startIndex,
        boldIndexes[boldIndex]
      );
      if (nonBoldPart.length > 0) {
        styledTextParts.push(<Text key={startIndex}>{nonBoldPart}</Text>);
      }
      styledTextParts.push(
        <Text key={boldIndexes[boldIndex]} style={{fontWeight: 'bold'}}>
          {error.message.substr(boldIndexes[boldIndex], boldLengths[boldIndex])}
        </Text>
      );
    }

    if (boldIndex != 0) {
      startIndex = boldIndexes[boldIndex - 1] + boldLengths[boldIndex - 1];
    }
    styledTextParts.push(
      <Text key={startIndex}>{error.message.substring(startIndex)}</Text>
    );

    return <Text style={styles.errorMessage}>{styledTextParts}</Text>;
  }
}

EventsListItem.propTypes = {
  item: PropTypes.exact({
    key: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.exact({
        propertyId: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        allowedTypes: PropTypes.arrayOf(PropTypes.string),
        providedType: PropTypes.string.isRequired
      })
    ),
    eventProps: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ),
    userProps: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  }),
  expended: PropTypes.bool
};
