import { useCallback, useEffect, useMemo, useState } from "react";
import { DiaryEntry } from "../context/DiaryContext";

export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [moodFilter, setMoodFilter] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const filteredEntries = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchQuery =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q);

      const matchMood = !moodFilter || entry.mood === moodFilter;

      return matchQuery && matchMood;
    });
  }, [entries, debouncedQuery, moodFilter]);

  // Tugas 6: Reset Filter
  const resetFilter = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    setMoodFilter(null);
  }, []);

  return {
    query,
    setQuery,
    moodFilter,
    setMoodFilter,
    resetFilter,
    filteredEntries,
    resultCount: filteredEntries.length,
  };
}
