import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from "../styles/tokens";

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleLike: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleLike,
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.main}>
        <View style={styles.moodBubble}>
          <Text style={styles.mood}>{mood}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>📅 {date}</Text>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onToggleLike}
        style={[styles.likeButton, liked && styles.likeActive]}
      >
        <Text style={styles.like}>{liked ? "♥" : "♡"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.accent,
    paddingRight: SPACE.m,
    ...SHADOW.card,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACE.m,
    gap: SPACE.m,
  },
  moodBubble: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  mood: { fontSize: 28 },
  content: { flex: 1 },
  title: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginVertical: 3,
  },
  preview: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    lineHeight: 19,
  },
  likeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  likeActive: { backgroundColor: COLORS.dangerSoft },
  like: { fontSize: 22, color: COLORS.danger },
});