export default class MusicStorage {

    tracks = ['greek_loop_mix.mp3', 'jingle_jungle_around_the_bot.wav', 'cartoon-whistle.wav'];

    hasNext(fromPosition) {
        return this.tracks.length - 1 > fromPosition;
    }

    hasPrev(fromPosition) {
        return fromPosition > 0;
    }

    trackName(position) {
        return this.trackFile(position).split(".")[0];
    }

    trackFile(position) {
        return this.tracks[position];
    }

    trackAsset(position) {
        switch(position) {
            case 0:
                return require('./assets/greek_loop_mix.mp3');
            case 1:
                return require('./assets/jingle_jungle_around_the_bot.wav');
            case 2:
                return require('./assets/cartoon-whistle.wav');
        }
       return undefined;
    }
}