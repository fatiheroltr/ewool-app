import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ScreenBackground from "../../assets/images/screen-back.svg";
import BluetoothIcon from "../../assets/images/trouble/bluetooth-icon.svg";
import ButtonIcon from "../../assets/images/trouble/button-icon.svg";
import SearchIcon from "../../assets/images/trouble/search-icon.svg";
import UsbInIcon from "../../assets/images/trouble/usb-in-icon.svg";
import UsbOutIcon from "../../assets/images/trouble/usb-out-icon.svg";
import Header from "../../components/ui/Header";
import PillButton from "../../components/ui/PillButton";
import TextButton from "../../components/ui/TextButton";
import brandsData from "../utils/brandsData";

export default function NotFound() {
	const { i18n, t } = useTranslation();
	const locale = i18n.language;
	const { selectedBrandId, gender, selectedProductId, selectedProductIdParam } =
		useLocalSearchParams();

	return (
		<View style={styles.wrapper}>
			<SafeAreaView style={styles.safeView}>
				<StatusBar style="light" />
				<Header
					title={t("onboarding.notFound.title")}
					paragraph={t("onboarding.notFound.p")}
					backButton={true}
					steps={5}
					currStep={4}
					errorStep={true}
					brandName={brandsData[selectedBrandId]?.name}
				/>
				<View style={styles.contentContainer}>
					<Text style={styles.title}>{t("onboarding.notFound.trouble")}</Text>
					<View style={styles.rowContainer}>
						<BluetoothIcon />
						<Text style={styles.rowText}>
							{t("onboarding.notFound.bullets.1")}
						</Text>
					</View>
					<View style={styles.rowContainer}>
						<UsbOutIcon />
						<Text style={styles.rowText}>
							{t("onboarding.notFound.bullets.2")}
						</Text>
					</View>
					<View style={styles.rowContainer}>
						<UsbInIcon />
						<Text style={styles.rowText}>
							{t("onboarding.notFound.bullets.3")}
						</Text>
					</View>
					<View style={styles.rowContainer}>
						<ButtonIcon />
						<Text style={styles.rowText}>
							{t("onboarding.notFound.bullets.4")}
						</Text>
					</View>
					<View style={styles.rowContainer}>
						<SearchIcon />
						<Text style={styles.rowText}>
							{t("onboarding.notFound.bullets.5")}
						</Text>
					</View>
					<Text style={styles.info}>{t("onboarding.notFound.paragraph")}</Text>
				</View>
				<View>
					<PillButton
						link={`/onboarding/search?selectedBrandId=${selectedBrandId}&selectedProductId=${selectedProductId}&gender=${gender}`}
						label={t("onboarding.notFound.primaryButton")}
						icon="search"
						// disabled={selectedProductId === null}
					/>
					<TextButton
						link="http://www.ewool.com/support"
						label={t("onboarding.notFound.secondaryButton")}
					/>
				</View>
			</SafeAreaView>
			<ScreenBackground
				width="100%"
				height="100%"
				preserveAspectRatio="none"
				style={[StyleSheet.absoluteFill, { zIndex: -2 }]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		overflow: "hidden",
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
	contentContainer: {
		flex: 1,
		borderRadius: 8,
		backgroundColor: "rgba(234, 236, 239, 0.80)",
		marginVertical: 50,
		paddingHorizontal: 29,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
	},
	rowContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 20,
		width: "100%",
		alignItems: "center",
	},
	rowText: {
		flexShrink: 1,
		fontFamily: "FontLight",
		fontSize: 13,
		lineHeight: 16,
	},
	title: {
		fontFamily: "FontMedium",
		fontSize: 18,
	},
	info: {
		flexShrink: 1,
		fontFamily: "FontLight",
		fontSize: 12,
		lineHeight: 16,
		marginTop: 6,
	},
});
