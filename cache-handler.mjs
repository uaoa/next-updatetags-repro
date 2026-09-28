import { createDefaultCacheHandler } from 'next/dist/server/lib/cache-handlers/default.js';

const inner = createDefaultCacheHandler(50 * 1024 * 1024);

export default {
  get: (...args) => inner.get(...args),
  set: (...args) => inner.set(...args),
  refreshTags: (...args) => inner.refreshTags(...args),
  getExpiration: (...args) => inner.getExpiration(...args),
  updateTags(tags, durations) {
    console.log('[cache-handler] updateTags', JSON.stringify(tags), JSON.stringify(durations ?? null));
    return inner.updateTags(tags, durations);
  },
};
