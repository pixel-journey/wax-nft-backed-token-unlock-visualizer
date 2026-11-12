/**
 * announcedepo and withdraw from atomicassets-contract tag v2.0.0
 * src/atomicassets.cpp. Not compiled. Not a transfer.
 *
 * v2 refuses new backed tokens. The balance table is still there.
 * announcedepo opens a zero row for a supported symbol.
 * withdraw requires a positive amount and a sufficient announced balance.
 * The contract would then send eosio.token::transfer with memo "Withdrawal".
 * This function does not.
 */

export type Announce =
  | { ok: false; reason: string }
  | { ok: true; action: "announcedepo"; effect: "opened" | "already" };

export function previewAnnounce(supported: boolean, alreadyAnnounced: boolean): Announce {
  if (!supported) return { ok: false, reason: "The specified symbol is not supported" };
  return { ok: true, action: "announcedepo", effect: alreadyAnnounced ? "already" : "opened" };
}

export type Withdraw =
  | { ok: false; reason: string }
  | { ok: true; action: "withdraw"; remaining: number; memo: "Withdrawal" };

export function previewWithdraw(input: {
  amount: number;
  hasRow: boolean;
  balance: number | null;
}): Withdraw {
  if (input.amount <= 0) return { ok: false, reason: "token_to_withdraw must be positive" };
  if (!input.hasRow) return { ok: false, reason: "The specified account does not have a balance table row" };
  if (input.balance === null) {
    return { ok: false, reason: "The specified account does not have a balance for the symbol specified in the quantity" };
  }
  if (input.balance < input.amount) {
    return { ok: false, reason: "The specified account's balance is lower than the specified quantity" };
  }
  return { ok: true, action: "withdraw", remaining: input.balance - input.amount, memo: "Withdrawal" };
}
