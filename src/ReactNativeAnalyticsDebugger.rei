
// get an instance of the debugger to pass into initAvo()
let instance: unit => 'a;

// returns true if debugger is rendered on screen
let isEnabled: unit => bool;

// enable the debugger
// note: call from didMount
let showDebugger: (~mode: [`bar | `bubble]) => unit;

// disable the debugger
let hideDebugger: unit => unit;
