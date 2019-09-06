import { Audio } from 'expo-av';

export default class Player {

    soundObject = new Audio.Sound();

    load(song) {
        this.soundObject.getStatusAsync().then((status) => {
            if (!status.isLoaded) {
                this.soundObject.loadAsync(song).then();
            }
        })
    }

    play(song) {
        this.soundObject.getStatusAsync().then((status) => {
            if (!status.isLoaded) {
                this.soundObject.loadAsync(song).then(() => {
                    this.soundObject.playAsync().then();
                })
            } else if (status.positionMillis === status.durationMillis) {
                this.soundObject.playFromPositionAsync(0).then();
            } else {
                this.soundObject.playAsync().then();
            }
        })
    }

    pause() {
        this.soundObject.pauseAsync().then({})
    }

    stopAndUnload(onUnload) {
        this.soundObject.getStatusAsync().then((status) => {
            if (status.isLoaded) {
                this.soundObject.stopAsync().then(() => {
                    this.soundObject.unloadAsync().then(() => {
                        onUnload();
                    })
                })
            }
        });
    }

    setLooping(shouldLoop) {
        this.soundObject.setIsLoopingAsync(shouldLoop).then();
    }
}