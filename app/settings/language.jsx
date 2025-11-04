import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import {
	Image,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../assets/images/back-arrow.svg";
import Logo from "../../assets/images/ewool-logo.svg";
import ScreenBackground from "../../assets/images/screen-back.svg";
import Footer from "../../components/ui/Footer";

const language = () => {
	const { i18n, t } = useTranslation();

	const changeLanguage = async (lang) => {
		await AsyncStorage.setItem("language", lang);
		i18n.changeLanguage(lang);
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
					<Text style={styles.title}>{t("language")}</Text>

					<View style={styles.listContainer}>
						<Pressable onPress={() => changeLanguage("en")}>
							<View style={styles.listItem}>
								<View style={styles.leftSection}>
									<Text
										style={[
											styles.itemTitle,
											i18n.language === "en" && { fontFamily: "FontMedium" },
										]}
									>
										{t("english")}
									</Text>
								</View>
								<View style={styles.rightSection}>
									{i18n.language === "en" && (
										<Image
											source={require("@/assets/images/check-icon.png")}
											style={{ width: 15, height: 15 }}
										/>
									)}
								</View>
							</View>
						</Pressable>

						<Pressable onPress={() => changeLanguage("fr")}>
							<View style={styles.listItem}>
								<View style={styles.leftSection}>
									<Text
										style={[
											styles.itemTitle,
											i18n.language === "fr" && { fontFamily: "FontMedium" },
										]}
									>
										{t("french")}
									</Text>
								</View>
								<View style={styles.rightSection}>
									{i18n.language === "fr" && (
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

export default language;
