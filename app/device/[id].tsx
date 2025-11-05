import Footer from "@/components/ui/Footer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Animated,
	Dimensions,
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
import DeviceImageBackground from "../../assets/images/device-image-background.svg";
import EwoolLogo from "../../assets/images/ewool-logo.svg";
import HeatingIcon from "../../assets/images/heating-icon.svg";
import OffIcon from "../../assets/images/off-icon.svg";
import OnIcon from "../../assets/images/on-icon.svg";
import ScreenBackground from "../../assets/images/screen-back.svg";
import CircularSlider from "../../components/ui/CircularSlider";
import { TempUnitContext } from "../context/TempUnitContext";
import brandsData from "../utils/brandsData";

const index = () => {
	const { i18n, t } = useTranslation();
	const locale = i18n.language;
	const router = useRouter();
	const { id, modelName, headerImageUrl, gender, brand } =
		useLocalSearchParams();
	const { currentTempUnit, setCurrentTempUnit } = useContext(TempUnitContext);
	let min = 38;
	let max = 55;
	const { width } = Dimensions.get("window");
	const [targetValue, setTargetValue] = useState(min);
	const [turnedOn, setTurnedOn] = useState(false);
	const [currentValue, setCurrentValue] = useState(48);
	const [finalValue, setFinalValue] = useState(null);
	const fadeAnim = useRef(new Animated.Value(turnedOn ? 1 : 0)).current;
	const blinkAnim = useRef(new Animated.Value(1)).current;
	const tempOpacity = useRef(new Animated.Value(0)).current;
	const tempTranslateY = useRef(new Animated.Value(-20)).current;

	useEffect(() => {
		if (turnedOn && currentValue < targetValue) {
			const blinkAnimation = Animated.loop(
				Animated.sequence([
					Animated.timing(blinkAnim, {
						toValue: 0.2,
						duration: 800,
						useNativeDriver: true,
					}),
					Animated.timing(blinkAnim, {
						toValue: 1,
						duration: 800,
						useNativeDriver: true,
					}),
				])
			);
			blinkAnimation.start();
			return () => blinkAnimation.stop();
		} else {
			blinkAnim.setValue(1);
		}
	}, [turnedOn, currentValue, targetValue, blinkAnim]);

	useEffect(() => {
		if (turnedOn) {
			Animated.parallel([
				Animated.timing(tempOpacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(tempTranslateY, {
					toValue: 0,
					duration: 400,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(tempOpacity, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(tempTranslateY, {
					toValue: 10,
					duration: 400,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [turnedOn, tempOpacity, tempTranslateY]);

	// useEffect(() => {
	// 	if (targetValue === min && finalValue !== targetValue) {
	// 		handleTurnOff();
	// 	}
	// }, [targetValue, finalValue]);

	const handleTurnOff = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start();
		setTurnedOn(false);
		setTargetValue(min);
		setFinalValue(min);
	};

	const handleTurnOn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
		setTurnedOn(true);
		setTargetValue(max);
		setFinalValue(max);
	};

	const checkUnit = (number) => {
		if (currentTempUnit === "celsius") return number;
		else return (number * 9) / 5 + 32;
	};

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.productContainer}>
				<SafeAreaView style={styles.headerButton}>
					<TouchableOpacity
						onPress={() => {
							router.navigate("/");
						}}
					>
						<BackArrow />
					</TouchableOpacity>
				</SafeAreaView>
				<View style={[{ width: width - 52 }, styles.productInfo]}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							height: "100%",
							gap: 17,
						}}
					>
						<EwoolLogo style={{ width: 27, height: 32 }} />
						<View
							style={{
								width: 1,
								borderWidth: 1,
								borderColor: "#d4d4d4",
								backgroundColor: "#d4d4d4",
								height: "100%",
								opacity: 0.8,
							}}
						></View>
						<Image
							style={styles.brandLogo}
							source={
								brandsData.find((b) => b.name === brand)?.deviceHeaderLogoUrl
							}
						/>
					</View>
					<View style={styles.productNameContainer}>
						<Text style={styles.modelName}>{modelName}</Text>
						<Text style={styles.modelName}>
							{t("for")} {t(gender)}
						</Text>
					</View>
				</View>
				<View style={styles.productImageContainer}>
					<Image style={styles.productImage} source={headerImageUrl} />
					<DeviceImageBackground
						width="100%"
						height="100%"
						preserveAspectRatio="none"
					/>
				</View>
			</View>
			<View style={styles.controlsContainer}>
				<View
					style={{
						flex: 1,
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Animated.View
						style={[
							{
								opacity: fadeAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [1, 0],
								}),
								zIndex: 2000,
								position: "absolute",
							},
						]}
						pointerEvents={"auto"}
					>
						<Pressable style={styles.onIcon} onPress={handleTurnOn}>
							<OnIcon />
						</Pressable>
					</Animated.View>
					<CircularSlider
						turnedOn={turnedOn}
						setTurnedOn={setTurnedOn}
						targetValue={targetValue}
						setTargetValue={setTargetValue}
						finalValue={finalValue}
						setFinalValue={setFinalValue}
						handleTurnOff={handleTurnOff}
						handleTurnOn={handleTurnOn}
						min={min}
						max={max}
						size={320}
						strokeWidth={18}
						thumbColor="#F5533F"
						thumbSize={2.5}
						thumbOffset={43}
						startAngle={135}
						endAngle={405}
						tickCount={97}
						tickLength={10}
						majorTickInterval={32}
						majorTickLength={16}
						trackColor="#373A41"
						progressColor="#A54940"
						gradientColors={["#D3B047", "#D38B47", "#D35547"]}
						padding={10}
					/>
				</View>
				{/* blocking the drag action on the center */}
				<View
					style={{
						position: "absolute",
						width: 140,
						height: 140,
						borderRadius: 999,
						backgroundColor: "transparent",
						zIndex: 999,
					}}
					pointerEvents="auto"
				/>
				<Animated.View style={[styles.offIcon, { opacity: fadeAnim }]}>
					<Pressable
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={handleTurnOff}
					>
						<OffIcon />
					</Pressable>
				</Animated.View>
				<View style={styles.sliderContentContainer}>
					{/* <View style={styles.currentTempContainer}>
						<Text style={styles.currentTemp}>
							{t("current", { currentTempValue: checkUnit(currentValue) })}
						</Text>
					</View> */}
					<Animated.View
						style={[
							{
								opacity: fadeAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [1, 0],
								}),
								position: "absolute",
								resizeMode: "contain",
								width: "80%",
								zIndex: 2000,
							},
						]}
					>
						<Image
							style={{ resizeMode: "contain", width: "100%" }}
							source={require("../../assets/images/slider-back-off.png")}
						/>
					</Animated.View>
					<Image
						source={require("../../assets/images/slider-back.png")}
						style={styles.slider}
					/>
					{turnedOn ? (
						<Animated.View
							style={[
								styles.tempContainer,
								{
									opacity: tempOpacity,
									transform: [{ translateY: tempTranslateY }],
								},
							]}
						>
							<View style={styles.tempContainer}>
								<Text style={styles.tempValue}>
									{Math.round(checkUnit(targetValue))}°
								</Text>
								<Text style={styles.tempUnit}>
									{currentTempUnit === "celsius"
										? t("celsius")
										: t("fahrenheit")}
								</Text>
							</View>
						</Animated.View>
					) : (
						<Animated.View
							style={[
								{
									opacity: fadeAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [1, 0],
									}),
									zIndex: 2000,
									position: "absolute",
								},
							]}
							pointerEvents={"auto"}
						>
							<Pressable style={styles.onIcon} onPress={handleTurnOn}>
								<OnIcon />
							</Pressable>
						</Animated.View>
					)}
					{turnedOn && currentValue < targetValue && (
						<Animated.View style={[styles.heatingIcon, { opacity: blinkAnim }]}>
							<HeatingIcon />
						</Animated.View>
					)}
				</View>
			</View>
			<SafeAreaView>
				<Footer products={false} settings={false} />
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
	container: {
		flex: 1,
		position: "relative",
		fontFamily: "FontRegular",
		display: "flex",
		flexDirection: "column",
	},
	brandLogo: {
		height: 18,
		width: 75,
		resizeMode: "contain",
	},
	offIcon: {
		position: "absolute",
		bottom: "10%",
		width: 50,
		height: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 999,
		backgroundColor: "transparent",
		zIndex: 1100,
	},
	onIcon: {
		width: 175,
		height: 175,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 999,
		backgroundColor: "transparent",
		zIndex: 1100,
		overflow: "hidden",
	},
	heatingIcon: {
		position: "absolute",
		bottom: "32.5%",
	},
	headerButton: {
		width: 32,
		height: 32,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: 60,
		left: 26,
		zIndex: 4,
	},
	productImageContainer: {
		flex: 1,
		borderBottomLeftRadius: 28,
		borderBottomRightRadius: 28,
		overflow: "hidden",
	},
	productContainer: {
		// zIndex: -1,
		top: 0,
		left: 0,
		flex: 1,
		display: "flex",
		alignContent: "center",
		// maxHeight: "50%",
	},
	productImage: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 1,
	},
	productInfo: {
		height: 43,
		position: "absolute",
		bottom: 20,
		left: "50%",
		transform: [{ translateX: "-50%" }],
		zIndex: 2,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		opacity: 0.85,
	},
	productNameContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	brand: {
		color: "#EE5340",
		fontSize: 13,
		textTransform: "uppercase",
		fontFamily: "FontBold",
	},
	modelName: {
		color: "#EAECEF",
		fontSize: 12,
		textTransform: "uppercase",
		marginTop: 4,
		fontFamily: "FontMedium",
	},
	amblem: {
		position: "absolute",
		bottom: -20,
		right: "50%",
		zIndex: 2,
		transform: [{ translateX: "50%" }],
	},
	controlsContainer: {
		marginTop: 36,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		width: 330,
		height: 330,
		margin: "auto",
	},
	slider: {
		position: "absolute",
		resizeMode: "contain",
		width: "80%",
	},
	tempContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		opacity: 0.85,
	},
	tempValue: {
		color: "#EAECEF",
		fontSize: 45,
		fontFamily: "FontRegular",
		opacity: 0.9,
		transform: [{ translateX: 9 }, { translateY: 0 }],
	},
	tempUnit: {
		color: "#EAECEF",
		fontSize: 12,
		fontFamily: "FontRegular",
		textTransform: "uppercase",
		opacity: 0.9,
	},
	currentTemp: {
		color: "#EAECEF",
		fontSize: 12,
		fontFamily: "FontRegular",
		textTransform: "uppercase",
		opacity: 0.8,
	},
	sliderDegreesEmpty: {
		position: "absolute",
		zIndex: 2,
		resizeMode: "contain",
	},
	currentTempContainer: {
		position: "absolute",
		bottom: 0,
		zIndex: 2,
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	sliderContentContainer: {
		position: "absolute",
		zIndex: -1,
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		transform: [{ translateY: 0.5 }],
	},
	tabsContainer: {
		height: 70,
		marginBottom: Platform.OS === "android" ? 30 : 0,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		gap: 56,
		flexDirection: "row",
		marginTop: 16,
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

export default index;
