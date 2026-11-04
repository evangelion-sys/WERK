import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kernel_index_bookmarks_v1';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isBookmarked = (id: number) => bookmarks.includes(id);

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked
  };
}
