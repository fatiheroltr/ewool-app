import "@/i18n";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import "react-native-reanimated";
import Splash from "../components/Splash";
import { TempUnitContextProvider } from "./context/TempUnitContext";

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		FontRegular: require("../assets/fonts/DINNextRoundedLTPro-Regular.otf"),
		FontBold: require("../assets/fonts/DINNextRoundedLTPro-Bold.otf"),
		FontMedium: require("../assets/fonts/DINNextRoundedLTPro-Medium.otf"),
		FontLight: require("../assets/fonts/DINNextRoundedLTPro-Light.otf"),
	});

	const [appReady, setAppReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				if (fontError) throw fontError;
				if (fontsLoaded) {
					setAppReady(true);
					await SplashScreen.hideAsync();
				}
			} catch (e) {
				console.warn(e);
			}
		}
		prepare();
	}, [fontsLoaded, fontError]);

	// Disable font scaling globally
	Text.defaultProps = Text.defaultProps || {};
	Text.defaultProps.allowFontScaling = false;
	TextInput.defaultProps = TextInput.defaultProps || {};
	TextInput.defaultProps.allowFontScaling = false;

	if (!appReady) {
		return <Splash />;
	}

	return (
		<TempUnitContextProvider>
			<Slot />
		</TempUnitContextProvider>
	);
}
