import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import ScreenBackground from "../../assets/images/screen-back.svg";
import CarouselSelector from "../../components/ui/CarouselSelector";
import Header from "../../components/ui/Header";
import PillButton from "../../components/ui/PillButton";
import TextButton from "../../components/ui/TextButton";
import brandsData from "../utils/brandsData";

export default function HomeScreen() {
	const { i18n, t } = useTranslation();
	const locale = i18n.language;
	const { devicesCount } = useLocalSearchParams();
	const [selectedBrandId, setSelectedBrandId] = useState(null);

	const brands = brandsData.map((brand, index) => {
		return (
			<View key={index + brand.name} style={styles.logoContainer}>
				<Image style={styles.logo} source={brand.logoUrl} />
			</View>
		);
	});

	return (
		<View style={styles.wrapper}>
			<SafeAreaView style={styles.safeView}>
				<StatusBar style="light" />
				<Header
					title={t("onboarding.selectBrand.title")}
					paragraph={t("onboarding.selectBrand.p")}
					backButton={false}
					steps={5}
					currStep={1}
					brandName={undefined}
				/>
				<CarouselSelector
					selectedState={selectedBrandId}
					setSelectedState={setSelectedBrandId}
					zoomOutScale={0.01}
					data={brands}
				/>
				<View>
					<PillButton
						link={`/onboarding/productSelect?selectedBrandId=${selectedBrandId}&gender=men`}
						label={t("onboarding.selectBrand.primaryButton")}
						icon="arrow"
						disabled={selectedBrandId === null}
					/>
					<TextButton
						link="/"
						label={t("onboarding.selectBrand.secondaryButton")}
						disabled={devicesCount === undefined ? false : true}
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
	},
	logoContainer: {
		width: 140,
		height: 140,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		objectFit: "contain",
		width: "100%",
		height: "100%",
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
