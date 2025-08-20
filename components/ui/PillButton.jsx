import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import NextIcon from "../../assets/images/next-icon.svg";
import PairIcon from "../../assets/images/pair-icon.svg";
import SearchIcon from "../../assets/images/search-icon.svg";

export default function PillButton({ label, icon, disabled, link, func }) {
	return (
		<TouchableOpacity
			onPress={() => (func ? func() : router.push(link))}
			disabled={disabled}
			style={[styles.button, disabled ? styles.disabled : styles.enabled]}
		>
			<Text style={styles.buttonLabel}>{label}</Text>
			{icon === "arrow" && <NextIcon />}
			{icon === "search" && <SearchIcon />}
			{icon === "pair" && <PairIcon />}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#41444A",
		borderRadius: 9999,
		height: 50,
		width: "100%",
		display: "flex",
		flexDirection: "row",
		gap: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	enabled: {
		opacity: 1,
	},
	disabled: {
		opacity: 0.4,
	},
	buttonLabel: {
		fontFamily: "FontMedium",
		fontSize: 16,
		color: "#D6DADE",
	},
});
