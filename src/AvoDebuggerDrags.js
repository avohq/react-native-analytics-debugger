import { Animated, PanResponder, Dimensions } from 'react-native';

export default class AvoDebuggerDrags {

    screenHeight = Math.round(Dimensions.get('window').height);
    screenWidth = Math.round(Dimensions.get('window').width);

    setupBarDrags(pan) {

        this._val = { x: 0, y: 0 }
        pan.addListener((value) => this._val = value);
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 8;
            },
            onStartShouldSetPanResponder: (e, gesture) => false,
            onPanResponderGrant: (e, gesture) => {
                pan.setOffset({
                    x: 0,
                    y: this._val.y
                })
                pan.setValue({ x: 0, y: 0 })
            },
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.moveY > this.screenHeight - 24) {
                    return;
                }

                if (gestureState.moveY < 40) {
                    return;
                }

                Animated.event([null, {
                    dx: 0,
                    dy: pan.y,
                }])(e, gestureState);
            },
            onPanResponderEnd: (e, gestureState) => {
                if (gestureState.moveY > this.screenHeight - 24) {
                    gestureState.dy = this.screenHeight - 20 - gestureState.y0;
                }

                if (gestureState.moveY < 40) {
                    gestureState.dy = 40 - (gestureState.y0);
                }

                Animated.event([null, {
                    dx: 0,
                    dy: pan.y,
                }])(e, gestureState);
            },
        });
    }

    setupBubbleDrags(pan) {
        this._val = { x: 0, y: 0 }
        pan.addListener((value) => this._val = value);
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > 8 || Math.abs(gestureState.dy) > 8;
            },
            onStartShouldSetPanResponder: (e, gesture) => false,
            onPanResponderGrant: (e, gesture) => {
                pan.setOffset({
                    x: this._val.x,
                    y: this._val.y
                })
                pan.setValue({ x: 0, y: 0 })
            },
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.moveY > this.screenHeight - 8) {
                    return;
                } else if (gestureState.moveY < 32) {
                    return;
                }

                if (gestureState.moveX > this.screenWidth - 8) {
                    return;
                } else if (gestureState.moveX < 16) {
                    return;
                }

                Animated.event([null, {
                    dx: pan.x,
                    dy: pan.y,
                }])(e, gestureState);
            },
            onPanResponderEnd: (e, gestureState) => {
                if (gestureState.moveY > this.screenHeight - 16) {
                    gestureState.dy = this.screenHeight - 16 - gestureState.y0;
                } else if (gestureState.moveY < 40) {
                    gestureState.dy = 40 - (gestureState.y0);
                }

                if (gestureState.moveX > this.screenWidth - 16) {
                    gestureState.dx = this.screenWidth - 16 - gestureState.x0;
                } else if (gestureState.moveX < 24) {
                    gestureState.dx = 24 - gestureState.x0;
                }

                Animated.event([null, {
                    dx: pan.x,
                    dy: pan.y,
                }])(e, gestureState);
            },
        });
    }
}