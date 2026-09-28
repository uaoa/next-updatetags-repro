# `cacheHandlers[*].updateTags` only receives the first profile group

Minimal reproduction for next@16.4.0-canary.51 (also 16.3.5).

## Steps

```bash
npm install
npx next build
npx next start -p 3457
```

Open http://localhost:3457 and click **Revalidate a and b**.

The server action (`app/actions.ts`) calls, in one request:

```ts
updateTag('a');
revalidateTag('b', { expire: 0 });
```

`cache-handler.mjs` wraps Next's own `createDefaultCacheHandler` and only logs `updateTags`.

## Expected

```
[cache-handler] updateTags ["a"] ...
[cache-handler] updateTags ["b"] {"expire":0}
```

## Actual

```
[cache-handler] updateTags ["a"] null
```

`b` never reaches the cache handler.

## Cause

`dist/server/revalidation-utils.js`: `const handlers = getCacheHandlers()` returns `handlersSet.values()`, a one-shot
iterator. The loop over profile groups iterates it in the first group; every later group sees an empty iterator.
Fix: `const handlers = Array.from(getCacheHandlers() ?? [])`.
