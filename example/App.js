import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Audio } from "expo-av";
import AvoDebugger from "react-native-analytics-debugger";
import * as Inspector from "react-native-avo-inspector";

import Player from "./Player";
import MusicStorage from "./MusicStorage";
import Avo from "./Avo";

const App = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLooping, setIsLooping] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const [inspector, setInspector] = React.useState(() => new Inspector.AvoInspector({
    apiKey: "AYytYzAOPvJh1XZfy8yj",
    env: "dev",
    version: "v1",
    appName: "Debugger test app"
  }))

  const [sound, setSound] = React.useState(() => new Audio.Sound());

  React.useEffect(() => {
    inspector.enableLogging(true);

    Avo.initAvo(
      { env: "dev", debugger: AvoDebugger },
      {},
      {},
      {
        make: function () {},
        logEvent: function (eventName) {
          inspector.trackSchemaFromEvent(eventName, []);
        }
      }
    );
    Avo.appOpened();

    sound.setOnPlaybackStatusUpdate((status) => {
      setTime(() => status.positionMillis / 1000);
      setDuration(() => status.durationMillis / 1000);
    });
    Player.load(sound, MusicStorage.trackAsset(currentTrackIndex));

    AvoDebugger.showDebugger({ mode: "bar" });
  }, []);

  React.useEffect(() => {
    if (isPlaying) {
      Player.pause(sound);
      Avo.pause({ currentSongName: MusicStorage.trackName(currentTrackIndex) });
    } else {
      Player.play(sound, MusicStorage.trackAsset(currentTrackIndex));
      Avo.play({ currentSongName: MusicStorage.trackName(currentTrackIndex) });
    }

    setIsPlaying(() => !isPlaying);
  }, [isPlaying]);

  let handlePrevPress = () => {
    if (MusicStorage.hasPrev(currentTrackIndex)) {
      Avo.playPreviousTrack({
        currentSongName: MusicStorage.trackName(currentTrackIndex),
        upcomingTrackName: MusicStorage.prevTrackName(currentTrackIndex)
      });

      Player.stopAndUnload(sound, () => {
        Player.load(sound, MusicStorage.trackAsset(currentTrackIndex));
      });

      setIsPlaying(() => false);
      setCurrentTrackIndex(() => currentTrackIndex - 1);
    }
  };

  let handleNextPress = () => {
    if (MusicStorage.hasNext(currentTrackIndex)) {
      Avo.playNextTrack({
        currentSongName: MusicStorage.trackName(currentTrackIndex),
        upcomingTrackName: MusicStorage.nextTrackName(currentTrackIndex)
      });

      Player.stopAndUnload(sound, () => {
        Player.load(sound, MusicStorage.trackAsset(currentTrackIndex));
      });

      setIsPlaying(() => false);
      setCurrentTrackIndex(() => currentTrackIndex + 1);
    }
  };

  const handleLoopPress = () => {
    Player.setLooping(sound, !isLooping);
    setIsLooping(() => !isLooping);
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

      <Text style={styles.label}>
        {MusicStorage.trackName(currentTrackIndex)}
      </Text>

      <Text style={styles.label}>
        {time} / {duration}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ width: 24 }}>
          {MusicStorage.hasPrev(currentTrackIndex) && (
            <Button onPress={handlePrevPress} title="<" />
          )}
        </View>
        <Button
          onPress={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause" : "Play"}
        />
        <View style={{ width: 24 }}>
          {MusicStorage.hasNext(currentTrackIndex) && (
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
