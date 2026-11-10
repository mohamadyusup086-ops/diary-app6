import { useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // BARU
import DiaryCard from "../../src/components/DiaryCard";
import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["😊", "😌", "😄", "😢"];

export default function HomeScreen() {
  console.log("HomeScreen render");
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();

  const {
    query,
    setQuery,
    moodFilter,
    setMoodFilter,
    resetFilter,
    filteredEntries,
    resultCount,
  } = useDiarySearch(entries);

  const searchRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: "/detail/[id]",
        params: { id: String(id) },
      });
    },
    [router],
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    searchRef.current?.focus();
  }, [setQuery]);

  return (
    // BARU: pembungkus luar diganti SafeAreaView
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary..."
          style={styles.search}
        />
        <Pressable onPress={clearSearch} style={styles.clearButton}>
          <Text>Clear</Text>
        </Pressable>
      </View>

      <View style={styles.moodRow}>
        {MOODS.map((m) => (
          <Pressable
            key={m}
            onPress={() => setMoodFilter(moodFilter === m ? null : m)}
            style={[styles.moodChip, moodFilter === m && styles.moodChipActive]}
          >
            <Text style={styles.moodChipText}>{m}</Text>
          </Pressable>
        ))}
        <Pressable onPress={resetFilter} style={styles.resetButton}>
          <Text>Reset</Text>
        </Pressable>
      </View>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Diary tidak ditemukan.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  searchRow: { flexDirection: "row", gap: SPACE.s },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  clearButton: {
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  moodRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: SPACE.s,
  marginTop: SPACE.s,
  alignItems: "center",
},
  moodChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  moodChipActive: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: "#EFF6FF", // BARU: latar chip aktif
  },
  moodChipText: { fontSize: 22 },
  resetButton: {
    marginLeft: "auto",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  counter: {
    color: COLORS.muted,
    marginVertical: SPACE.s,
  },
  list: {
    gap: SPACE.m,
    paddingBottom: SPACE.xl,
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    paddingTop: 40,
  },
});
