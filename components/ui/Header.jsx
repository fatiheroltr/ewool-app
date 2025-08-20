import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackArrow from "../../assets/images/back-arrow.svg";
import Logo from "../../assets/images/ewool-logo.svg";
import Stepper from "./Stepper";

export default function Header({
	backButton,
	brandName,
	title,
	paragraph,
	steps,
	currStep,
}) {
	return (
		<View style={styles.headerWrapper}>
			<View style={styles.headerContainer}>
				{backButton && (
					<TouchableOpacity
						style={styles.headerButton}
						onPress={() => {
							router.back();
						}}
					>
						<BackArrow />
					</TouchableOpacity>
				)}
				<Logo style={{ width: 27, height: 33 }} />
				<View style={styles.headerButton}></View>
			</View>
			<View style={styles.textContainer}>
				{brandName && <Text style={styles.brandName}>{brandName}</Text>}
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.paragraph}>{paragraph}</Text>
			</View>
			<Stepper steps={steps} currStep={currStep} />
		</View>
	);
}

const styles = StyleSheet.create({
	headerWrapper: {},
	headerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 46,
		marginTop: 16,
	},
	headerButton: {
		width: 32,
		height: 32,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		gap: 6,
	},
	paragraph: {
		fontSize: 16,
		fontFamily: "FontLight",
		color: "#D6DADE",
		lineHeight: 18,
	},
	title: {
		fontSize: 24,
		fontFamily: "FontMedium",
		color: "#D6DADE",
	},
	logo: {
		objectFit: "contain",
		width: "100%",
		height: "100%",
	},
	brandName: {
		fontSize: 16,
		fontFamily: "FontMedium",
		color: "#EE5340",
		textTransform: "uppercase",
		marginBottom: 4,
	},
});
