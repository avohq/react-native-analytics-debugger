## [2.1.2](https://github.com/avohq/react-native-analytics-debugger/compare/2.1.1...2.1.2) (2026-04-27)


### Bug Fixes

* **BackHandler:** support React Native >= 0.77 by using the subscription returned by `BackHandler.addEventListener` and calling `.remove()` on unmount, since `BackHandler.removeEventListener` was removed in RN 0.77 ([#71](https://github.com/avohq/react-native-analytics-debugger/issues/71))
* **Android:** add `elevation: 999` to the bar, bubble, and events-list-screen containers so the debugger renders above app content on newer React Native versions (`zIndex` alone does not control cross-tree Z-order on Android)


## [2.1.1](https://github.com/avohq/react-native-analytics-debugger/compare/2.1.0...2.1.1) (2025-04-07)


### Bug Fixes

* update `cross-spawn` to 7.0.6 ([876e300](https://github.com/avohq/react-native-analytics-debugger/commit/876e300))
* bump `fast-xml-parser`, `micromatch`, `serve-static`, `nanoid`, and `image-size` to resolve security advisories



# [2.1.0](https://github.com/avohq/react-native-analytics-debugger/compare/2.0.0...2.1.0) (2024-08-15)


### Features

* update dependencies and dev framework versions and refresh test snapshots ([563aeb9](https://github.com/avohq/react-native-analytics-debugger/commit/563aeb9))
* **example:** switch to the new Avo Inspector package ([666fd4f](https://github.com/avohq/react-native-analytics-debugger/commit/666fd4f))


### Bug Fixes

* bump `braces`, `tar`, `ip`, and `ws` to resolve security advisories



# [2.0.0](https://github.com/avohq/react-native-analytics-debugger/compare/1.2.3...2.0.0) (2023-12-07)


### ⚠ BREAKING CHANGES

* `react` and `react-native` are no longer bundled as direct dependencies. They are now declared as `peerDependencies` (`react-native` `^0.69.0`), so the debugger uses the host app's React Native version. Consuming apps must have a compatible `react-native` installed.


### Features

* move `react`/`react-native` to `peerDependencies` and update the development target to React Native 0.69 ([6ff5be2](https://github.com/avohq/react-native-analytics-debugger/commit/6ff5be2))
* update the development React Native version to 0.72 ([9edaa84](https://github.com/avohq/react-native-analytics-debugger/commit/9edaa84))
* add unit and snapshot tests ([64aad8f](https://github.com/avohq/react-native-analytics-debugger/commit/64aad8f))
* **example:** rewrite the example app using function components ([f479dd3](https://github.com/avohq/react-native-analytics-debugger/commit/f479dd3))
* **example:** integrate Avo Inspector ([23a8561](https://github.com/avohq/react-native-analytics-debugger/commit/23a8561))


### Bug Fixes

* numerous dependency security bumps (semver, lodash, json5, and others)



## [1.2.3](https://github.com/avohq/react-native-analytics-debugger/compare/1.2.2...1.2.3) (2023-11-09)


### Bug Fixes

* **AsyncStorage:** import from `@react-native-async-storage/async-storage` instead of the removed `react-native` core export ([ddcde7f](https://github.com/avohq/react-native-analytics-debugger/commit/ddcde7f))



## [1.2.2](https://github.com/avohq/react-native-analytics-debugger/compare/1.2.1...1.2.2) (2020-02-25)



## [1.2.1](https://github.com/avohq/react-native-analytics-debugger/compare/1.2.0...1.2.1) (2020-02-03)



# [1.2.0](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.9...1.2.0) (2020-01-21)


### Bug Fixes

* **AvoDebugger.js and example project:** Allow sending events when the debugger is not shown and add ([0d6d798](https://github.com/avohq/react-native-analytics-debugger/commit/0d6d798))


### Features

* Release 1.1.10 with Debugger Started tracking ([b79dbe7](https://github.com/avohq/react-native-analytics-debugger/commit/b79dbe7))



## [1.1.9](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.8...1.1.9) (2019-10-09)


### Bug Fixes

* Show new events in the list and improve sorting ([a3332b5](https://github.com/avohq/react-native-analytics-debugger/commit/a3332b5)), closes [#6](https://github.com/avohq/react-native-analytics-debugger/issues/6) [#7](https://github.com/avohq/react-native-analytics-debugger/issues/7)



## [1.1.8](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.7...1.1.8) (2019-09-26)


### Bug Fixes

* More touch handling improvements ([1789565](https://github.com/avohq/react-native-analytics-debugger/commit/1789565))



## [1.1.7](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.6...1.1.7) (2019-09-26)


### Bug Fixes

* Improving click handling ([72865d3](https://github.com/avohq/react-native-analytics-debugger/commit/72865d3))



## [1.1.6](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.5...1.1.6) (2019-09-24)


### Bug Fixes

* **EventListItem.js:** Show non-string values in the event properties ([479bdad](https://github.com/avohq/react-native-analytics-debugger/commit/479bdad))
* **Example app:** Fix outdated interface in example app ([8aae7ed](https://github.com/avohq/react-native-analytics-debugger/commit/8aae7ed))



## [1.1.5](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.4...1.1.5) (2019-09-10)



## [1.1.4](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.3...1.1.4) (2019-09-10)


### Bug Fixes

* Make providedType optional ([76833bb](https://github.com/avohq/react-native-analytics-debugger/commit/76833bb))



## [1.1.3](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.2...1.1.3) (2019-09-10)


### Bug Fixes

* Add missing propType ([4ce2f22](https://github.com/avohq/react-native-analytics-debugger/commit/4ce2f22))



## [1.1.2](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.1...1.1.2) (2019-09-10)



## [1.1.1](https://github.com/avohq/react-native-analytics-debugger/compare/1.1.0...1.1.1) (2019-09-10)


### Bug Fixes

* Add name key in prop-types for event/user properties ([d145ef4](https://github.com/avohq/react-native-analytics-debugger/commit/d145ef4))



# [1.1.0](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.8-beta.3...1.1.0) (2019-09-10)



## [1.0.8-beta.3](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.8-beta.2...1.0.8-beta.3) (2019-09-10)


### Bug Fixes

* Fix reason type def ([bf0494e](https://github.com/avohq/react-native-analytics-debugger/commit/bf0494e))



## [1.0.8-beta.2](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.8-beta.1...1.0.8-beta.2) (2019-09-10)


### Bug Fixes

* Pass mode strings correctly from reason bindings ([077113e](https://github.com/avohq/react-native-analytics-debugger/commit/077113e))



## [1.0.8-beta.1](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.8-beta.0...1.0.8-beta.1) (2019-09-10)


### Code Refactoring

* Make the API more explicit ([6da0018](https://github.com/avohq/react-native-analytics-debugger/commit/6da0018))


### BREAKING CHANGES

* enable/disable are no longer supported, use showDebugger/hideDebugger



## [1.0.8-beta.0](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.7...1.0.8-beta.0) (2019-09-10)



## [1.0.7](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.7-beta.0...1.0.7) (2019-09-10)



## [1.0.7-beta.0](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.6...1.0.7-beta.0) (2019-09-09)


### Bug Fixes

* Show property name in list ([d598670](https://github.com/avohq/react-native-analytics-debugger/commit/d598670))



## [1.0.6](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.6-beta.2...1.0.6) (2019-09-09)



## [1.0.6-beta.2](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.6-beta.1...1.0.6-beta.2) (2019-09-09)



## [1.0.6-beta.1](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.6-beta.0...1.0.6-beta.1) (2019-09-09)



## [1.0.6-beta.0](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.5...1.0.6-beta.0) (2019-09-09)



## [1.0.5](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.4...1.0.5) (2019-09-06)



## [1.0.4](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.3...1.0.4) (2019-09-06)



## [1.0.3](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.2...1.0.3) (2019-09-05)


### Bug Fixes

* **AvoDebugger.js:** Change debugges show/hide interface / fix posting events early ([728d037](https://github.com/avohq/react-native-analytics-debugger/commit/728d037))



## [1.0.2](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.1...1.0.2) (2019-09-05)



## [1.0.1](https://github.com/avohq/react-native-analytics-debugger/compare/1.0.0...1.0.1) (2019-09-05)



# [1.0.0](https://github.com/avohq/avo-react-native-debugger/compare/0.9.1...1.0.0) (2019-09-02)



## [0.9.2](https://github.com/avohq/avo-react-native-debugger/compare/0.9.1...0.9.2) (2019-09-02)



## 0.9.1 (2019-09-02)


### Bug Fixes

* Add release-it script ([aaceb93](https://github.com/avohq/avo-react-native-debugger/commit/aaceb93))
* Fix package.json ([c5c377b](https://github.com/avohq/avo-react-native-debugger/commit/c5c377b))
* Remove unused assets/ folder ([0230234](https://github.com/avohq/avo-react-native-debugger/commit/0230234))



