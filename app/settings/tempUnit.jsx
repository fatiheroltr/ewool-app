import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	Image,
	Platform,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import BackArrow from "../../assets/images/back-arrow.svg";
import Logo from "../../assets/images/ewool-logo.svg";
import ScreenBackground from "../../assets/images/screen-back.svg";
import Footer from "../../components/ui/Footer";
import { TempUnitContext } from "../context/TempUnitContext";

const tempUnit = () => {
	const { i18n, t } = useTranslation();
	const { currentTempUnit, setCurrentTempUnit } = useContext(TempUnitContext);

	const changeTempUnit = async (unit) => {
		await AsyncStorage.setItem("tempUnit", unit);
	};

	return (
		<View style={styles.wrapper}>
			<SafeAreaView style={styles.safeView}>
				<StatusBar style="light" />
				<View style={styles.headerContainer}>
					<TouchableOpacity
						style={styles.headerButton}
						onPress={() => {
							router.back();
						}}
					>
						<BackArrow />
					</TouchableOpacity>
					<Logo style={{ width: 27, height: 33 }} />
					<View style={styles.headerButton}></View>
				</View>
				<View style={styles.container}>
					<Text style={styles.title}>{t("tempUnit.title")}</Text>

					<View style={styles.listContainer}>
						<Pressable onPress={() => setCurrentTempUnit("celsius")}>
							<View style={styles.listItem}>
								<View style={styles.leftSection}>
									<Text
										style={[
											styles.itemTitle,
											currentTempUnit === "celsius" && {
												fontFamily: "FontMedium",
											},
										]}
									>
										Celsius
									</Text>
								</View>
								<View style={styles.rightSection}>
									{currentTempUnit === "celsius" && (
										<Image
											source={require("@/assets/images/check-icon.png")}
											style={{ width: 15, height: 15 }}
										/>
									)}
								</View>
							</View>
						</Pressable>

						<Pressable onPress={() => setCurrentTempUnit("fahrenheit")}>
							<View style={styles.listItem}>
								<View style={styles.leftSection}>
									<Text
										style={[
											styles.itemTitle,
											currentTempUnit === "fahrenheit" && {
												fontFamily: "FontMedium",
											},
										]}
									>
										Fahrenheit
									</Text>
								</View>
								<View style={styles.rightSection}>
									{currentTempUnit === "fahrenheit" && (
										<Image
											source={require("@/assets/images/check-icon.png")}
											style={{ width: 15, height: 15 }}
										/>
									)}
								</View>
							</View>
						</Pressable>
					</View>
				</View>

				<Footer products={false} settings={true} />
			</SafeAreaView>
			<ScreenBackground
				width="100%"
				height="100%"
				preserveAspectRatio="none"
				style={[StyleSheet.absoluteFill, { zIndex: -2 }]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	safeView: {
		flex: 1,
		marginHorizontal: 26,
		marginTop: Platform.OS === "android" ? 60 : 0,
		marginBottom: Platform.OS === "android" ? 30 : 0,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
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
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		position: "relative",
	},
	title: {
		fontSize: 20,
		marginBottom: 24,
		fontFamily: "FontRegular",
		color: "#D6DADE",
	},

	listContainer: {
		flex: 1,
		width: "100%",
		gap: 10,
	},
	listItem: {
		backgroundColor: "rgba(214, 218, 222, 0.05)",
		borderRadius: 8,
		paddingVertical: 20,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	leftSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	rightSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	iconContainer: {
		height: 20,
		width: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		width: "100%",
		height: "100%",
	},
	chevronContainer: {
		height: 11,
		width: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	chevron: {
		width: "100%",
		height: "100%",
	},
	boldText: {
		fontFamily: "FontMedium",
		color: "#D6DADE",
		fontSize: 15,
	},
	itemTitle: {
		fontFamily: "FontRegular",
		fontSize: 15,
		color: "#D6DADE",
	},
});

export default tempUnit;
