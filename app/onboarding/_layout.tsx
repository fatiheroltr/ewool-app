import { Stack } from "expo-router";
import React from "react";

const OnboardLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			{/* <Stack.Screen
				name="found"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="search"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="success"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="notFound"
				options={{
					headerShown: false,
				}}
			/> */}
		</Stack>
	);
};

export default OnboardLayout;
