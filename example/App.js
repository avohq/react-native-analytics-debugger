import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MusicStorage from './MusicStorage';
import Player from './Player';
import AvoDebugger from 'avo-react-native-debugger';

export default class App extends Component {

  state = { playing: false, currentTrackIndex: 0, looping: false, time: 0, duration: 0 };

  playerStorage = new MusicStorage();
  player = new Player();

  componentDidMount() {
    this.player.soundObject.setOnPlaybackStatusUpdate((status) => {
      this.setState(() => ({ time: status.positionMillis/1000, duration: status.durationMillis/1000 }));
    })
    this.player.load(this.playerStorage.trackAsset(this.state.currentTrackIndex));
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{position: 'absolute', top: 48, left: 0, right: 0, flexDirection:'row', justifyContent: 'space-around'}}>
          <Button onPress={this.toggleBarDebugger}
              title="Toggle bar debugger"/>
          <Button onPress={this.toggleBubbleDebugger}
              title="Toggle bubble debugger"/>
        </View>

        <Text style={styles.label}>{this.playerStorage.trackName(this.state.currentTrackIndex) }</Text>

        <Text style={styles.label}>{this.timingLabel()}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button 
            onPress={this.onPrevTrackPress}
              title="<"/>
          <Button onPress={this.onPlayPausePress}
              title={this.playButtonTitle()}/>
          <Button onPress={this.onNextTrackPress}
              title=">"/>
        </View>
        <View style={{margin: 16}}>
          <Button 
              onPress={this.onLoopPress}
                title={this.loopButtonTitle()}/>
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
    if (this,this.state.playing) {
      return "Pause";
    } else {
      return "Play";
    }
  }

  loopButtonTitle() {
    if (this,this.state.looping) {
      return "Looping On";
    } else {
      return "Looping Off";
    }
  }

  onPlayPausePress = () => {
    if (this.state.playing === false) {
      this.player.play(this.playerStorage.trackAsset(this.state.currentTrackIndex));
    } else {
      this.player.pause();
    }

    this.setState(() => ({ playing: !this.state.playing }));
  }

  onNextTrackPress = () => {
    if (this.playerStorage.hasNext(this.state.currentTrackIndex)) {
      this.player.stopAndUnload(() => {
        this.player.load(this.playerStorage.trackAsset(this.state.currentTrackIndex));
      });
      this.setState(() => ({ playing: false, currentTrackIndex: this.state.currentTrackIndex + 1 }));
    }
  }

  onPrevTrackPress = () => {
      if (this.playerStorage.hasPrev(this.state.currentTrackIndex)) {
        this.player.stopAndUnload(() => {
          this.player.load(this.playerStorage.trackAsset(this.state.currentTrackIndex));
        });
        this.setState(() => ({ playing: false, currentTrackIndex: this.state.currentTrackIndex - 1 }));
      }
  }

  toggleBarDebugger = () => {
    AvoDebugger.toggleDebugger(true);
  }

  toggleBubbleDebugger = () => {
    AvoDebugger.toggleDebugger(false);
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
  label: {alignSelf: 'center', margin: 16},

});
