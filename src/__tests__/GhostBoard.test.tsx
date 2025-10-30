import React from "react";
import { mount } from "enzyme";
import { GhostBoard } from "../components/GhostBoard";

jest.useFakeTimers();

describe("GhostBoard", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a 3x3 board", () => {
    const wrapper = mount(<GhostBoard />);
    const buttons = wrapper.find("button");
    expect(buttons).toHaveLength(9);
    buttons.forEach((btn) => expect(btn.text()).toBe("❓"));
  });

  it("shows game over if clicks empty button", () => {
    const wrapper = mount(<GhostBoard />);
    const emptyButton = wrapper
      .find("button")
      .filterWhere((n) => n.text() === "❓")
      .first();
    emptyButton.simulate("click");
    expect(window.alert).toHaveBeenCalledWith("Not a ghost! Game over");
  });
});
