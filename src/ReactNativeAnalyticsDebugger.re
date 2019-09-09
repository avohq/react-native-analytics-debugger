  [@bs.module "react-native-analytics-debugger"]
  external debugger: t = "default";

  external instance: t => 'a = "%identity";

  let instance = () => instance(debugger);

  [@bs.send]
  external isEnabled: t => bool = "isEnabled";

  let isEnabled = () => isEnabled(debugger);
  
  [@bs.send]
  external enable: t => ([@bs.string] [
             | [@bs.as "bar"] `bar
             | [@bs.as "bubble"] `bubble
           ]) => unit = "enable";

  let enable = (type_) => enable(debugger, type_);
  
  [@bs.send]
  external disable: t => unit = "disable";

  let disable = () => disable(debugger);
