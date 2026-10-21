/**
 * Linear unlock with a cliff. Nothing is read from an NFT.
 * Before the cliff the result is 0. At the cliff, the linear amount since start becomes available.
 */

export type Schedule = {
  start: number;
  cliff: number;
  end: number;
  total: bigint;
};

export function assertSchedule(schedule: Schedule): void {
  if (!Number.isInteger(schedule.start) || !Number.isInteger(schedule.cliff) || !Number.isInteger(schedule.end)) {
    throw new Error("times must be integers");
  }
  if (schedule.end <= schedule.start) throw new Error("end must be after start");
  if (schedule.cliff < schedule.start || schedule.cliff > schedule.end) throw new Error("cliff must sit between start and end");
  if (schedule.total <= 0n) throw new Error("total must be positive");
}

export function unlocked(schedule: Schedule, now: number): bigint {
  assertSchedule(schedule);
  if (!Number.isInteger(now)) throw new Error("now must be an integer");
  if (now < schedule.cliff) return 0n;
  if (now >= schedule.end) return schedule.total;
  const span = BigInt(schedule.end - schedule.start);
  const elapsed = BigInt(now - schedule.start);
  return (schedule.total * elapsed) / span;
}

export const SAMPLE_SCHEDULE: Schedule = { start: 0, cliff: 100, end: 200, total: 1000n };
