import React, { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function CarouselSelector({
	selectedState,
	setSelectedState,
	zoomOutScale,
	data,
}) {
	const carouselRef = useRef(null);
	const baseOptions = {
		parallaxScrollingOffset: 16,
		parallaxScrollingScale: 1,
		parallaxAdjacentItemScale: 0.8,
	};

	return (
		<View style={styles.contentWrapper}>
			<Carousel
				ref={carouselRef}
				mode="parallax"
				modeConfig={baseOptions}
				width={Dimensions.get("window").width - 75}
				style={{
					overflow: "visible",
				}}
				loop={false}
				autoPlay={false}
				data={data}
				scrollAnimationDuration={300}
				onProgressChange={(_, index) => setSelectedState(index)}
				renderItem={({ item, index }) => (
					<View style={styles.selectionContainer}>{item}</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	contentWrapper: {
		flex: 1,
		marginVertical: 55,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	selectionContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		borderRadius: 8,
		backgroundColor: "rgba(234, 236, 239, 0.80)",
	},
});
