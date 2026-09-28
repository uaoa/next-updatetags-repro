'use server';

import { revalidateTag, updateTag } from 'next/cache';

export async function revalidateBoth() {
  // Two tags, two different profiles, one request.
  updateTag('a');
  revalidateTag('b', { expire: 0 });
}
