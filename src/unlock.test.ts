import { describe, expect, it } from "vitest";
import { SAMPLE_SCHEDULE, unlocked } from "./unlock";

describe("unlock", () => {
  it("holds until the cliff, then pays the linear amount", () => {
    expect(unlocked(SAMPLE_SCHEDULE, 50)).toBe(0n);
    expect(unlocked(SAMPLE_SCHEDULE, 100)).toBe(500n);
    expect(unlocked(SAMPLE_SCHEDULE, 150)).toBe(750n);
    expect(unlocked(SAMPLE_SCHEDULE, 200)).toBe(1000n);
    expect(unlocked(SAMPLE_SCHEDULE, 250)).toBe(1000n);
  });

  it("rejects a cliff after the end", () => {
    expect(() => unlocked({ ...SAMPLE_SCHEDULE, cliff: 201 }, 0)).toThrow(/cliff/);
  });
});
