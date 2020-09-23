import React from "react";
import * as ReactNative from "react-native";
import renderer from "react-test-renderer";

import { testEventItem } from "./testUtils";
import EventsListItem from "../eventslistscreen/EventListItem";

describe("EventListItem", () => {
  test("Renders correctly", () => {
    const tree = renderer
      .create(<EventsListItem item={testEventItem} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Expands on click", () => {
    const component = renderer.create(
      <EventsListItem item={testEventItem} expended={false} />
    );
    const componentInstance = component.getInstance();

    expect(componentInstance.state.expended).toEqual(false);

    component.root.findByType(ReactNative.TouchableOpacity).props.onPress();

    expect(componentInstance.state.expended).toEqual(true);
  });

  test("Renders correctly when expanded", () => {
    const tree = renderer
      .create(<EventsListItem item={testEventItem} expended={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
