import React from "react";
import * as ReactNative from "react-native";
import renderer from "react-test-renderer";

import "../__mocks__/rnLibraries";

import EventsListScreen from "../eventslistscreen/EventsListScreen";
import { testEventItem } from "./testUtils";

describe("EventListScreen", () => {
  const items = [
    {
      ...testEventItem,
      key: "key-0",
      id: "id-0",
      timestamp: +new Date(2020, 9, 15, 12, 4, 36)
    },
    {
      ...testEventItem,
      key: "key-1",
      id: "id-1",
      timestamp: +new Date(2020, 9, 15, 12, 4, 35)
    },
    {
      ...testEventItem,
      key: "key-2",
      id: "id-2",
      timestamp: +new Date(2020, 9, 16)
    }
  ];

  test("Renders correctly", () => {
    const tree = renderer.create(<EventsListScreen items={items} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Toggle opens and closes event list", () => {
    expect(EventsListScreen.logScreen).toBeNull();

    EventsListScreen.toggleDebuggerLogScreen();

    expect(EventsListScreen.logScreen).not.toBeNull();

    EventsListScreen.toggleDebuggerLogScreen();

    expect(EventsListScreen.logScreen).toBeNull();
  });

  test("updateDebuggerLogScreen() re-renders the list view", () => {
    EventsListScreen.toggleDebuggerLogScreen();
    expect(EventsListScreen.logScreen).not.toBeNull();

    // TODO: maybe update() can be used instead of deastroy() + new?
    const destroySpy = jest.spyOn(EventsListScreen.logScreen, "destroy");

    EventsListScreen.updateDebuggerLogScreen();

    expect(destroySpy).toHaveBeenCalled();
    expect(EventsListScreen.logScreen).not.toBeNull();
  });

  test("Back handler is binded on mount and removed on destroy", () => {
    const listScreen = renderer.create(<EventsListScreen items={items} />);
    expect(ReactNative.BackHandler.addEventListener).toHaveBeenCalled();

    listScreen.unmount();
    expect(ReactNative.BackHandler.removeEventListener).toHaveBeenCalled();
  });

  test("Back event toggles list view", () => {
    const toggleSpy = jest.spyOn(EventsListScreen, "toggleDebuggerLogScreen");

    const component = renderer.create(<EventsListScreen items={items} />);
    const componentInstance = component.getInstance();

    componentInstance.handleBackButtonClick();

    expect(toggleSpy).toHaveBeenCalled();
  });

  test("Events are sorted descending by time", () => {
    const component = renderer.create(<EventsListScreen items={items} />).root;

    const sortedItems = items.sort((a, b) => b.timestamp - a.timestamp);

    expect(component.findByType(ReactNative.FlatList).props.data).toBe(
      sortedItems
    );
  });
});
