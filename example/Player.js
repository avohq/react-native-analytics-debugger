
const Player = {
  load: async (audio, song) => {
    const status = await audio.getStatusAsync();
    if (!status.isLoaded) {
      audio.loadAsync(song);
    }
  },

  play: async (audio, song) => {
    const status = await audio.getStatusAsync();
    if (!status.isLoaded) {
      await audio.loadAsync(song);
      audio.playAsync();
    } else if (status.positionMillis === status.durationMillis) {
      audio.playFromPositionAsync(0);
    } else {
      audio.playAsync();
    }
  },

  pause: (audio) => audio.pauseAsync(),

  stopAndUnload: async (audio, onUnload) => {
    let status = await audio.getStatusAsync();
    if (status.isLoaded) {
      await audio.stopAsync();
      await audio.unloadAsync();
      onUnload();
    }
  },

  setLooping: (audio, shouldLoop) => audio.setIsLoopingAsync(shouldLoop)
};

export default Player;
