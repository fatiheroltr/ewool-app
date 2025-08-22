import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TextButton({ label, link, direction, disabled }) {
	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={() =>
				direction === "back" ? router.back(link) : router.push(link)
			}
			style={[styles.textButton, disabled ? styles.deactive : styles.active]}
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
	},
	active: {
		opacity: 0.8,
	},
	deactive: {
		opacity: 0.3,
	},
	textButtonLabel: {
		fontFamily: "FontMedium",
		fontSize: 14,
		color: "#D6DADE",
	},
});
