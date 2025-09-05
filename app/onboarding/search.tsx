import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Animated,
	Easing,
	Image,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import PairIcon from "../../assets/images/pair-icon.svg";
import ScreenBackground from "../../assets/images/screen-back.svg";
import Header from "../../components/ui/Header";
import brandsData from "../utils/brandsData";

export default function Search() {
	const { i18n, t } = useTranslation();
	const locale = i18n.language;
	const { selectedBrandId, selectedProductId, gender } = useLocalSearchParams();
	const rotation = useRef(new Animated.Value(0)).current;
	const [countdown, setCountdown] = useState(15);

	useEffect(() => {
		if (countdown === 0) {
			router.replace({
				pathname: "/onboarding/productSelect",
				params: { selectedBrandId, gender },
			});
		}
		// temporary for UI
		if (countdown === 11) {
			router.replace({
				pathname: "/onboarding/found",
				params: { selectedBrandId, gender, selectedProductId },
			});
		}

		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [countdown]);

	useEffect(() => {
		const animate = () => {
			rotation.setValue(0);
			Animated.timing(rotation, {
				toValue: 1,
				duration: 6000,
				useNativeDriver: true,
				easing: Easing.linear,
			}).start(() => animate());
		};

		animate();
	}, [rotation]);

	const rotateInterpolate = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "-360deg"],
	});

	return (
		<View style={styles.wrapper}>
			<SafeAreaView style={styles.safeView}>
				<StatusBar style="light" />
				<Header
					title={t("onboarding.search.title")}
					paragraph={t("onboarding.search.p")}
					backButton={true}
					steps={5}
					currStep={3}
					brandName={brandsData[selectedBrandId]?.name}
				/>
				<View style={{ flex: 1, marginVertical: 55, padding: 6 }}>
					<Animated.View
						style={[styles.box, { transform: [{ rotate: rotateInterpolate }] }]}
					>
						<Image
							style={styles.searchCircle}
							source={require("../../assets/images/search-circle.png")}
						/>
					</Animated.View>
					<View
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform:
								"translate(-50%, -50%), translateX(4%), translateY(4%)",
						}}
					>
						<PairIcon
							style={{
								transform: "scale(1.75)",
								opacity: 0.8,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						height: 100,
						display: "flex",
						justifyContent: "flex-start",
						alignContent: "flex-start",
					}}
				>
					<Text
						style={{
							color: "#D6DADE",
							fontSize: 17,
							textAlign: "center",
							fontFamily: "FontRegular",
							opacity: 0.8,
						}}
					>
						00:{countdown < 10 ? `0${countdown}` : countdown}
					</Text>
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
	searchCircle: {
		width: "100%",
		height: "100%",
		objectFit: "contain",
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
});
