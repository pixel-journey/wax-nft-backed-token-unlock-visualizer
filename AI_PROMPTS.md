# AI handoff — holder cashback preview

## Non-negotiables

1. `equalSplit(1000n, 3)` → each **333**, remainder **1**. Do not round up.
2. A second payout in the same period returns `each` **0**.
3. Missed windows are **one** split of the current pool. Do not multiply by missed weeks.
4. `unlocked` before the cliff is **0**. The midpoint sample is half of total.
5. `backasset` and `tokens_to_back` are **not called**. AtomicAssets v2 rejects new locks. This lab does not burn already-backed inventory.
6. `monthly` means **2592000** seconds (30 days), not a calendar month.
7. Arguments only. Preview memos are unsent.

## Prompt seeds

- "Split 1000 across 3 holders — each and remainder."
- "Second payout same period — each?"
- "Refuse a new backasset call on v2."

## Do not

- Mint a new backed NFT from this preview.
- Inflate the pool by the number of missed windows.
