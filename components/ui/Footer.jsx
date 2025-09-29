import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import ProductsIconSelected from "../../assets/images/products-icon-selected.svg";
import ProductsIcon from "../../assets/images/products-icon.svg";
import SettingsIconSelected from "../../assets/images/settings-icon-selected.svg";
import SettingsIcon from "../../assets/images/settings-icon.svg";

const Footer = ({ products, settings }) => {
	const { t } = useTranslation();

	return (
		<View style={styles.tabsContainer}>
			<TouchableOpacity
				style={styles.tabItemContainer}
				onPress={() => {
					router.push("/");
				}}
			>
				{products ? <ProductsIconSelected /> : <ProductsIcon />}
				<Text style={styles.tabLabel}>{t("products")}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => {}} style={styles.tabItemContainer}>
				{settings ? <SettingsIconSelected /> : <SettingsIcon />}
				<Text style={styles.tabLabel}>{t("settings")}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	tabsContainer: {
		height: 70,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 110,
		flexDirection: "row",
		marginTop: 16,
		marginBottom: Platform.OS === "android" ? 30 : 0,
	},
	tabLabel: {
		color: "#EAECEF",
		fontSize: 10,
		textTransform: "uppercase",
		fontFamily: "FontMedium",
		opacity: 0.7,
		marginTop: 8,
	},
	tabItemContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
});

export default Footer;
