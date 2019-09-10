type t;

[@bs.module "react-native-analytics-debugger"]
external debugger: t = "default";

external instance: t => 'a = "%identity";
let instance = () => instance(debugger);

[@bs.send]
external isEnabled: t => bool = "isEnabled";
let isEnabled = () => isEnabled(debugger);

[@bs.deriving abstract]
type config = {
  mode: [@bs.string] [
    | [@bs.as "bar"] `bar
    | [@bs.as "bubble"] `bubble
  ],
};

[@bs.send]
external showDebugger: t => (config) => unit = "showDebugger";
let showDebugger = (~mode) => showDebugger(debugger, config(~mode));

[@bs.send]
external hideDebugger: t => unit = "hideDebugger";
let hideDebugger = () => hideDebugger(debugger);
