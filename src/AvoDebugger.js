import React from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {Component} from 'react';
import RootSiblings from 'react-native-root-siblings';
import EventsListScreen from './eventslistscreen/EventsListScreen';
import AvoBubble from './avobubble/AvoBubble';
import {styles} from './AvoDebuggerStyles';
import AvoDebuggerDrags from './AvoDebuggerDrags';
import AvoBar from './avobar/AvoBar';
import {eventsHaveErrors} from './utils';

export default class AvoDebugger extends Component {
  static avo = null;
  static rootSibling = null;
  static items = [];
  static unhandledNewItems = { count: 0 };

  static showDebugger = ({mode}) => {
    AvoDebugger.disable();

    let isBar = mode === 'bar';

    AvoDebugger.rootSibling = new RootSiblings(<AvoDebugger
      isBar={isBar}
      ref={(avoView) => AvoDebugger.avo = avoView}
    />);
  }

  static hideDebugger = () => {
    if (AvoDebugger.rootSibling != null) {
      AvoDebugger.rootSibling.destroy();
      AvoDebugger.rootSibling = null;
      AvoDebugger.avo = null;
    }
  }

  static isEnabled = () => {
    return AvoDebugger.rootSibling !== null;
  };

  static postEvent = (
    eventId,
    timestamp,
    eventName,
    messages,
    eventProperties,
    userProperties
  ) => {
    if (AvoDebugger.isEnabled()) {
      AvoDebugger.items.push({
        key: Math.random().toString(),
        id: eventId,
        timestamp: timestamp,
        name: eventName,
        messages: messages,
        eventProps: eventProperties,
        userProps: userProperties
      });
      if (AvoDebugger.avo != null) {
        AvoDebugger.avo.onNewEvent();
      } else {
        AvoDebugger.unhandledNewItems.count += 1;
      }
    }
  };

  state = {unreadMessages: 0, pan: new Animated.ValueXY()};
  drags = new AvoDebuggerDrags();

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.isBar) {
      this.drags.setupBarDrags(this.state.pan);
    } else {
      this.drags.setupBubbleDrags(this.state.pan);
    }
  }

  componentDidMount() {
    this.setState(prevState => ({unreadMessages: AvoDebugger.unhandledNewItems.count}), () => {
      AvoDebugger.unhandledNewItems.count = 0;
    });
  }

  onNewEvent() {
    this.setState(prevState => ({unreadMessages: prevState.unreadMessages + 1}));
  }

  render() {
    if (this.props.isBar) {
      return this.barView();
    } else {
      return this.bubbleView();
    }
  }

  barView() {
    return (
      <Animated.View
        style={[
          {
            transform: this.state.pan.getTranslateTransform()
          },
          styles.barContainer
        ]}
        {...this.drags.panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={() => {
            EventsListScreen.toggleDebuggerLogScreen(
              AvoDebugger.items,
              this.state.unreadMessages
            );
            this.setState(() => ({unreadMessages: 0}));
          }}
        >
          <AvoBar
            lastItemName={this.lastItemName()}
            lastItemTimestamp={this.lastItemTimestamp()}
            hasErrors={this.hasNewErrors()}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  lastItemName() {
    let lastItem = AvoDebugger.items[AvoDebugger.items.length - 1];
    if (lastItem) {
      return lastItem.name;
    } else {
      return 'No Events Yet';
    }
  }

  lastItemTimestamp() {
    let lastItem = AvoDebugger.items[AvoDebugger.items.length - 1];
    if (lastItem) {
      return lastItem.timestamp;
    } else {
      return Date.now();
    }
  }

  bubbleView() {
    return (
      <Animated.View
        style={[
          {
            transform: this.state.pan.getTranslateTransform()
          },
          styles.bubbleContainer
        ]}
        {...this.drags.panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={() => {
            EventsListScreen.toggleDebuggerLogScreen(
              AvoDebugger.items,
              this.state.unreadMessages
            );
            this.setState(() => ({unreadMessages: 0}));
          }}
        >
          <AvoBubble
            newItems={this.state.unreadMessages}
            hasErrors={this.hasNewErrors()}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  hasNewErrors() {
    let start = AvoDebugger.items.length - this.state.unreadMessages;
    let end = AvoDebugger.items.length;
    let newItems = AvoDebugger.items.slice(start, end);
    return eventsHaveErrors(newItems);
  }
}
