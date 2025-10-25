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

  it("increments +1 score when ghost is busted", () => {
        const wrapper = mount(<GhostBoard />);

 jest.spyOn(Math, 'random').mockReturnValue(0); // Math.floor(0 * 9) = 0

    // Advance timers to trigger spawnGhost (called every 2000ms via setInterval)
    jest.advanceTimersByTime(2000);

    // Simulate clicking the button where the ghost is (index 0)
    wrapper.find('button').at(0).simulate('click');

    // Verify the score is 1
    expect(wrapper.find(ScoreBoard).prop('score')).toBe(1);
  });

  it("shows game over if clicks empty button", () => {
    const wrapper = mount(<GhostBoard />);
    const emptyButton = wrapper
      .find("button")
      .filterWhere((n) => n.text() === "❓")
      .first();
    emptyButton.simulate("click");
    expect(window.alert).toHaveBeenCalledWith("Not a ghost! Game over");
    expect(wrapper.find("ScoreBoard").prop("score")).toBe(0);
  });
});
