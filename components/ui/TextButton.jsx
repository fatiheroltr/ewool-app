import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TextButton({ label, link, direction }) {
	return (
		<TouchableOpacity
			onPress={() =>
				direction === "back" ? router.back(link) : router.push(link)
			}
			style={styles.textButton}
		>
			<Text style={styles.textButtonLabel}>{label}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	textButton: {
		height: 60,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		opacity: 0.8,
	},
	textButtonLabel: {
		fontFamily: "FontMedium",
		fontSize: 14,
		color: "#D6DADE",
	},
});
