import React from "react";
import * as ReactNative from "react-native";
import renderer from "react-test-renderer";

import "../__mocks__/rnLibraries";

import EventsListScreen from "../eventslistscreen/EventsListScreen";
import AvoDebugger from "../AvoDebugger";

import { avoAPI, debuggerMode, testEventItem } from "./testUtils";

global.fetch = jest.fn(() => Promise.resolve());
global.Math.random = jest.fn(() => 0.5);

const instalationID = "instalation-id-xxx";

describe("Avo Debugger", () => {
  beforeAll(() => {
    AvoDebugger.generateInstallationId = jest.fn(() => instalationID);
    AvoDebugger.init();
  });

  test("Instalation ID generated and set on debugger init", () => {
    expect(ReactNative.Settings.get).toBeCalledWith("avo_debugger_device_id");
    expect(ReactNative.Settings.set).toBeCalledWith({
      avo_debugger_device_id: instalationID
    });

    expect(AvoDebugger.installationId).toEqual(instalationID);
  });

  test("Renders correctly in Bar mode", () => {
    const avoDebugger = AvoDebugger.showDebugger({ mode: debuggerMode.BAR });
    const tree = renderer.create(avoDebugger).toJSON();

    expect(tree).toMatchSnapshot();

    expect(AvoDebugger.isEnabled()).toEqual(true);
  });

  test("Renders correctly in Bubble mode", () => {
    const avoDebugger = AvoDebugger.showDebugger({ mode: debuggerMode.BUBBLE });
    const tree = renderer.create(avoDebugger).toJSON();

    expect(tree).toMatchSnapshot();

    expect(AvoDebugger.isEnabled()).toEqual(true);
  });

  test("callTrackDebuggerStarted() sends POST request with event details", () => {
    const { name, eventProps } = testEventItem;
    fetch.mockReset();

    AvoDebugger.callTrackDebuggerStarted(name, eventProps);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(avoAPI.TRACK, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: name,
        deviceId: instalationID,
        eventProperties: eventProps
      })
    });
  });

  test("post() updates EventsListScreen when event list is vissible", () => {
    const { timestamp, name, eventProps, messages } = testEventItem;

    EventsListScreen.isVisible = jest.fn(() => true);
    const updateLogScreenSpy = jest.spyOn(
      EventsListScreen,
      "updateDebuggerLogScreen"
    );

    AvoDebugger.avo = AvoDebugger;

    AvoDebugger.post(timestamp, name, eventProps, messages);

    expect(EventsListScreen.items.length).toEqual(1);
    expect(EventsListScreen.items).toEqual([testEventItem]);

    expect(updateLogScreenSpy).toHaveBeenCalled();
  });

  test("post() updates unreadMessage count when event list not vissible", () => {
    const { timestamp, name, eventProps, messages } = testEventItem;

    EventsListScreen.isVisible = jest.fn(() => false);

    const component = renderer.create(<AvoDebugger isBar={true} />);
    const instance = component.getInstance();

    AvoDebugger.avo = instance;

    expect(instance.state.unreadMessages).toEqual(0);

    AvoDebugger.post(timestamp, name, eventProps, messages);

    expect(instance.state.unreadMessages).toEqual(1);
  });

  test("post() updates unhandledNewItem count if debugger not initialized", () => {
    const { timestamp, name, eventProps, messages } = testEventItem;

    AvoDebugger.hideDebugger();

    AvoDebugger.post(timestamp, name, eventProps, messages);

    expect(AvoDebugger.unhandledNewItems.count).toEqual(1);
  });

  test("hideDebugger() disables debugger", () => {
    AvoDebugger.showDebugger({ mode: debuggerMode.BAR });

    const destroySpy = jest.spyOn(AvoDebugger.rootSibling, "destroy");

    AvoDebugger.hideDebugger();

    expect(destroySpy).toHaveBeenCalled();
    expect(AvoDebugger.rootSibling).toBeNull();
    expect(AvoDebugger.avo).toBeNull();

    expect(AvoDebugger.isEnabled()).toEqual(false);
  });

  test("lastItemName() and lastItemTimestamp() returns last event data for AvoBar", () => {
    const { name, eventProps, messages } = testEventItem;

    const component = renderer.create(<AvoDebugger isBar={true} />);
    const instance = component.getInstance();

    AvoDebugger.post(+new Date(2020, 9, 15, 10, 5, 1), `${name}-0`, eventProps, messages);
    AvoDebugger.post(+new Date(2020, 9, 15, 10, 5, 2), `${name}-1`, eventProps, messages);
    AvoDebugger.post(+new Date(2020, 9, 15, 10, 5, 3), `${name}-2`, eventProps, messages);

    const lastItem = instance.lastItemName();
    const lastTimestamp = instance.lastItemTimestamp();

    expect(lastItem).toEqual(`${name}-2`);
    expect(lastTimestamp).toEqual(+new Date(2020, 9, 15, 10, 5, 3));
  });


  test("hasNewErrors() validates new events for errors", () => {
    const {timestamp, name, eventProps, messages } = testEventItem;

    const component = renderer.create(<AvoDebugger isBar={true} />);
    const instance = component.getInstance();
    AvoDebugger.avo = instance;

    EventsListScreen.items = [];
    instance.state.unreadMessages = 0;
  
    EventsListScreen.isVisible = jest.fn(() => true);
    AvoDebugger.post(+new Date(2020, 9, 15, 10, 5, 3), `${name}-visible`, eventProps, []);
    
    expect(instance.hasNewErrors()).toEqual(false);
    
    EventsListScreen.isVisible = jest.fn(() => false);
    AvoDebugger.post(+new Date(2020, 9, 15, 10, 5, 4), `${name}-no-error`, eventProps, []);
    
    expect(instance.hasNewErrors()).toEqual(false);

    AvoDebugger.post(+new Date(2020, 9, 15, 10, 5, 5), `${name}-error`, eventProps, messages);
    AvoDebugger.post(+new Date(2020, 9, 15, 10, 5, 6), `${name}-no-error`, eventProps, []);

    expect(instance.hasNewErrors()).toEqual(true);
  });
});
