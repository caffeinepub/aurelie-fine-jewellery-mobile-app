import { useState, useCallback } from 'react';

const STORAGE_KEY = 'aurelie_recently_viewed';
const MAX_ITEMS = 10;

function getStoredIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage may be unavailable in some environments
  }
}

export function useRecentlyViewed() {
  const [viewedIds, setViewedIds] = useState<string[]>(() => getStoredIds());

  const addProduct = useCallback((productId: string) => {
    setViewedIds((prev) => {
      // Remove if already present, then prepend
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, MAX_ITEMS);
      saveIds(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    saveIds([]);
    setViewedIds([]);
  }, []);

  return { viewedIds, addProduct, clearAll };
}
