# Sources

| Source | Use |
| --- | --- |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | `backasset` refusal on v2 |
| [docs.wax.io AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | Context |
| [vesting](https://github.com/pixel-journey/px-treasury-linear-cliff-vesting) | Cliff math sibling |
| [RWA floor](https://github.com/pixel-journey/wax-rwa-fractional-floor-index) | Different floor identity |

## Locked by tests

- `equalSplit(1000n, 3)` → each 333, remainder 1.
- Second payout same period → each 0.
- Missed windows do not multiply the pool.
- `backasset` / `tokens_to_back` are not called.
- `monthly` = 2592000 seconds.

Not native backing. No burn. No network.
