type t;

[@bs.module "react-native-analytics-debugger"]
external debugger: t = "default";

external instance: t => 'a = "%identity";
let instance = () => instance(debugger);

[@bs.send]
external isEnabled: t => bool = "isEnabled";
let isEnabled = () => isEnabled(debugger);

[@bs.deriving jsConverter]
type modes = [ | `bar | `bubble];

[@bs.deriving abstract]
type config = {
  mode: string,
};

[@bs.send]
external showDebugger: t => (config) => unit = "showDebugger";
let showDebugger = (~mode) => showDebugger(debugger, config(~mode=modesToJs(mode)));

[@bs.send]
external hideDebugger: t => unit = "hideDebugger";
let hideDebugger = () => hideDebugger(debugger);
