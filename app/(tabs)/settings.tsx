import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // BARU
import { COLORS, RADIUS, SHADOW, SPACE } from "../../src/styles/tokens"; // BARU

export default function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);

  return (
    // BARU: pembungkus luar diganti SafeAreaView
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Compact Mode</Text>
        <Switch
          value={compactMode}
          onValueChange={setCompactMode}
          trackColor={{ true: COLORS.accent }} // BARU: warna switch aktif
        />
      </View>

      <Text style={styles.info}>
        State: {compactMode ? "Aktif" : "Nonaktif"}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background, // BARU: latar seragam
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text, // BARU
    marginBottom: SPACE.xl,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACE.l, // BARU: dibuat seperti kartu
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    ...SHADOW.card,
  },
  label: { color: COLORS.text, fontWeight: "600" },
  info: { marginTop: SPACE.m, color: COLORS.muted },
});
