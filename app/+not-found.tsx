import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 30, fontWeight: "bold" }}>NOT FOUND!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
});
