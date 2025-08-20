import React, { useRef } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import LeftArrow from "../../assets/images/left-arrow.svg";
import RightArrow from "../../assets/images/right-arrow.svg";

export default function CarouselSelector({
	selectedState,
	setSelectedState,
	zoomOutScale,
	data,
}) {
	const startX = useRef(0);
	const startY = useRef(0);
	const threshold = 10;
	const carouselRef = useRef(null);

	const baseOptions = {
		parallaxScrollingOffset: -100,
		parallaxScrollingScale: 1,
		parallaxAdjacentItemScale: zoomOutScale,
	};

	return (
		<View
			style={[
				styles.contentWrapper,
				selectedState !== null ? styles.selected : styles.notSelected,
			]}
		>
			{selectedState === null && (
				<TouchableOpacity
					onPress={() => carouselRef.current.prev()}
					style={styles.arrow}
				>
					<LeftArrow />
				</TouchableOpacity>
			)}
			<View style={styles.selectionContainer}>
				<Carousel
					ref={carouselRef}
					mode="parallax"
					modeConfig={baseOptions}
					width={Dimensions.get("window").width * 0.55}
					style={{
						overflow: "visible",
					}}
					loop={false}
					autoPlay={false}
					data={data}
					scrollAnimationDuration={300}
					enabled={selectedState === null}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							onPressIn={(e) => {
								const { pageX, pageY } = e.nativeEvent;
								startX.current = pageX;
								startY.current = pageY;
							}}
							onPressOut={(e) => {
								const { pageX, pageY } = e.nativeEvent;
								const dx = Math.abs(pageX - startX.current);
								const dy = Math.abs(pageY - startY.current);

								if (dx < threshold && dy < threshold) {
									selectedState !== null
										? setSelectedState(null)
										: setSelectedState(index);
								}
							}}
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{item}
						</TouchableOpacity>
					)}
				/>
			</View>
			{selectedState === null && (
				<TouchableOpacity
					onPress={() => carouselRef.current.next()}
					style={styles.arrow}
				>
					<RightArrow />
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	contentWrapper: {
		flex: 1,
		marginVertical: 55,
		borderRadius: 8,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	selected: {
		backgroundColor: "rgba(234, 236, 239, 1)",
	},
	notSelected: {
		backgroundColor: "rgba(234, 236, 239, 0.65)",
	},
	selectionContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	arrow: {
		width: 60,
		height: 60,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 400,
	},
});
