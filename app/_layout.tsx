import "@/i18n";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import "react-native-reanimated";
import Splash from "../components/Splash";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [appReady, setAppReady] = useState(false);
	const [fontsLoaded, error] = useFonts({
		FontRegular: require("../assets/fonts/DINNextRoundedLTPro-Regular.otf"),
		FontBold: require("../assets/fonts/DINNextRoundedLTPro-Bold.otf"),
		FontMedium: require("../assets/fonts/DINNextRoundedLTPro-Medium.otf"),
		FontLight: require("../assets/fonts/DINNextRoundedLTPro-Light.otf"),
	});

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) {
			setAppReady(true);
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);

	if (!appReady) {
		return <Splash />;
	}

	// Disable font scaling globally
	Text.defaultProps = Text.defaultProps || {};
	Text.defaultProps.allowFontScaling = false;

	TextInput.defaultProps = TextInput.defaultProps || {};
	TextInput.defaultProps.allowFontScaling = false;

	return <Slot />;
}
