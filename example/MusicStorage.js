const tracks = [
  "greek_loop_mix.mp3",
  "jingle_jungle_around_the_bot.wav",
  "cartoon-whistle.wav"
];

const MusicStorage = {
  hasNext: (fromPosition) =>
    tracks.length - 1 > fromPosition && fromPosition >= -1,

  hasPrev: (fromPosition) =>
    fromPosition > 0 && fromPosition < tracks.length + 1,

  trackName: (position) => tracks[position].split(".")[0],

  prevTrackName: (position) =>
    hasPrev(position) ? tracks[position - 1].split(".")[0] : "",

  nextTrackName: (position) =>
    hasNext(position) ? tracks[position + 1].split(".")[0] : "",

  trackAsset: (position) => `./assets/${tracks[position]}`
};

export default MusicStorage;
