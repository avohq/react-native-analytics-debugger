import React from "react";
import renderer from "react-test-renderer";

import AvoBubble from "../avobubble/AvoBubble";

describe("AvoBubble", () => {
  test("Renders correctly", () => {
    const tree = renderer
      .create(<AvoBubble newItems={4} hasErrors={false} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Renders correctly with error", () => {
    const tree = renderer
      .create(<AvoBubble newItems={4} hasErrors={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Renders correctly without new items", () => {
    const tree = renderer.create(<AvoBubble newItems={0} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Renders correctly without props set", () => {
    const tree = renderer.create(<AvoBubble />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
