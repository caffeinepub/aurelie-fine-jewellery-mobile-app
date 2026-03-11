import { l as createLucideIcon, r as reactExports } from "./index-DkYKhr--.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const STORAGE_KEY = "aurelie_recently_viewed";
const MAX_ITEMS = 10;
function getStoredIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function saveIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
  }
}
function useRecentlyViewed() {
  const [viewedIds, setViewedIds] = reactExports.useState(() => getStoredIds());
  const addProduct = reactExports.useCallback((productId) => {
    setViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, MAX_ITEMS);
      saveIds(updated);
      return updated;
    });
  }, []);
  const clearAll = reactExports.useCallback(() => {
    saveIds([]);
    setViewedIds([]);
  }, []);
  return { viewedIds, addProduct, clearAll };
}
export {
  ChevronLeft as C,
  ChevronRight as a,
  useRecentlyViewed as u
};
