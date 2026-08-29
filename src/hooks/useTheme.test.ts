import { describe, it, expect, beforeEach } from "bun:test";
import { act } from "react";
import { renderHook } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it("toggles between dark and light", () => {
    const { result } = renderHook(() => useTheme());
    const initial = result.current.theme;

    act(() => result.current.toggleTheme());

    expect(result.current.theme).not.toBe(initial);
  });

  it("persists the choice to localStorage", () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggleTheme());

    expect(window.localStorage.getItem("pomodoro-theme")).toBe(result.current.theme);
  });
});
