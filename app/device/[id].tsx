import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	Image,
	Platform,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { RadialSlider } from "react-native-radial-slider";
import DeviceImageBackground from "../../assets/images/device-image-background.svg";
import Amblem from "../../assets/images/ewool-amblem.svg";
import ProductsIcon from "../../assets/images/products-icon.svg";
import ScreenBackground from "../../assets/images/screen-back.svg";
import SettingsIcon from "../../assets/images/settings-icon.svg";

const index = () => {
	const router = useRouter();
	const { id, modelName, headerImageUrl, gender, brand } =
		useLocalSearchParams();
	let tempUnit = "c";
	let currentValue = 44;
	const [targetValue, setTargetValue] = useState(50);
	const [turnedOn, setTurnedOn] = useState(true);
	const [triggerRender, setTriggerRender] = useState(0);

	const checkUnit = (number) => {
		if (tempUnit === "c") return number;
		else return ((number * 9) / 5 + 32).toFixed(0);
	};

	useEffect(() => {
		turnedOn ? setTargetValue(50) : setTargetValue(38);
		setTriggerRender((prev) => prev + 1);
	}, [turnedOn]);

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.productContainer}>
				<Amblem style={styles.amblem} />
				<View style={styles.productInfo}>
					<Text style={styles.brand}>{brand}</Text>
					<Text style={styles.modelName}>{modelName}</Text>
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
				<View style={styles.sliderContentContainer}>
					<View style={styles.currentTempContainer}>
						<Text style={styles.currentTemp}>
							current {checkUnit(currentValue)}°
						</Text>
					</View>
					<Image
						source={require("../../assets/images/slider-back.png")}
						style={styles.slider}
					/>
					<View style={styles.tempContainer}>
						<Text
							style={[styles.tempValue, { transform: [{ translateX: 10 }] }]}
						>
							{checkUnit(targetValue)}°
						</Text>
						<Text style={styles.tempUnit}>
							{tempUnit === "c" ? "celcius" : "fahrenheit"}
						</Text>
					</View>
				</View>
				<RadialSlider
					key={triggerRender}
					value={targetValue}
					min={38}
					max={55}
					radius={140}
					onChange={setTargetValue}
					sliderWidth={0}
					sliderTrackColor="transparent"
					lineColor="#373A42"
					openingRadian={Math.PI / 3.4}
					isHideCenterContent={true}
					isHideButtons={true}
					isHideTailText={true}
					thumbRadius={5}
					thumbBorderColor="transparent"
					thumbBorderWidth={13}
					lineSpace={3}
					thumbColor={turnedOn ? "#B74C41" : "transparent"}
					linearGradient={[
						{ offset: "0%", color: "#B74C41" },
						{ offset: "100%", color: "#B74C41" },
					]}
					strokeLinecap="butt"
					step={1}
				/>
			</View>
			<SafeAreaView>
				<View style={styles.tabsContainer}>
					<Pressable
						onPress={() => {
							router.push("/");
						}}
						style={styles.tabItemContainer}
					>
						<ProductsIcon />
						<Text style={styles.tabLabel}>PRODUCTS</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							setTurnedOn(!turnedOn);
						}}
						style={styles.tabItemContainer}
					>
						{turnedOn ? (
							<Image
								source={require("../../assets/images/on-icon.png")}
								style={{
									width: 66,
									height: 66,
								}}
							/>
						) : (
							<Image
								source={require("../../assets/images/off-icon.png")}
								style={{ width: 66, height: 66 }}
							/>
						)}
					</Pressable>
					<View style={styles.tabItemContainer}>
						<SettingsIcon />
						<Text style={styles.tabLabel}>SETTINGS</Text>
					</View>
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
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		fontFamily: "FontRegular",
		display: "flex",
		flexDirection: "column",
	},
	productImageContainer: {
		flex: 1,
		borderBottomLeftRadius: 28,
		borderBottomRightRadius: 28,
		overflow: "hidden",
	},
	productContainer: {
		zIndex: -1,
		top: 0,
		left: 0,
		flex: 1,
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
		position: "absolute",
		bottom: 58,
		left: 26,
		width: "100%",
		height: "100%",
		zIndex: 2,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		opacity: 0.85,
	},
	brand: {
		color: "#EE5340",
		fontSize: 14,
		textTransform: "uppercase",
		fontFamily: "FontBold",
	},
	modelName: {
		color: "#EAECEF",
		fontSize: 18,
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
		justifyContent: "center",
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
