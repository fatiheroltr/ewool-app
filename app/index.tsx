import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RadialSlider } from "react-native-radial-slider";
import DeviceImageBackground from "../assets/images/device-image-background.svg";
import Amblem from "../assets/images/ewool-amblem.svg";
import ScreenBackground from "../assets/images/screen-back.svg";

const index = () => {
	const [value, setValue] = useState(50);

	let brand = "sagney";
	let model = "puffer jacket";
	let gender = "men";

	let currentTemp = 44;
	let tempUnit = "celcius";

	// const navigation = useNavigation();

	// const fetchDevices = () => {
	// 	navigation.navigate("onboarding");
	// };

	// useEffect(() => {
	// 	fetchDevices();
	// }, []);

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			{/* <SafeAreaView>
				<Text style={{ color: "#fff" }}>SAFE AREA</Text>
			</SafeAreaView> */}
			<View style={styles.productContainer}>
				<Amblem style={styles.amblem} />
				<View style={styles.productInfo}>
					<Text style={styles.brand}>{brand}</Text>
					<Text style={styles.model}>{model}</Text>
				</View>
				<View style={styles.productImageContainer}>
					<Image
						style={styles.productImage}
						source={require("../assets/images/heatlover-puffer-jacket-model-men.png")}
					/>
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
						<Text style={styles.currentTemp}>current {currentTemp}°</Text>
					</View>
					{/* <SliderDegreesEmpty style={styles.sliderDegreesEmpty} /> */}
					<Image
						source={require("../assets/images/slider-back.png")}
						style={styles.slider}
					/>
					<View style={styles.tempContainer}>
						<Text
							style={[styles.tempValue, { transform: [{ translateX: 10 }] }]}
						>
							{value}°
						</Text>
						<Text style={styles.tempUnit}>{tempUnit}</Text>
					</View>
				</View>
				<RadialSlider
					value={value}
					min={38}
					max={55}
					radius={145}
					onChange={setValue}
					title="Speed"
					sliderWidth={0}
					lineColor="#373A42"
					openingRadian={Math.PI / 3.3}
					isHideCenterContent={true}
					isHideButtons={true}
					isHideTailText={true}
					thumbRadius={4}
					thumbBorderColor="transparent"
					thumbBorderWidth={10}
					lineSpace={3}
					thumbColor="#A54941"
					linearGradient={[
						{ offset: "0%", color: "#A54941" },
						{ offset: "100%", color: "#A54941" },
					]}
					strokeLinecap="butt"
					step={1}
				/>
			</View>
			<View style={{ height: 70, marginBottom: 20 }}>
				<Text>TABS</Text>
			</View>
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
		maxHeight: "47%",
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
	},
	brand: {
		color: "#EE5340",
		fontSize: 14,
		textTransform: "uppercase",
		fontFamily: "FontBold",
	},
	model: {
		color: "#EAECEF",
		fontSize: 18,
		textTransform: "uppercase",
		marginTop: 4,
		fontFamily: "FontMedium",
		opacity: 0.85,
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
	},
	tempUnit: {
		color: "#EAECEF",
		fontSize: 12,
		fontFamily: "FontRegular",
		textTransform: "uppercase",
	},
	currentTemp: {
		color: "#EAECEF",
		fontSize: 12,
		fontFamily: "FontRegular",
		textTransform: "uppercase",
		opacity: 0.85,
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
});

export default index;
