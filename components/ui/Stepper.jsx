import React from "react";
import { StyleSheet, View } from "react-native";

export default function Stepper({ steps, currStep }) {
	return (
		<View style={styles.stepsContainer}>
			{Array.from({ length: steps }).map((step, index) => (
				<View
					key={index}
					style={index + 1 <= currStep ? styles.stepActive : styles.step}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	stepsContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 6,
		marginTop: 30,
	},
	step: {
		height: 2,
		flex: 1,
		backgroundColor: "#D9D9D9",
		opacity: 0.25,
		borderRadius: 9999,
	},
	stepActive: {
		height: 2,
		flex: 1,
		backgroundColor: "#D9D9D9",
		opacity: 1,
		borderRadius: 9999,
	},
});
