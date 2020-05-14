import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MusicStorage from './MusicStorage';
import Player from './Player';
import AvoDebugger from 'react-native-analytics-debugger';
import Avo from './Avo';
import * as Inspector from 'avo-inspector';

export default class App extends Component {

  state = { playing: false, currentTrackIndex: 0, looping: false, time: 0, duration: 0 };

  playerStorage = new MusicStorage();
  player = new Player();

  constructor(props) {
    super(props);

    let inspector = new Inspector.AvoInspector({ apiKey: "AYytYzAOPvJh1XZfy8yj", env: "dev", version: "v1", appName: "Debugger test app" });

    inspector.enableLogging(true);

    Avo.initAvo(
      { env: 'dev', debugger: AvoDebugger},
      {},
      {},
      { make: function () { }, logEvent: function (eventName) { 

        inspector.trackSchemaFromEvent(eventName, [])

      } }
    );
    Avo.appOpened();
  }

  componentDidMount() {
    this.player.soundObject.setOnPlaybackStatusUpdate((status) => {
      this.setState(() => ({ time: status.positionMillis / 1000, duration: status.durationMillis / 1000 }));
    })
    this.player.load(this.playerStorage.trackAsset(this.state.currentTrackIndex));

    AvoDebugger.showDebugger({mode: "bar"});
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ position: 'absolute', top: 48, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button onPress={this.toggleBarDebugger}
            title="Bar debugger" />
          <Button onPress={this.toggleBubbleDebugger}
            title="Bubble debugger" />
          <Button onPress={this.disableDebugger}
            title="Disable debugger" />
        </View>

        <Text style={styles.label}>{this.playerStorage.trackName(this.state.currentTrackIndex)}</Text>

        <Text style={styles.label}>{this.timingLabel()}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {this.prevTrackButton()}
          <Button onPress={this.onPlayPausePress}
            title={this.playButtonTitle()} />
          {this.nextTrackButton()}
        </View>
        <View style={{ margin: 16 }}>
          <Button
            onPress={this.onLoopPress}
            title={this.loopButtonTitle()} />
        </View>
      </View>
    );
  }

  timingLabel = () => {
    if (isNaN(this.state.time)) {
      return "";
    }

    return this.state.time + " / " + this.state.duration;
  }

  playButtonTitle() {
    if (this.state.playing) {
      return "Pause";
    } else {
      return "Play";
    }
  }

  loopButtonTitle() {
    if (this.state.looping) {
      return "Looping On";
    } else {
      return "Looping Off";
    }
  }

  onPlayPausePress = () => {
    if (this.state.playing === false) {
      this.player.play(this.playerStorage.trackAsset(this.state.currentTrackIndex));
      Avo.play({ currentSongName: this.playerStorage.trackName(this.state.currentTrackIndex) });
    } else {
      this.player.pause();
      Avo.pause({ currentSongName: this.playerStorage.trackName(this.state.currentTrackIndex) });
    }

    this.setState(() => ({ playing: !this.state.playing }));
  }

  nextTrackButton = () => {
    if (this.playerStorage.hasNext(this.state.currentTrackIndex)) {
      return <View style={{ width: 24 }}>
        <Button onPress={this.onNextTrackPress}
          title=">" />
      </View>
    } else {
      return <View style={{ width: 24 }} />
    }
  }

  onNextTrackPress = () => {
    if (this.playerStorage.hasNext(this.state.currentTrackIndex)) {
      Avo.playNextTrack({currentSongName: this.playerStorage.trackName(this.state.currentTrackIndex),
        upcomingTrackName: this.playerStorage.nextTrackName(this.state.currentTrackIndex)});

      this.player.stopAndUnload(() => {
        this.player.load(this.playerStorage.trackAsset(this.state.currentTrackIndex));
      });
      this.setState(() => ({ playing: false, currentTrackIndex: this.state.currentTrackIndex + 1 }));
    }
  }

  prevTrackButton = () => {
    if (this.playerStorage.hasPrev(this.state.currentTrackIndex)) {
      return <View style={{ width: 24 }}>
        <Button onPress={this.onPrevTrackPress}
          title="<" />
      </View>
    } else {
      return <View style={{ width: 24 }} />
    }
  }

  onPrevTrackPress = () => {
    if (this.playerStorage.hasPrev(this.state.currentTrackIndex)) {
      Avo.playPreviousTrack({currentSongName: this.playerStorage.trackName(this.state.currentTrackIndex),
        upcomingTrackName: this.playerStorage.prevTrackName(this.state.currentTrackIndex)});

      this.player.stopAndUnload(() => {
        this.player.load(this.playerStorage.trackAsset(this.state.currentTrackIndex));
      });
      this.setState(() => ({ playing: false, currentTrackIndex: this.state.currentTrackIndex - 1 }));
    }
  }

  toggleBarDebugger = () => {
    AvoDebugger.showDebugger({mode: "bar"});
  }

  toggleBubbleDebugger = () => {
    AvoDebugger.showDebugger({mode: "bubble"});
  }

  disableDebugger = () => {
    AvoDebugger.hideDebugger();
  }

  onLoopPress = () => {
    this.player.setLooping(!this.state.looping);
    this.setState(() => ({ looping: !this.state.looping }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  label: { alignSelf: 'center', margin: 16 },

});
