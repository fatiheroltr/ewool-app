import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	Image,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import NextIcon from "../../assets/images/next-icon.svg";
import ScreenBackground from "../../assets/images/screen-back.svg";
import Header from "../../components/ui/Header";
import TextButton from "../../components/ui/TextButton";
import { brandsData } from "../utils/brandsData";

export default function Success() {
	const { selectedBrandId, selectedProductId, gender } = useLocalSearchParams();

	return (
		<View style={styles.wrapper}>
			<SafeAreaView style={styles.safeView}>
				<StatusBar style="light" />
				<Header
					title="Successfully paired"
					paragraph="Lorem ipsum dolor sit amet, consectetur adipis cing elit. Vivamus enim lectus."
					backButton={true}
					steps={5}
					currStep={5}
					brandName={brandsData[selectedBrandId]?.name}
				/>
				<View style={{ flex: 1, marginVertical: 55, padding: 6 }}>
					<Image
						source={require("../../assets/images/success-circle.png")}
						style={{ width: "100%", height: "100%", objectFit: "contain" }}
					/>
				</View>
				<View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							router.push(
								`/device/${selectedBrandId}?` +
									`modelName=${encodeURIComponent(
										brandsData[selectedBrandId].products[selectedProductId].name
									)}&` +
									`gender=${gender}&` +
									`productImageUrl=${encodeURIComponent(
										brandsData[selectedBrandId].products[selectedProductId]
											.productImageUrl[gender]
									)}&` +
									`headerImageUrl=${encodeURIComponent(
										brandsData[selectedBrandId].products[selectedProductId]
											.headerImageUrl[gender]
									)}&` +
									`brand=${encodeURIComponent(
										brandsData[selectedBrandId].name
									)}`
							);
						}}
					>
						<Text style={styles.buttonLabel}>Go to product</Text>
						<NextIcon />
					</TouchableOpacity>
					<TextButton link="/onboarding" label="Pair another product" />
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
	},
	safe: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	headerWrapper: {},
	logoContainer: {
		width: 140,
		height: 140,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	headerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 46,
		marginTop: 16,
	},
	safeView: {
		flex: 1,
		marginHorizontal: 26,
		marginTop: Platform.OS === "android" ? 60 : 0,
		marginBottom: Platform.OS === "android" ? 30 : 0,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignContent: "center",
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
	logo: {
		objectFit: "contain",
		width: "100%",
		height: "100%",
	},
	headerButton: {
		width: 32,
		height: 32,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
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
