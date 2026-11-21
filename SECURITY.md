# Security — holder cashback after native backing died

## Closed in tests

| Issue | Behavior |
| --- | --- |
| `equalSplit(1000n, 3)` | each **333**, remainder **1** |
| Second payout same period | `each` **0** |
| Missed windows | one split of current pool (no multiply) |
| `unlocked` before cliff | **0** |
| `unlocked` at cliff midpoint sample | half of total |
| `backasset` / `tokens_to_back` | **not called** — AA v2 rejects new locks |

AtomicAssets v2 (2026-08-03): `backasset` fails; `mintasset` rejects non-empty `tokens_to_back`. Already-backed inventory still releases on **burn** (contract release note; this lab does not burn).

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live owner snapshot | Arguments only — no AtomicAssets read |
| Treasury transfer | Preview memos are unsent |
| Claim-window griefing | Not implemented |
| Calendar month | `monthly` = 2592000 s (30 days), not a calendar month |

## Attack angles

1. Calling `backasset` after v2 and expecting success.  
2. Rounding splits up (overpay last holder).  
3. Paying again in the same period.  
4. Multiplying the pool by missed weeks (accidental inflation).  
5. Treating the cliff schedule as an NFT mutable field.

## Honesty limits

No network. No wasm. No burn. Not native backing.

| Sibling | Distinction |
| --- | --- |
| [RWA floor index](https://github.com/pixel-journey/wax-rwa-fractional-floor-index) | Floor of wholePrice × held / supply |
| [vesting](https://github.com/pixel-journey/px-treasury-linear-cliff-vesting) | Cliff-then-linear claim math |
| [template explorer](https://github.com/pixel-journey/wax-atomic-template-and-schema-explorer) | Mint refusal shapes |

[atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) · [docs.wax.io AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets).
