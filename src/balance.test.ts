import { describe, expect, it } from "vitest";
import { previewAnnounce, previewWithdraw } from "./balance";

describe("deposit balance that survived v2", () => {
  it("opens a supported symbol and ignores a second announce", () => {
    expect(previewAnnounce(true, false)).toEqual({ ok: true, action: "announcedepo", effect: "opened" });
    expect(previewAnnounce(true, true).effect).toBe("already");
    expect(previewAnnounce(false, false)).toEqual({ ok: false, reason: "The specified symbol is not supported" });
  });

  it("withdraws only a positive amount that the row can cover", () => {
    expect(previewWithdraw({ amount: 4, hasRow: true, balance: 10 })).toEqual({
      ok: true,
      action: "withdraw",
      remaining: 6,
      memo: "Withdrawal",
    });
    expect(previewWithdraw({ amount: 0, hasRow: true, balance: 10 }).ok).toBe(false);
    expect(previewWithdraw({ amount: 4, hasRow: false, balance: null })).toEqual({
      ok: false,
      reason: "The specified account does not have a balance table row",
    });
    expect(previewWithdraw({ amount: 4, hasRow: true, balance: 1 })).toEqual({
      ok: false,
      reason: "The specified account's balance is lower than the specified quantity",
    });
  });
});
