import { ATOMIC_ORIGIN } from "./api";
import { SAMPLE_SCHEDULE, unlocked } from "./unlock";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const assetUrl = `${ATOMIC_ORIGIN}/atomicassets/v1/assets/1`;

export const USE_CASES: UseCase[] = [
  {
    title: "An asset read is not a vesting schedule",
    detail: "GET /atomicassets/v1/assets/1 is the shape of an AtomicAssets asset read. Asset 1 is not a known vesting NFT. unlocked() does not parse the response.",
    request: { method: "GET", url: assetUrl, executed: false },
    transaction: null,
  },
  {
    title: "The same shape for a collection filter",
    detail: `Sample schedule at the cliff unlocks ${unlocked(SAMPLE_SCHEDULE, SAMPLE_SCHEDULE.cliff).toString()} of ${SAMPLE_SCHEDULE.total.toString()}. No claim action is built.`,
    request: { method: "GET", url: `${ATOMIC_ORIGIN}/atomicassets/v1/assets?collection_name=pixeljourney&page=1&limit=20`, executed: false },
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (unlocked(SAMPLE_SCHEDULE, 50) !== 0n) throw new Error("cliff");
  if (!assetUrl.endsWith("/assets/1")) throw new Error("url");
}
