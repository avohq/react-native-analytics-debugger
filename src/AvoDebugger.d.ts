import { Component } from 'react';

declare module "react-native-analytics-debugger" {

    class AvoDebugger extends Component {
        static enable(type: String): void;

        static disable(): void;

        static isEnabled(): boolean;
    }

    export = AvoDebugger;
}