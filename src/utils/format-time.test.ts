import { describe, it, expect } from "bun:test";
import { formatTime } from "./format-time";

describe("formatTime", () => {
  it("pads single-digit minutes and seconds", () => {
    expect(formatTime(65)).toEqual({ minutes: "01", seconds: "05" });
  });

  it("formats zero seconds remaining", () => {
    expect(formatTime(0)).toEqual({ minutes: "00", seconds: "00" });
  });

  it("formats a full 25 minute session", () => {
    expect(formatTime(25 * 60)).toEqual({ minutes: "25", seconds: "00" });
  });
});
