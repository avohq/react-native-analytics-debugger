import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Audio } from "expo-av";
import AvoDebugger from "react-native-analytics-debugger";
import * as Inspector from "react-native-avo-inspector";

import Avo from "./Avo";

const inspector = new Inspector.AvoInspector({
  apiKey: "AYytYzAOPvJh1XZfy8yj",
  env: "dev",
  version: "v1",
  appName: "Debugger test app"
});

let songs = {
  greek_loop_mix: require("./assets/greek_loop_mix.mp3"),
  jingle_jungle_around_the_bot: require("./assets/jingle_jungle_around_the_bot.wav"),
  "cartoon-whistle": require("./assets/cartoon-whistle.wav")
};

const App = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLooping, setIsLooping] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const [sound, setSound] = React.useState();

  React.useEffect(() => {
    inspector.enableLogging(true);

    Avo.initAvo(
      { env: "dev", debugger: AvoDebugger },
      {}, // This object is for system properties
      {}, // This is for legacy destination options, you probably won't need to use it
      {
        // This is your destination interface. Here you'd send your event to your analytics provider. If you have many destinations they get chained here in the same order as they appear in the Avo UI. You can confirm the order by looking at the the initAvo function in the Avo file.
        make: () => {},
        logEvent: (eventName) => {
          inspector.trackSchemaFromEvent(eventName, []);
        }
      }
    );
    Avo.appOpened();

    AvoDebugger.showDebugger({ mode: "bar" });

    Audio.Sound.createAsync(Object.values(songs)[currentTrackIndex]).then(
      ({ sound }) => setSound(sound)
    );
    return;
  }, []);

  React.useEffect(() => {
    if (sound) {
      let onPlaybackStatusUpdate = (status) => {
        setTime(status.positionMillis);
        setDuration(status.durationMillis);
      };
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      return () => sound.unloadAsync();
    } else {
      undefined;
    }
  }, [sound]);

  let handlePlayPausePress = async () => {
    let songName = Object.keys(songs)[currentTrackIndex];
    Avo.play({ currentSongName: songName });
    setIsPlaying(true);
    if (isPlaying) {
      sound?.pauseAsync();
      Avo.pause({ currentSongName: songName });
      setIsPlaying(false);
    } else {
      sound.playAsync();
    }
  };

  let handlePrevPress = async () => {
    let previousSong = Object.keys(songs)[currentTrackIndex - 1];
    if (previousSong) {
      Avo.playPreviousTrack({
        currentSongName: Object.keys(songs)[currentTrackIndex],
        upcomingTrackName: previousSong
      });
      setCurrentTrackIndex(currentTrackIndex - 1);

      const { sound } = await Audio.Sound.createAsync(songs[previousSong]);
      setSound(sound);

      if (isPlaying) {
        sound.playAsync();
      }
    }
  };

  let handleNextPress = async () => {
    let nextSong = Object.keys(songs)[currentTrackIndex + 1];
    if (nextSong) {
      Avo.playNextTrack({
        currentSongName: Object.keys(songs)[currentTrackIndex],
        upcomingTrackName: nextSong
      });
      setCurrentTrackIndex(currentTrackIndex + 1);

      const { sound } = await Audio.Sound.createAsync(songs[nextSong]);
      setSound(sound);

      if (isPlaying) {
        sound.playAsync();
      }
    }
  };

  const handleLoopPress = () => {
    sound.setIsLoopingAsync(!isLooping);
    setIsLooping((isLooping) => !isLooping);
  };

  return (
    <View style={styles.container}>
      <View style={styles.debugger}>
        <Button
          onPress={() => AvoDebugger.showDebugger({ mode: "bar" })}
          title="Bar debugger"
        />
        <Button
          onPress={() => AvoDebugger.showDebugger({ mode: "bubble" })}
          title="Bubble debugger"
        />
        <Button
          onPress={() => AvoDebugger.hideDebugger()}
          title="Disable debugger"
        />
      </View>

      <Text style={styles.label}>{Object.keys(songs)[currentTrackIndex]}</Text>

      <Text style={styles.label}>
        {time !== undefined && time / 1000} /{" "}
        {duration !== undefined && duration / 1000}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ width: 24 }}>
          {currentTrackIndex - 1 >= 0 && (
            <Button onPress={handlePrevPress} title="<" />
          )}
        </View>
        <Button
          onPress={handlePlayPausePress}
          title={isPlaying ? "Pause" : "Play"}
        />
        <View style={{ width: 24 }}>
          {Object.keys(songs)[currentTrackIndex + 1] && (
            <Button onPress={handleNextPress} title=">" />
          )}
        </View>
      </View>
      <View style={{ margin: 16 }}>
        <Button
          onPress={handleLoopPress}
          title={isLooping ? "Looping On" : "Looping Off"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  label: { alignSelf: "center", margin: 16 },
  debugger: {
    position: "absolute",
    top: 48,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default App;
