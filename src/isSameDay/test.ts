import { describe, expect, it } from "vitest";
import { isSameDay } from "./index.js";
import { tz, TZDate } from "@date-fns/tz";

describe("isSameDay", () => {
  it("returns true if the given dates have the same day", () => {
    const result = isSameDay(
      new Date(2014, 8 /* Sep */, 4, 6, 0),
      new Date(2014, 8 /* Sep */, 4, 18, 0),
    );
    expect(result).toBe(true);
  });

  it("returns false if the given dates have different days", () => {
    const result = isSameDay(
      new Date(2014, 8 /* Sep */, 4, 23, 59),
      new Date(2014, 8 /* Sep */, 5, 0, 0),
    );
    expect(result).toBe(false);
  });

  it("accepts a timestamp", () => {
    const result = isSameDay(
      new Date(2014, 8 /* Sep */, 4, 6, 0).getTime(),
      new Date(2014, 8 /* Sep */, 4, 18, 0).getTime(),
    );
    expect(result).toBe(true);
  });

  it("returns false if the first date is `Invalid Date`", () => {
    const result = isSameDay(new Date(NaN), new Date(1989, 6 /* Jul */, 10));
    expect(result).toBe(false);
  });

  it("returns false if the second date is `Invalid Date`", () => {
    const result = isSameDay(new Date(1987, 1 /* Feb */, 11), new Date(NaN));
    expect(result).toBe(false);
  });

  it("returns false if the both dates are `Invalid Date`", () => {
    const result = isSameDay(new Date(NaN), new Date(NaN));
    expect(result).toBe(false);
  });

  describe("context", () => {
    it("allows to specify the context", () => {
      expect(
        isSameDay("2024-04-10T07:00:00Z", "2024-04-10T15:00:00Z", {
          in: tz("America/Los_Angeles"),
        }),
      ).toBe(true);
      expect(
        isSameDay("2024-04-10T07:00:00Z", "2024-04-11T07:00:00Z", {
          in: tz("America/Los_Angeles"),
        }),
      ).toBe(false);
    });
  });
});
