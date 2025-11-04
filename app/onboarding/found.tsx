import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
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
import ActionSheet from "react-native-actions-sheet";
import Svg, { Circle } from "react-native-svg";
import BluetoothIcon from "../../assets/images/bluetooth-icon.svg";
import CheckIcon from "../../assets/images/check-icon.svg";
import ScreenBackground from "../../assets/images/screen-back.svg";
import Header from "../../components/ui/Header";
import brandsData from "../utils/brandsData";

export default function Found() {
	const { i18n, t } = useTranslation();
	const locale = i18n.language;
	const { selectedBrandId, selectedProductId, gender } = useLocalSearchParams();
	const [foundProductId, setFoundProductId] = useState(null);
	const [showConfirm, setShowConfirm] = useState(false);
	const duration = 15;
	const [timeLeft, setTimeLeft] = useState(duration);
	const actionSheetRef = useRef({});

	const foundDevicesLength = 1;
	const timerSize = 44;
	const timerInnerSize = 34;
	const strokeWidth = (timerSize - timerInnerSize) / 2;
	const radius = (timerSize - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	useEffect(() => {
		if (!showConfirm) {
			setTimeLeft(duration);
			return;
		}

		const timer = setInterval(() => {
			showConfirm &&
				setTimeLeft((prev) => {
					if (prev === 0) {
						setFoundProductId(null);
						setShowConfirm(false);
						actionSheetRef.current?.hide();
						setTimeout(duration);
						return 0;
					}
					return prev - 1;
				});
		}, 1000);

		return () => clearInterval(timer);
	}, [showConfirm, duration]);

	const handleShowConfirm = () => {
		setShowConfirm(true);
		actionSheetRef.current?.show();
	};

	const handleSaveProduct = async (
		selectedBrandId,
		selectedProductId,
		gender
	) => {
		const newDevice = {
			brandId: Number(selectedBrandId),
			productId: Number(selectedProductId),
			newProductName: "",
			gender: gender,
			connected: true,
		};

		const storedDevices = await AsyncStorage.getItem("@knownDevices");
		const devicesArray = storedDevices ? JSON.parse(storedDevices) : [];
		devicesArray.push(newDevice);
		await AsyncStorage.setItem("@knownDevices", JSON.stringify(devicesArray));
	};

	return (
		<View style={styles.wrapper}>
			<SafeAreaView style={styles.safeView}>
				<StatusBar style="light" />
				<Header
					title={`${
						foundDevicesLength > 1
							? t("onboarding.deviceFound.title.multiple", {
									deviceCount: foundDevicesLength,
							  })
							: t("onboarding.deviceFound.title.single", {
									deviceCount: foundDevicesLength,
							  })
					}`}
					paragraph={t("onboarding.deviceFound.p")}
					backButton={true}
					steps={5}
					currStep={4}
					brandName={brandsData[selectedBrandId]?.name}
				/>
				<View style={styles.foundContainer}>
					<TouchableOpacity
						onPress={() => {
							foundProductId === null
								? setFoundProductId(0)
								: setFoundProductId(null);
							handleShowConfirm();
						}}
						style={{
							zIndex: 2,
							backgroundColor: foundProductId !== null ? "#EAECEF" : "#93979D",
							borderRadius: 8,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							height: 100,
							paddingHorizontal: 13,
							marginBottom: 12,
							width: "100%",
						}}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								gap: 20,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Image
								style={{
									width: 60,
									height: 70,
									resizeMode: "contain",
									paddingLeft: 8,
								}}
								source={
									gender &&
									brandsData[selectedBrandId]?.products[selectedProductId]
										.productImageUrl[gender]
								}
							/>
							<View>
								<Text
									style={{
										fontWeight: "bold",
										textTransform: "uppercase",
										fontSize: 12,
									}}
								>
									{brandsData[selectedBrandId]?.name}
								</Text>
								<Text
									style={{
										fontWeight: "regular",
										textTransform: "uppercase",
										fontSize: 12,
									}}
								>
									{
										brandsData[selectedBrandId]?.products[selectedProductId]
											.name[locale]
									}
								</Text>
							</View>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{foundProductId === null ? <BluetoothIcon /> : <CheckIcon />}
						</View>
					</TouchableOpacity>
				</View>
				{/* <View>
					<PillButton
						label={t("onboarding.deviceFound.primaryButton")}
						icon="pair"
						disabled={foundProductId === null}
						func={handleShowConfirm}
					/>
					<TextButton
						link="/productSelect"
						label={t("onboarding.deviceFound.secondaryButton")}
						direction="back"
					/>
				</View> */}
			</SafeAreaView>
			<ActionSheet
				ref={actionSheetRef}
				overlayColor="#101820"
				defaultOverlayOpacity={0.85}
				onClose={() => {
					setFoundProductId(null);
					setShowConfirm(false);
					setTimeLeft(duration);
				}}
				containerStyle={{
					backgroundColor: "#D6DADE",
				}}
			>
				<View style={{ display: "flex", alignItems: "center", gap: 20 }}>
					<View
						style={{
							paddingLeft: 56,
							paddingRight: 56,
							paddingTop: 30,
							gap: 16,
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
							<Text
								style={{
									fontSize: 24,

									fontFamily: "FontBold",
								}}
							>
								{t("onboarding.binding.title")}
							</Text>
							<Text style={{ fontSize: 14, fontFamily: "FontLight" }}>
								{t("onboarding.binding.p")}
							</Text>
						</View>
						<View
							style={{
								width: 44,
								height: 44,
								background: "conic-gradient(#2E3B48 75%, transparent 75%)",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<View
								style={{
									width: timerSize,
									height: timerSize,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Svg width={timerSize} height={timerSize}>
									<Circle
										stroke="#2E3B48"
										fill="none"
										cx={timerSize / 2}
										cy={timerSize / 2}
										r={radius}
										strokeWidth={strokeWidth}
									/>
									<Circle
										stroke="#D1D3D7"
										fill="none"
										cx={timerSize / 2}
										cy={timerSize / 2}
										r={radius}
										strokeWidth={strokeWidth}
										strokeDasharray={circumference}
										strokeDashoffset={circumference * (timeLeft / duration)}
										rotation="-90"
										originX={timerSize / 2}
										originY={timerSize / 2}
									/>
								</Svg>
								<Text
									style={{
										position: "absolute",
										fontSize: 14,
										fontWeight: "bold",
									}}
								>
									{timeLeft}
								</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							height: 360,
							width: "100%",
							marginBottom: Platform.OS === "android" ? 0 : -35,
						}}
					>
						<Pressable
							onPress={() => {
								handleSaveProduct(selectedBrandId, selectedProductId, gender);
								actionSheetRef.current?.hide();
								setShowConfirm(false);
								setTimeLeft(duration);
								router.push(
									`/onboarding/success?selectedBrandId=${selectedBrandId}&selectedProductId=${selectedProductId}&gender=${gender}`
								);
							}}
						>
							<Image
								style={{ width: "100%", height: "100%", resizeMode: "cover" }}
								source={require("../../assets/images/confirm-button.jpg")}
							/>
						</Pressable>
					</View>
				</View>
			</ActionSheet>
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
	foundContainer: {
		flex: 1,
		display: "flex",
		marginVertical: 55,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
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
	brandName: {
		fontSize: 16,
		fontFamily: "FontMedium",
		color: "#EE5340",
		textTransform: "uppercase",
		marginBottom: 4,
	},
	headerButton: {
		width: 32,
		height: 32,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
