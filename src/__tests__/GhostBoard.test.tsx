import React from "react";
import { mount } from "enzyme";
import { GhostBoard } from "../components/GhostBoard";
import { ScoreBoard } from "../components/ScoreBoard";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();
jest.spyOn(Math, "random").mockReturnValue(0.5);

describe("GhostBoard", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(global.Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
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
