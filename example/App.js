import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MusicStorage from './MusicStorage';
import Player from './Player';
import AvoDebugger from 'react-native-analytics-debugger';
import Avo from './Avo';

export default class App extends Component {

  state = { playing: false, currentTrackIndex: 0, looping: false, time: 0, duration: 0 };

  playerStorage = new MusicStorage();
  player = new Player();

  constructor(props) {
    super(props);
    Avo.initAvo(
      { env: 'dev', debugger: AvoDebugger },
      {},
      {},
      { make: function () { }, logEvent: function () { } }
    );
  }

  componentDidMount() {
    this.player.soundObject.setOnPlaybackStatusUpdate((status) => {
      this.setState(() => ({ time: status.positionMillis / 1000, duration: status.durationMillis / 1000 }));
    })
    this.player.load(this.playerStorage.trackAsset(this.state.currentTrackIndex));

    AvoDebugger.enable('bar');
    Avo.appOpened();
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
    if (this, this.state.playing) {
      return "Pause";
    } else {
      return "Play";
    }
  }

  loopButtonTitle() {
    if (this, this.state.looping) {
      return "Looping On";
    } else {
      return "Looping Off";
    }
  }

  onPlayPausePress = () => {
    if (this.state.playing === false) {
      this.player.play(this.playerStorage.trackAsset(this.state.currentTrackIndex));
      Avo.play();
    } else {
      this.player.pause();
      Avo.pause();
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
      this.player.stopAndUnload(() => {
        this.player.load(this.playerStorage.trackAsset(this.state.currentTrackIndex));
        Avo.playNextTrack();
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
      this.player.stopAndUnload(() => {
        this.player.load(this.playerStorage.trackAsset(this.state.currentTrackIndex));
        Avo.playPreviousTrack();
      });
      this.setState(() => ({ playing: false, currentTrackIndex: this.state.currentTrackIndex - 1 }));
    }
  }

  toggleBarDebugger = () => {
    AvoDebugger.enable('bar');
  }

  toggleBubbleDebugger = () => {
    AvoDebugger.enable();
  }

  disableDebugger = () => {
    AvoDebugger.disable();
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
