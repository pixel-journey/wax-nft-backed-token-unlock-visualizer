# Education — holder cashback after native backing died

> **Rung:** `npm test` passes. The lab splits a pool and runs a cliff schedule. It does not call `backasset`, sign, or broadcast.  
> **The test is the rule.**

AtomicAssets v2.0.0 (`atomicassets/atomicassets-contract`, released 2026-08-03) makes `backasset` fail with `Native backing has been deprecated on the AtomicAssets Contract`. `mintasset` rejects a non-empty `tokens_to_back`. Both names stay in the ABI, so an ABI diff does not show the break. Tokens already sitting in `backed_tokens` are not stranded: burning the asset still releases them to the owner. `withdraw`, `announcedepo`, and the deposit path are unchanged. That burn-release sentence is a contract release note. This repo does not execute it.

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Say why a new mint must not pass `tokens_to_back` |
| Intermediate | Split `1000` across 3 holders as `333` each with remainder `1` |
| Masterclass | Choose a treasury pattern that is not native backing, and say what this lab does not prove |

---

## Beginner — one scene

```ts
equalSplit(1000n, 3)
// { each: 333n, remainder: 1n, holders: 3 }
```

The old feature locked fungible tokens inside the NFT. Burning was the only way out. v2 refuses new locks. A holder reward is now a **separate** transfer from a treasury to whoever holds the NFT at a snapshot. The NFT is the membership ticket. The tokens never sit in `backed_tokens`.

| Idea | v1 native backing | What to build instead |
| --- | --- | --- |
| Value glued to the NFT | `backasset` / `tokens_to_back` | Do not call these. They fail after the v2 upgrade. |
| Cash to current holders | (did not exist as a standard action) | Snapshot owners, `equalSplit`, send `each`, keep `remainder` |
| Vest a grant | (not backing) | `unlocked(schedule, now)` — a cliff, then a line. Still not an NFT field. |
| Already-backed inventory | Burn releases `backed_tokens` | Leave that path alone. Do not mint new backed assets. |

### Words

| Word | Meaning here |
| --- | --- |
| Pool | Integer token units you are willing to pay this window |
| Holder | One account on the snapshot. This file does not read AtomicAssets. |
| Remainder | `pool % holders`. It stays in the pool. It is not rounded up. |
| Cadence | `daily` = 86400 s, `weekly` = 604800 s, `monthly` = 2592000 s (30 days, not a calendar month) |

### Predict, then run

```bash
npm test
```

1. `equalSplit(1000n, 3).remainder` is `1n`.
2. A weekly window at exactly `604800` pays `250` each to 4 holders from a `1000` pool.
3. Ten seconds later, with `paidPeriods` already `1`, `each` is `0`.
4. `unlocked(SAMPLE_SCHEDULE, 50)` is `0n`. At the cliff (`100`) it is `500n`.

---

## Intermediate — one window, one split

`duePayout` counts whole periods since `start`. Before the first boundary, `periodsElapsed` is `0` and nothing is paid. When a boundary opens, it splits the **current** pool once.

Missed windows do not multiply the pool. Two weeks late still pays `250` each from `1000`, then sets `nextPaidPeriods` to `2`. The next call inside that window pays `0`.

That is a teaching treasury, not an emission schedule. If you wanted `periods * rate`, this function is the wrong shape. It refuses that guess.

`unlocked` is a different tool. Before `cliff` the result is `0`. At the cliff the linear amount since `start` appears (half of `1000` when the cliff is the midpoint). After `end` the total is available. The schedule is an argument. It is not read off an asset.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Glue new tokens inside the NFT | `backasset` after v2 | not called; documented as a hard fail | release note, not a local assert |
| Round the split up | Overpay the last holder | remainder stays | `splits a pool and keeps the dust` |
| Pay again in the same week | Double spend | `each` is `0` | `pays once per opened period` |
| Multiply the pool by missed weeks | Accidental inflation | one split of the current pool | `several windows were missed` |
| Treat the cliff as an NFT field | Parse asset `1` | `unlocked` ignores the HTTP shape | `usecases` |

---

## Masterclass — three replacement shapes

Pick one. Do not stack them and call the stack "backing".

1. **Snapshot airdrop.** Read owners from an indexer you trust, at a block you name. Run `equalSplit`. Transfer `each` from your treasury. Keep `remainder`. Repeat on `daily` / `weekly` / `monthly`. This lab does not fetch owners and does not send the transfer.
2. **Claim window.** Same split, but the holder calls your contract. Unclaimed stays in the pool. Harder to get right (RAM, griefing, "who was the holder at the snapshot"). Not implemented here.
3. **Stream with a cliff.** `unlocked` tells a custom contract how much of a grant is vested. The NFT can be the key that is allowed to claim. The numbers are still not stored by `atomicassets`.

Already-backed assets are a fourth, closed, path: burn still releases what v1 locked. That is cleanup, not a product feature for new mints.

### Exercise

1. What does `equalSplit(1000n, 3)` return? (`each` 333, `remainder` 1. Tested.)
2. Why is a second payout 10 seconds later zero? (`paidPeriods` already moved. Tested.)
3. Does this lab call `backasset`? (No. v2 would reject it anyway.)

---

## What this course will not teach

- A working airdrop contract or a wasm
- A live owner snapshot
- That `monthly` matches a calendar month
- That burning an already-backed asset was re-tested here
