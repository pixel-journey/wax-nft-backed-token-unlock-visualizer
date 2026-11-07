/**
 * Snapshot holder split. This is not AtomicAssets `backasset`.
 * Native backing was removed in AtomicAssets v2: `backasset` fails, and
 * `mintasset` rejects a non-empty `tokens_to_back`.
 *
 * A replacement is a separate treasury that pays current holders on a cadence.
 * Integer division leaves a remainder. The remainder stays in the pool.
 */

export type Cadence = "daily" | "weekly" | "monthly";

/** Teaching lengths. `monthly` is 30 days, not a calendar month. */
export const CADENCE_SECONDS: Record<Cadence, number> = {
  daily: 86_400,
  weekly: 604_800,
  monthly: 2_592_000,
};

export type HolderSplit = {
  each: bigint;
  remainder: bigint;
  holders: number;
};

export function equalSplit(pool: bigint, holders: number): HolderSplit {
  if (pool < 0n) throw new Error("pool must be non-negative");
  if (!Number.isInteger(holders) || holders < 1) throw new Error("holders must be a positive integer");
  const count = BigInt(holders);
  return { each: pool / count, remainder: pool % count, holders };
}

/** How many whole periods have opened since `start`. Negative before start. */
export function periodsElapsed(start: number, now: number, cadence: Cadence): number {
  if (!Number.isInteger(start) || !Number.isInteger(now)) throw new Error("times must be integers");
  const span = CADENCE_SECONDS[cadence];
  if (!span) throw new Error("cadence must be daily, weekly, or monthly");
  return Math.floor((now - start) / span);
}

/**
 * One period's pool, split across the snapshot.
 * `paidPeriods` is how many periods this treasury already paid.
 * Calling again in the same period returns a zero payout (already paid).
 */
export function duePayout(input: {
  pool: bigint;
  holders: number;
  start: number;
  now: number;
  cadence: Cadence;
  paidPeriods: number;
}): { periodsToPay: number; each: bigint; remainder: bigint; nextPaidPeriods: number } {
  const elapsed = periodsElapsed(input.start, input.now, input.cadence);
  if (!Number.isInteger(input.paidPeriods) || input.paidPeriods < 0) {
    throw new Error("paidPeriods must be a non-negative integer");
  }
  const opened = Math.max(0, elapsed);
  const periodsToPay = Math.max(0, opened - input.paidPeriods);
  if (periodsToPay === 0) {
    return { periodsToPay: 0, each: 0n, remainder: input.pool, nextPaidPeriods: input.paidPeriods };
  }
  const split = equalSplit(input.pool, input.holders);
  return {
    periodsToPay,
    each: split.each,
    remainder: split.remainder,
    nextPaidPeriods: opened,
  };
}
