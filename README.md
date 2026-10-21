# A cliff, then a line

**Trust label:** `educational-reference`  
**Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Linear unlock with a cliff. The schedule is an argument, not an NFT.

The August 2026 README described live Alcor depth, a vesting NFT, or a forecast. This tree does not do those things.

## What is actually in the repo

| Piece | Role |
| --- | --- |
| `src/unlock.ts` | The pure rules |
| `src/unlock.test.ts` | The claims in the verification log |
| `src/usecases.ts` | HTTP requests, built and not sent. No transaction is invented |
| `src/Demo.tsx` | Offline page |

`npm test` runs the rules. `npm run dev` opens the page.

## Queries and unsigned transactions

`src/api.ts` builds nodeos and Hyperion requests. The Alcor URL is `GET https://wax.alcor.exchange/api/markets`, the market list, not a depth or volume feed. `executed` is false. This repo did not call any host.

## Related

See the catalog. Do not describe this page as an Alcor position, a live swap, or a token unlock on an NFT.
