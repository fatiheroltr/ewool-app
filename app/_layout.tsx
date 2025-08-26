import "@/i18n";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { Text, TextInput } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
	const [loaded] = useFonts({
		FontRegular: require("../assets/fonts/DINNextRoundedLTPro-Regular.otf"),
		FontBold: require("../assets/fonts/DINNextRoundedLTPro-Bold.otf"),
		FontMedium: require("../assets/fonts/DINNextRoundedLTPro-Medium.otf"),
		FontLight: require("../assets/fonts/DINNextRoundedLTPro-Light.otf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	// Disable font scaling globally
	Text.defaultProps = Text.defaultProps || {};
	Text.defaultProps.allowFontScaling = false;

	TextInput.defaultProps = TextInput.defaultProps || {};
	TextInput.defaultProps.allowFontScaling = false;

	return <Slot />;
}
