import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { TimerDisplay } from "./TimerDisplay";

describe("TimerDisplay", () => {
  it("shows the phase and the formatted time", () => {
    render(<TimerDisplay phase="Session" minutes="25" seconds="00" isRunning={false} />);
    expect(screen.getByText("Session")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("00")).toBeInTheDocument();
  });
});
