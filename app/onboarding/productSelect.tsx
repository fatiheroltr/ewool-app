import CarouselSelector from "@/components/ui/CarouselSelector";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Image,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import ScreenBackground from "../../assets/images/screen-back.svg";
import Header from "../../components/ui/Header";
import PillButton from "../../components/ui/PillButton";
import TextButton from "../../components/ui/TextButton";
import brandsData from "../utils/brandsData";

export default function ProductSelect() {
	const { i18n, t } = useTranslation();
	const locale = i18n.language;
	const { selectedBrandId, gender, selectedProductIdParam } =
		useLocalSearchParams();
	const [selectedProductId, setSelectedProductId] = useState(null);

	// set the selectedProductId based on the selectedProductIdParam from QR code scan
	useEffect(() => {
		if (selectedProductIdParam) {
			setSelectedProductId(selectedProductIdParam);
		}
	}, [selectedProductIdParam]);

	const productsData =
		selectedBrandId &&
		brandsData[selectedBrandId]?.products?.map((product) => {
			return (
				<View
					key={product.name}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						gap: 24,
						paddingTop: 6,
					}}
				>
					<Image
						style={{
							height: 16,
							resizeMode: "contain",
							marginBottom: 6,
						}}
						source={brandsData[selectedBrandId]?.logoUrl}
					/>
					<Image
						style={{ height: "63%", resizeMode: "contain" }}
						source={product.productImageUrl[gender.replace(/"/g, "")]}
					/>
					<Text
						style={{
							fontSize: 12,
							textTransform: "uppercase",
							fontFamily: "FontRegular",
						}}
					>
						{product.name}
					</Text>
				</View>
			);
		});

	return (
		<View style={styles.wrapper}>
			<SafeAreaView style={styles.safeView}>
				<StatusBar style="light" />
				<Header
					title={t("onboarding.selectProduct.title")}
					paragraph={t("onboarding.selectProduct.p")}
					backButton={true}
					steps={5}
					currStep={2}
					brandName={brandsData[selectedBrandId]?.name}
				/>
				{brandsData[selectedBrandId]?.products ? (
					<CarouselSelector
						selectedState={selectedProductId}
						setSelectedState={setSelectedProductId}
						zoomOutScale={0.6}
						data={productsData}
					/>
				) : (
					<View
						style={{
							flex: 1,
							marginVertical: 55,
							borderRadius: 8,
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							overflow: "hidden",
							backgroundColor: "rgba(234, 236, 239, 0.65)",
						}}
					>
						<Text
							style={{
								textTransform: "uppercase",
								fontSize: 13,
								textAlign: "center",
								lineHeight: 20,
							}}
						>
							{t("onboarding.selectProduct.notFound")}
							{`\n`}
							<Text
								style={{ fontWeight: "bold", fontSize: 16, lineHeight: 24 }}
							>
								{brandsData[selectedBrandId]?.name}
							</Text>
						</Text>
					</View>
				)}
				<View>
					<PillButton
						link={`/onboarding/search?selectedBrandId=${selectedBrandId}&selectedProductId=${selectedProductId}&gender=${gender}`}
						label={t("onboarding.selectProduct.primaryButton")}
						icon="arrow"
						disabled={selectedProductId === null}
					/>
					<TextButton
						link="/onboarding"
						label={t("onboarding.selectProduct.secondaryButton")}
						direction="back"
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
