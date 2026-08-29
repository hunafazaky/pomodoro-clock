import { describe, it, expect } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("calls onToggle when clicked", () => {
    let calls = 0;
    render(<ThemeToggle theme="dark" onToggle={() => calls++} />);
    fireEvent.click(screen.getByRole("button"));
    expect(calls).toBe(1);
  });

  it("labels the button by what it switches to, for each theme", () => {
    const { rerender } = render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByLabelText("Switch to light theme")).toBeInTheDocument();

    rerender(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByLabelText("Switch to dark theme")).toBeInTheDocument();
  });
});
