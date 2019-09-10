import { Component } from 'react';

declare module "react-native-analytics-debugger" {

    class AvoDebugger extends Component {
        static showDebugger({mode}: {mode: 'bar' | 'bubble'}): void;

        static hideDebugger(): void;

        static isEnabled(): boolean;
    }

    export = AvoDebugger;
}