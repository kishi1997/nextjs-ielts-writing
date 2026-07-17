import { getCloudflareContext } from '@opennextjs/cloudflare';

export function getDatabase() {
  return getCloudflareContext().env.DB;
}
