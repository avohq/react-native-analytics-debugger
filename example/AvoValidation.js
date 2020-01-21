// Generated by Avo VERSION 54.12.0, PLEASE EDIT WITH CARE
/* eslint-disable */

  // polyfill Array.isArray
  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  // polyfill Object.assign
  if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = (function() {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        var result = [], prop, i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }

  // polyfill Array.indexOf
  if (!Array.prototype.indexOf)  Array.prototype.indexOf = (function(Object, max, min){
    "use strict";
    return function indexOf(member, fromIndex) {
      if(this===null||this===undefined)throw TypeError("Array.prototype.indexOf called on null or undefined");

      var that = Object(this), Len = that.length >>> 0, i = min(fromIndex | 0, Len);
      if (i < 0) i = max(0, Len+i); else if (i >= Len) return -1;

      if(member===void 0){ for(; i !== Len; ++i) if(that[i]===void 0 && i in that) return i; // undefined
      }else if(member !== member){   for(; i !== Len; ++i) if(that[i] !== that[i]) return i; // NaN
      }else                           for(; i !== Len; ++i) if(that[i] === member) return i; // all else

      return -1; // if the value was not found, then return -1
    };
  })(Object, Math.max, Math.min);

var array_difference, AvoAssert, AvoLogger;
  array_difference = function array_difference(a1, a2) {
    var result = [];
    for (var i = 0; i < a1.length; i++) {
      if (a2.indexOf(a1[i]) === -1) {
        result.push(a1[i]);
      }
    }
    return result;
  }

  AvoAssert = {
    assertObject: function assertObject(propertyId, propName, obj) {
      if (typeof obj !== 'object') {
        var message = propName +
          ' should be of type object but you provided type ' +
          typeof obj +
          ' with value ' +
          JSON.stringify(obj);
        return [{tag: 'expectedObjectType', propertyId: propertyId, message: message, actualType: typeof obj}];
      } else {
        return [];
      }
    },

    assertString: function assertString(propertyId, propName, str) {
      if (typeof str !== 'string') {
        var message = propName +
          ' should be of type string but you provided type ' +
          typeof str +
          ' with value ' +
          JSON.stringify(str);
        return [{tag: 'expectedStringType', propertyId: propertyId, message: message, actualType: typeof str}];
      } else {
        return [];
      }
    },

    assertInt: function assertInt(propertyId, propName, int) {
      if (typeof int === 'number' && int !== Math.round(int)) {
        var message = propName +
          ' should be of type int but you provided type float with value ' +
          JSON.stringify(int);
        return [{tag: 'expectedIntType', propertyId: propertyId, actualType: 'float'}];
      } else if (typeof int !== 'number') {
        var message = propName +
          ' should be of type int but you provided type ' +
          typeof int +
          ' with value ' +
          JSON.stringify(int);
        return [{tag: 'expectedIntType', propertyId: propertyId, message: message, actualType: typeof int}];
      } else {
        return [];
      }
    },

    assertLong: function assertLong(propertyId, propName, long) {
      if (typeof long === 'number' && long !== Math.round(long)) {
        var message = propName +
          ' should be of type long but you provided type float with value ' +
          JSON.stringify(long);
        return [{tag: 'expectedLongType', propertyId: propertyId, actualType: 'float'}];
      } else if (typeof long !== 'number') {
        var message = propName +
          ' should be of type long but you provided type ' +
          typeof long +
          ' with value ' +
          JSON.stringify(long);
        return [{tag: 'expectedLongType', propertyId: propertyId, message: message, actualType: typeof long}];
      } else {
        return [];
      }
    },

    assertFloat: function assertFloat(propertyId, propName, float) {
      if (typeof float !== 'number') {
        var message = propName +
          ' should be of type float but you provided type ' +
          typeof float +
          ' with value ' +
          JSON.stringify(float);
        return [{tag: 'expectedFloatType', propertyId: propertyId, message: message, actualType: typeof float}];
      } else {
        return [];
      }
    },

    assertBool: function assertBool(propertyId, propName, bool) {
      if (typeof bool !== 'boolean') {
        var message = propName +
          ' should be of type boolean but you provided type ' +
          typeof bool +
          ' with value ' +
          JSON.stringify(bool);
        return [{tag: 'expectedBoolType', propertyId: propertyId, message: message, actualType: typeof bool}];
      } else {
        return [];
      }
    },

    assertMax: function assertMax(propertyId, propName, max, value) {
      if (value > max) {
        var message = propName +
          ' has a maximum value of ' +
          max +
          ' but you provided the value ' +
          JSON.stringify(value);
        return [{tag: 'expectedMax', propertyId: propertyId, message: message}];
      } else {
        return [];
      }
    },

    assertMin: function assertMin(propertyId, propName, min, value) {
      if (value < min) {
        var message = propName +
          ' has a minimum value of ' +
          min +
          ' but you provided the value ' +
          JSON.stringify(value);
        return [{tag: 'expectedMin', propertyId: propertyId, message: message}];
      } else {
        return [];
      }
    },

    assertList: function assertList(propertyId, propName, value) {
      if (!Array.isArray(value)) {
        var message = propName + ' should be of type list but you provided type ' + typeof value;
        return [{tag: 'expectedList', propertyId: propertyId, message: message, actualType: typeof value}];
      } else {
        return [];
      }
    },

    assertNoAdditionalProperties: function assertNoAdditionalProperties(eventName, input, spec) {
      var additionalKeys = array_difference(input, spec);
      if (additionalKeys.length) {
        var message = "Additional properties when sending event " + eventName + ": " + JSON.stringify(additionalKeys);
        return [{tag: 'expectedNoAdditionalProperties', additionalProperties: additionalKeys, message: message}];
      } else {
        return [];
      }
    },

    assertNoAdditionalUserProperties: function assertNoAdditionalProperties(eventName, input, spec) {
      var additionalKeys = array_difference(input, spec);
      if (additionalKeys.length) {
        var message = "Additional user properties when sending event " + eventName + ": " + JSON.stringify(additionalKeys);
        return [{tag: 'expectedNoAdditionalUserProperties', additionalProperties: additionalKeys, message: message}];
      } else {
        return [];
      }
    }
  };

  AvoLogger = {
    logEventSent: function logEventSent(eventName, eventProperties, userProperties) {
      console.log("[avo] Event Sent:", eventName, "Event Props:", eventProperties, "User Props:", userProperties);
    }
    };

var _avo_invoke, _avo_invoke_meta;
var _avo_sampling_rate = 1.0;
function _avo_invoke_payload(body) {
  if (typeof window === 'undefined') { return; }
  if (_avo_sampling_rate > 0) {
    if (Math.random() < _avo_sampling_rate) {
      fetch("https://api.avo.app/i", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      }).then(function(res) { return res.json(); }).then(function(data) { _avo_sampling_rate = data.sa; }).catch(function() {});
    }
  }
}

_avo_invoke = function _avo_invoke(env, eventId, hash, messages, origin) {
  _avo_invoke_payload({
    "ac": "6O01KzNeYfhvAG46Fhs9",
    "br": "master",
    "en": env,
    "ev": eventId,
    "ha": hash,
    "sc": "0cd8DLUxoxnhXaqRxL6O",
    "se": (new Date()).toISOString(),
    "so": "_0pjEChMf",
    "va": messages.length === 0,
    "me": messages,
    "or": origin
  });
}

_avo_invoke_meta = function _avo_invoke_meta(env, type, messages, origin) {
  _avo_invoke_payload({
    "ac": "6O01KzNeYfhvAG46Fhs9",
    "br": "master",
    "en": env,
    "ty": type,
    "sc": "0cd8DLUxoxnhXaqRxL6O",
    "se": (new Date()).toISOString(),
    "so": "_0pjEChMf",
    "va": messages.length === 0,
    "me": messages,
    "or": origin
  });
}


function assertUpcomingTrackName(upcomingTrackName, label_) {
  var messages = [];
  messages = messages.concat(AvoAssert.assertString("Lvi0sAE1Am", label_ ? 'Upcoming Track Name' + ': ' + label_ : 'Upcoming Track Name', upcomingTrackName));
  return messages;
}

function assertCurrentSongName(currentSongName, label_) {
  var messages = [];
  messages = messages.concat(AvoAssert.assertString("kwANmf381A", label_ ? 'Current Song Name' + ': ' + label_ : 'Current Song Name', currentSongName));
  return messages;
}

function validateAvoEvent(options) {
  var __STRICT__ = null;
  var __MOBILE_DEBUGGER__ = null;
  var __REPORT_FAILURE_AS__ = null;
  var __AVO_ENV_VFN__ = typeof __AVO_ENV__ !== 'undefined' && __AVO_ENV__ !== null ? __AVO_ENV__ : options.env;
  if (options.debugger !== undefined) {
    __MOBILE_DEBUGGER__ = options.debugger;
    if (__MOBILE_DEBUGGER__.hasOwnProperty("schemaId")) {
      __MOBILE_DEBUGGER__.schemaId = "0cd8DLUxoxnhXaqRxL6O";
    }
  }
  if (options.strict !== undefined) {
    __STRICT__ = options.strict !== false;
  }
  if (options.reportFailureAs !== undefined) {
    __REPORT_FAILURE_AS__ = options.reportFailureAs;
  }
  var eventName = options.eventName;
  var eventProperties = options.eventProperties || options.properties || {};
  var userProperties = options.userProperties || {};
  var messages = [];
  switch (eventName) {
    case "App Opened":
      // debug console in Avo
      _avo_invoke(__AVO_ENV_VFN__, "oZvpnm2MM", "38946bd6e1f82fafe53f39b62e7817d36983768b98bc6f49cd13e2165665803b", messages.map(function(m) { return Object.assign({}, {tag: m.tag, propertyId: m.propertyId, additionalProperties: m.additionalProperties, actualType: m.actualType}); }), 'validate');

      if ((__AVO_ENV_VFN__ !== 'prod' && __MOBILE_DEBUGGER__ !== null) || (__AVO_ENV_VFN__ === 'prod' && __MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) {
        // Avo mobile debugger
        __MOBILE_DEBUGGER__.postEvent("oZvpnm2MM", Date.now(), "App Opened", messages, [], []);
      }
      break;
    case "Play":
      messages = messages.concat(assertCurrentSongName(eventProperties["Current Song Name"]));
      messages = messages.concat(AvoAssert.assertNoAdditionalProperties("Play", Object.keys(eventProperties), [
        "Current Song Name"
      ]));

      // debug console in Avo
      _avo_invoke(__AVO_ENV_VFN__, "6p9dLEHQVr", "ffb8afbb727df1501c9055fbe3182ffad57c7c95936066291c392fcf2aa1c6f1", messages.map(function(m) { return Object.assign({}, {tag: m.tag, propertyId: m.propertyId, additionalProperties: m.additionalProperties, actualType: m.actualType}); }), 'validate');

      if ((__AVO_ENV_VFN__ !== 'prod' && __MOBILE_DEBUGGER__ !== null) || (__AVO_ENV_VFN__ === 'prod' && __MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) {
        // Avo mobile debugger
        __MOBILE_DEBUGGER__.postEvent("6p9dLEHQVr", Date.now(), "Play", messages, [
        {id: "Current Song Name", name: "Current Song Name", value: eventProperties["Current Song Name"]}], []);
      }
      if (__AVO_ENV_VFN__ !== 'prod' && ((__STRICT__ === null && !(__MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) || __STRICT__)) {
        // throw exception if messages is not empty
        if (messages.length !== 0) {
          throw new Error("Error sending event 'Play': " + messages[0].message)
        }
      } else {
        messages.forEach(function(m) {
          console[__REPORT_FAILURE_AS__ || 'error']("[avo] " + m.message);
        });
      }
      break;
    case "Pause":
      messages = messages.concat(assertCurrentSongName(eventProperties["Current Song Name"]));
      messages = messages.concat(AvoAssert.assertNoAdditionalProperties("Pause", Object.keys(eventProperties), [
        "Current Song Name"
      ]));

      // debug console in Avo
      _avo_invoke(__AVO_ENV_VFN__, "Ei7HeAerpy", "bc9a86e9306a54101eb3a0faf91a30ebbafa71dade6ce7dbfd5913bd3e80d046", messages.map(function(m) { return Object.assign({}, {tag: m.tag, propertyId: m.propertyId, additionalProperties: m.additionalProperties, actualType: m.actualType}); }), 'validate');

      if ((__AVO_ENV_VFN__ !== 'prod' && __MOBILE_DEBUGGER__ !== null) || (__AVO_ENV_VFN__ === 'prod' && __MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) {
        // Avo mobile debugger
        __MOBILE_DEBUGGER__.postEvent("Ei7HeAerpy", Date.now(), "Pause", messages, [
        {id: "Current Song Name", name: "Current Song Name", value: eventProperties["Current Song Name"]}], []);
      }
      if (__AVO_ENV_VFN__ !== 'prod' && ((__STRICT__ === null && !(__MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) || __STRICT__)) {
        // throw exception if messages is not empty
        if (messages.length !== 0) {
          throw new Error("Error sending event 'Pause': " + messages[0].message)
        }
      } else {
        messages.forEach(function(m) {
          console[__REPORT_FAILURE_AS__ || 'error']("[avo] " + m.message);
        });
      }
      break;
    case "Play Next Track":
      messages = messages.concat(assertCurrentSongName(eventProperties["Current Song Name"]));
      messages = messages.concat(assertUpcomingTrackName(eventProperties["Upcoming Track Name"]));
      messages = messages.concat(AvoAssert.assertNoAdditionalProperties("Play Next Track", Object.keys(eventProperties), [
        "Current Song Name",
        "Upcoming Track Name"
      ]));

      // debug console in Avo
      _avo_invoke(__AVO_ENV_VFN__, "rQvcOWggzs", "8880ff00cefbb41205b14b7c591aaa76e4a7b25328cad4f8e9260843654038ec", messages.map(function(m) { return Object.assign({}, {tag: m.tag, propertyId: m.propertyId, additionalProperties: m.additionalProperties, actualType: m.actualType}); }), 'validate');

      if ((__AVO_ENV_VFN__ !== 'prod' && __MOBILE_DEBUGGER__ !== null) || (__AVO_ENV_VFN__ === 'prod' && __MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) {
        // Avo mobile debugger
        __MOBILE_DEBUGGER__.postEvent("rQvcOWggzs", Date.now(), "Play Next Track", messages, [
        {id: "Current Song Name", name: "Current Song Name", value: eventProperties["Current Song Name"]},
        {id: "Upcoming Track Name", name: "Upcoming Track Name", value: eventProperties["Upcoming Track Name"]}], []);
      }
      if (__AVO_ENV_VFN__ !== 'prod' && ((__STRICT__ === null && !(__MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) || __STRICT__)) {
        // throw exception if messages is not empty
        if (messages.length !== 0) {
          throw new Error("Error sending event 'Play Next Track': " + messages[0].message)
        }
      } else {
        messages.forEach(function(m) {
          console[__REPORT_FAILURE_AS__ || 'error']("[avo] " + m.message);
        });
      }
      break;
    case "Play Previous Track":
      messages = messages.concat(assertCurrentSongName(eventProperties["Current Song Name"]));
      messages = messages.concat(assertUpcomingTrackName(eventProperties["Upcoming Track Name"]));
      messages = messages.concat(AvoAssert.assertNoAdditionalProperties("Play Previous Track", Object.keys(eventProperties), [
        "Current Song Name",
        "Upcoming Track Name"
      ]));

      // debug console in Avo
      _avo_invoke(__AVO_ENV_VFN__, "xBjjLugyOM", "d5d30e032664f8edd814d2f537dc3d2003209a003811733d92ecb46fa34f75cd", messages.map(function(m) { return Object.assign({}, {tag: m.tag, propertyId: m.propertyId, additionalProperties: m.additionalProperties, actualType: m.actualType}); }), 'validate');

      if ((__AVO_ENV_VFN__ !== 'prod' && __MOBILE_DEBUGGER__ !== null) || (__AVO_ENV_VFN__ === 'prod' && __MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) {
        // Avo mobile debugger
        __MOBILE_DEBUGGER__.postEvent("xBjjLugyOM", Date.now(), "Play Previous Track", messages, [
        {id: "Current Song Name", name: "Current Song Name", value: eventProperties["Current Song Name"]},
        {id: "Upcoming Track Name", name: "Upcoming Track Name", value: eventProperties["Upcoming Track Name"]}], []);
      }
      if (__AVO_ENV_VFN__ !== 'prod' && ((__STRICT__ === null && !(__MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) || __STRICT__)) {
        // throw exception if messages is not empty
        if (messages.length !== 0) {
          throw new Error("Error sending event 'Play Previous Track': " + messages[0].message)
        }
      } else {
        messages.forEach(function(m) {
          console[__REPORT_FAILURE_AS__ || 'error']("[avo] " + m.message);
        });
      }
      break;
    default:
      // debug console in Avo
      messages.push({tag: "unexpectedEvent", eventName: eventName, shape: Object.keys(eventProperties).map(function(key) { return [key, typeof eventProperties[key]]; }).reduce(function(prev,curr){prev[curr[0]]=curr[1];return prev;},{}), shapeUserProps: Object.keys(userProperties).map(function(key) { return [key, typeof userProperties[key]]; }).reduce(function(prev,curr){prev[curr[0]]=curr[1];return prev;},{})});
      _avo_invoke_meta(__AVO_ENV_VFN__, "unexpectedEvent", messages, "validate");

      if ((__AVO_ENV_VFN__ !== 'prod' && __MOBILE_DEBUGGER__ !== null) || (__AVO_ENV_VFN__ === 'prod' && __MOBILE_DEBUGGER__ !== null && __MOBILE_DEBUGGER__.isEnabled())) {
        // Avo mobile debugger
        __MOBILE_DEBUGGER__.postEvent(eventName, Date.now(), eventName, messages, Object.keys(eventProperties).map(function(key) { return {id: key, name: key, value: eventProperties[key]}; }), Object.keys(userProperties).map(function(key) { return {id: key, name: key, value: userProperties[key]}; }));
      }
  }
}

export default {
  validateAvoEvent: validateAvoEvent,
}

// AVOMODULEMAP:"Avo"
// AVOEVENTMAP:["appOpened","play","pause","playNextTrack","playPreviousTrack"]