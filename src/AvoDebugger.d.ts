import {Component} from 'react';

declare module 'react-native-analytics-debugger' {
  class AvoDebugger extends Component {
    static schemaId: string;
    
    static showDebugger({mode}: {mode: 'bar' | 'bubble'}): void;

    static hideDebugger(): void;

    static isEnabled(): boolean;

    static postEvent(
      id: string,
      timestamp: number,
      name: string,
      messages: any[],
      eventProperties: any[],
      userProperties: any[]
    ): void;
  }

}
