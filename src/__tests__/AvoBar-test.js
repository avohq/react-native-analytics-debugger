import React from "react";
import renderer from "react-test-renderer";

import { testEventItem } from "./testUtils";
import AvoBar from "../avobar/AvoBar";

describe("AvoBar", () => {
  test("Renders correctly", () => {
    const tree = renderer
      .create(
        <AvoBar
          hasErrors={false}
          lastItemName={testEventItem.name}
          lastItemTimestamp={testEventItem.timestamp}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Renders correctly with error", () => {
    const tree = renderer
      .create(
        <AvoBar
          hasErrors={true}
          lastItemName={testEventItem.name}
          lastItemTimestamp={testEventItem.timestamp}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Renders correctly without props set", () => {
    const tree = renderer.create(<AvoBar />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
