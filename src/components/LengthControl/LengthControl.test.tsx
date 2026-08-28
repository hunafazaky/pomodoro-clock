import { describe, it, expect } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { LengthControl, type LengthControlProps } from "./LengthControl";

function renderControl(overrides: Partial<LengthControlProps> = {}) {
  return render(
    <LengthControl
      label="Break Length"
      labelId="break-label"
      displayId="break-length"
      incrementId="break-increment"
      decrementId="break-decrement"
      value={5}
      disabled={false}
      onIncrement={() => {}}
      onDecrement={() => {}}
      {...overrides}
    />,
  );
}

describe("LengthControl", () => {
  it("calls onIncrement when the up arrow is clicked", () => {
    let calls = 0;
    renderControl({ onIncrement: () => calls++ });
    fireEvent.click(screen.getByLabelText("Increment break length"));
    expect(calls).toBe(1);
  });

  it("disables both buttons when disabled is true", () => {
    renderControl({ disabled: true });
    expect(screen.getByLabelText("Increment break length")).toBeDisabled();
    expect(screen.getByLabelText("Decrement break length")).toBeDisabled();
  });
});
