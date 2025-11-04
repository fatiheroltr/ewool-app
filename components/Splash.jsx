import React from "react";
import { Image, View } from "react-native";

const Splash = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Image
				style={{ flex: 1, objectFit: "contain" }}
				source={require("../assets/images/splash-screen.jpg")}
			/>
		</View>
	);
};

export default Splash;
