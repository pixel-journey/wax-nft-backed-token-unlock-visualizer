# Holder cashback, not native NFT backing

> **Trust:** `educational-reference`  
> **Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)  
> **v2 note:** [ATOMICASSETS-V2.md](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/ATOMICASSETS-V2.md)

**One-sentence goal:** Teach an integer holder split and a cliff schedule, and say plainly that AtomicAssets v2 no longer lets you lock tokens inside an NFT.

**Real code:** `npm test`. **Does not** sign, broadcast, snapshot owners, or call `backasset`.

The course is [EDUCATION.md](EDUCATION.md).

## Deprecated (do not build this)

AtomicAssets v2.0.0 (2026-08-03, [release](https://github.com/atomicassets/atomicassets-contract/releases/tag/v2.0.0)):

| Call | After v2 |
| --- | --- |
| `backasset` | Fails: `Native backing has been deprecated on the AtomicAssets Contract` |
| `mintasset` with `tokens_to_back` | Rejected |
| Burn of an asset that already has `backed_tokens` | Still releases those tokens to the owner (release note, not re-tested here) |

The ABI still lists the actions. An ABI diff will not warn you. This repository's old description ("tokens locked inside AtomicAssets storage") is that deprecated feature. The code never implemented it.

## What is true (executed)

| Rule | Result |
| --- | --- |
| `equalSplit(1000n, 3)` | `{ each: 333n, remainder: 1n, holders: 3 }` |
| `equalSplit(0n, 4)` | each `0`, remainder `0` |
| empty holder set | refused |
| weekly boundary `604800`, pool `1000`, 4 holders | `each` `250`, `nextPaidPeriods` `1` |
| same window again | `each` `0` |
| two weeks late, unpaid | still one split (`each` `250`), `nextPaidPeriods` `2` |
| `unlocked(SAMPLE, 50 / 100 / 150 / 200)` | `0 / 500 / 750 / 1000` |
| cliff after end | refused |

`monthly` is 30 × 86400 seconds. It is not a calendar month. Missed windows do not multiply the pool.

## What is in the repo

| Piece | Role |
| --- | --- |
| `src/holderDrop.ts` | snapshot split and cadence window |
| `src/unlock.ts` | cliff, then linear — not an NFT field |
| `src/*.test.ts` | the executed rule |
| `src/usecases.ts` | unsent asset URL. The URL is not parsed. |
| Docs | EDUCATION · this README |

## Run

```bash
npm install
npm test
npm run dev
```

## Best practice and the opposite

**Do** pay holders from your own treasury. Keep the remainder. Name the snapshot block.  
**Do** treat an already-backed asset as cleanup: burn still releases the old lock.

**Do not** pass `tokens_to_back` on a new mint.  
**Do not** call `backasset` and hope the ABI means it works.  
**Do not** describe this page as tokens locked inside the NFT.

## Related replacements

- `wax-rwa-fractional-floor-index` — another remainder split
- `px-stake-nft-custodial-masterchef` — a different "hold the NFT, accrue a share" rule, in its own lab
- `wax-drops-and-pack-opening-experience` — pack claims, not a holder airdrop

MIT — Pixel Journey
