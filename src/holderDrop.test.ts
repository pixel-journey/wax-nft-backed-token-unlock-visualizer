import { describe, expect, it } from "vitest";
import { CADENCE_SECONDS, duePayout, equalSplit, periodsElapsed } from "./holderDrop";

describe("holder drop", () => {
  it("splits a pool and keeps the dust", () => {
    expect(equalSplit(1000n, 3)).toEqual({ each: 333n, remainder: 1n, holders: 3 });
    expect(equalSplit(0n, 4)).toEqual({ each: 0n, remainder: 0n, holders: 4 });
  });

  it("pays once per opened period and not again inside it", () => {
    const start = 0;
    const week = CADENCE_SECONDS.weekly;
    expect(periodsElapsed(start, week - 1, "weekly")).toBe(0);
    expect(periodsElapsed(start, week, "weekly")).toBe(1);

    const first = duePayout({
      pool: 1000n,
      holders: 4,
      start,
      now: week,
      cadence: "weekly",
      paidPeriods: 0,
    });
    expect(first).toEqual({ periodsToPay: 1, each: 250n, remainder: 0n, nextPaidPeriods: 1 });

    const again = duePayout({
      pool: 1000n,
      holders: 4,
      start,
      now: week + 10,
      cadence: "weekly",
      paidPeriods: first.nextPaidPeriods,
    });
    expect(again.periodsToPay).toBe(0);
    expect(again.each).toBe(0n);
  });

  it("pays the current pool once even if several windows were missed", () => {
    const twoWeeks = CADENCE_SECONDS.weekly * 2;
    const caught = duePayout({
      pool: 1000n,
      holders: 4,
      start: 0,
      now: twoWeeks,
      cadence: "weekly",
      paidPeriods: 0,
    });
    expect(caught.periodsToPay).toBe(2);
    expect(caught.each).toBe(250n);
    expect(caught.nextPaidPeriods).toBe(2);
  });
    it("refuses an empty holder set", () => {
    expect(() => equalSplit(10n, 0)).toThrow(/holders/);
  });
});
