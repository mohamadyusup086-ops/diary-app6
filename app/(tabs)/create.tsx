import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // BARU
import { useDiary } from "../../src/context/DiaryContext";
import { COLORS, RADIUS, SHADOW, SPACE } from "../../src/styles/tokens"; // BARU: SHADOW

const MOODS = ["😊", "😌", "😄", "😢"];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2026-11-07");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("😊");

  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const save = () => {
    if (!canSave) return;

    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 80),
      body: body.trim(),
      mood,
    });

    setTitle("");
    setBody("");
    setMood("😊");
    router.replace("/");
  };

  return (
    // BARU: pembungkus luar diganti SafeAreaView
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Tambah Diary</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul"
        style={styles.input}
      />
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan harimu..."
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <Text style={styles.label}>Mood</Text>
      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[styles.moodButton, mood === item && styles.moodSelected]}
          >
            <Text style={styles.mood}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={save}
        disabled={!canSave}
        style={[styles.saveButton, !canSave && styles.disabled]}
      >
        <Text style={styles.saveText}>Simpan</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },
  heading: { fontSize: 24, fontWeight: "700", color: COLORS.text },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: "#fff",
  },
  bodyInput: { minHeight: 120, textAlignVertical: "top" },
  label: { fontWeight: "700", color: COLORS.text },
  moodRow: { flexDirection: "row", gap: SPACE.s },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  moodSelected: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: "#EFF6FF", // BARU
  },
  mood: { fontSize: 26 },
  saveButton: {
    padding: 14,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.card,
    alignItems: "center",
    ...SHADOW.card, // BARU
  },
  disabled: { opacity: 0.45 },
  saveText: { color: "#fff", fontWeight: "700" },
});
