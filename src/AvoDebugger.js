import React from 'react';
import {Animated, TouchableOpacity, Platform, Settings, AsyncStorage} from 'react-native';
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
  static unhandledNewItems = {count: 0};
  static schemaId = "";

  static showDebugger = ({mode}) => {
    AvoDebugger.hideDebugger();

    let isBar = mode === 'bar';

    AvoDebugger.rootSibling = new RootSiblings(
      <AvoDebugger isBar={isBar} ref={avoView => (AvoDebugger.avo = avoView)} />
    );

    this.trackDebuggerStarted();
  };

  static generateInstallationId = () => {
    var uuid = function(a) {
      return a           // if the placeholder was passed, return
          ? (              // a random number from 0 to 15
          a ^            // unless b is 8,
          Math.random()  // in which case
          * 16           // a random number from
          >> a / 4         // 8 to 11
          ).toString(16) // in hexadecimal
          : (              // or otherwise a concatenated string:
          [1e7] +        // 10000000 +
          -1e3 +         // -1000 +
          -4e3 +         // -4000 +
          -8e3 +         // -80000000 +
          -1e11          // -100000000000,
          ).replace(     // replacing
          /[018]/g,    // zeroes, ones, and eights with
          uuid         // random hex digits
      );
    };
    return uuid() + 'R';
  }

  static trackDebuggerStarted = () => {
    let packageInfo = require('../package.json');

    var installationId = Platform.OS;
    if (Platform.OS === 'ios') {
      let id = Settings.get('avo_debugger_device_id');
      if (id == null) {
        id = AvoDebugger.generateInstallationId();
        Settings.set({avo_debugger_device_id:id});
      }
      installationId = id;
      AvoDebugger.callTrackDebuggerStarted(installationId, packageInfo);  
    } else if (Platform.OS === 'android') {
      AsyncStorage.getItem('avo_debugger_device_id').then((id) => {         
    
        if (id == null) {
          id = AvoDebugger.generateInstallationId();
          AsyncStorage.setItem('avo_debugger_device_id', id);
        }
        installationId = id;
        AvoDebugger.callTrackDebuggerStarted(installationId, packageInfo);  
      });
    }  
  }

  static callTrackDebuggerStarted(installationId, packageInfo) {
    let platform = Platform.OS;
    fetch('https://api.avo.app/c/v1/track/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName: "Debugger Started",
        deviceId: installationId,
        eventProperties: {
          client: "React Native Debugger (" + platform + ")",
          version: packageInfo.version,
          schemaId: this.schemaId,
        }
      }),
    });
  }

  static hideDebugger = () => {
    if (AvoDebugger.rootSibling != null) {
      AvoDebugger.rootSibling.destroy();
      AvoDebugger.rootSibling = null;
      AvoDebugger.avo = null;
    }
  };

  static isEnabled = () => {
    return AvoDebugger.rootSibling !== null;
  };

  static post = (
    timestamp,
    eventName,
    errors,
    eventProperties,
    userProperties
  ) => { 
    AvoDebugger.postEvent("", timestamp, eventName, errors, eventProperties, userProperties);
  }

  static postEvent = (
    eventId,
    timestamp,
    eventName,
    messages,
    eventProperties,
    userProperties
  ) => {
    EventsListScreen.items.push({
      key: Math.random().toString(),
      id: eventId,
      timestamp: timestamp,
      name: eventName,
      messages: messages,
      eventProps: eventProperties,
      userProps: userProperties
    });
    if (AvoDebugger.avo != null) {
      if (EventsListScreen.isVisible()) {
        EventsListScreen.updateDebuggerLogScreen();
      } else {
        AvoDebugger.avo.onNewEvent();
      }
    } else {
      AvoDebugger.unhandledNewItems.count += 1;
    }
  };

  state = {unreadMessages: 0, pan: new Animated.ValueXY()};
  drags = new AvoDebuggerDrags();

  constructor(props) {
    super(props);

    if (this.props.isBar) {
      this.drags.setupBarDrags(this.state.pan);
    } else {
      this.drags.setupBubbleDrags(this.state.pan);
    }
  }

  componentDidMount() {
    this.setState(
      prevState => ({unreadMessages: AvoDebugger.unhandledNewItems.count}),
      () => {
        AvoDebugger.unhandledNewItems.count = 0;
      }
    );
  }

  onNewEvent() {
    this.setState(prevState => ({
      unreadMessages: prevState.unreadMessages + 1
    }));
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
            this.setState(() => ({unreadMessages: 0}));
            EventsListScreen.toggleDebuggerLogScreen();
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
    let lastItem = EventsListScreen.items[EventsListScreen.items.length - 1];
    if (lastItem) {
      return lastItem.name;
    } else {
      return 'No Events Yet';
    }
  }

  lastItemTimestamp() {
    let lastItem = EventsListScreen.items[EventsListScreen.items.length - 1];
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
            this.setState(() => ({unreadMessages: 0}));
            EventsListScreen.toggleDebuggerLogScreen();
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
    let start = EventsListScreen.items.length - this.state.unreadMessages;
    let end = EventsListScreen.items.length;
    let newItems = EventsListScreen.items.slice(start, end);
    return eventsHaveErrors(newItems);
  }
}
