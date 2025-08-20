import Constants from "expo-constants";
import { router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
	Image,
	Linking,
	Platform,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Dialog from "react-native-dialog";
import { SwipeListView } from "react-native-swipe-list-view";
import AddIcon from "../assets/images/add-icon.svg";
import BluetoothIcon from "../assets/images/bluetooth-icon.svg";
import EditIcon from "../assets/images/edit-icon.svg";
import EditIcon2 from "../assets/images/edit-icon2.svg";
import Logo from "../assets/images/ewool-logo.svg";
import ProductsIconSelected from "../assets/images/products-icon-selected.svg";
import DeleteIcon from "../assets/images/remove-icon.svg";
import ScreenBackground from "../assets/images/screen-back.svg";
import SettingsIcon from "../assets/images/settings-icon.svg";
import SupportIcon from "../assets/images/support-icon.svg";

const products = () => {
	const actionSheetRefs = useRef({});
	const navigation = useNavigation();
	const swipeListViewRef = useRef(null);
	const [deviceToRename, setDeviceToRename] = useState(null);
	const [deviceToDelete, setDeviceToDelete] = useState(null);
	const [newDeviceName, setNewDeviceName] = useState("");
	const [knownDevices, setKnownDevices] = useState([
		{
			id: "1",
			brand: "Sagney",
			modelName: "Puffer Jacket 1",
			productImageUrl: {
				men: require("../assets/images/sagney-puffer-jacket-men.png"),
				women: require("../assets/images/sagney-puffer-jacket-women.png"),
			},
			headerImageUrl: {
				men: require("../assets/images/heatlover-puffer-jacket-model-men.png"),
				women: require("../assets/images/heatlover-puffer-jacket-model-women.png"),
			},
			gender: "men",
			supportLink: "https://www.google.com",
			connected: true,
		},
		{
			id: "2",
			brand: "Sagney",
			modelName: "Puffer Jacket 2",
			productImageUrl: {
				men: require("../assets/images/sagney-puffer-jacket-men.png"),
				women: require("../assets/images/sagney-puffer-jacket-women.png"),
			},
			headerImageUrl: {
				men: require("../assets/images/heatlover-puffer-jacket-model-men.png"),
				women: require("../assets/images/heatlover-puffer-jacket-model-women.png"),
			},
			gender: "men",
			supportLink: "https://www.google.com",
			connected: false,
		},
		{
			id: "3",
			brand: "Sagney",
			modelName: "Puffer Jacket 3",
			productImageUrl: {
				men: require("../assets/images/sagney-puffer-jacket-men.png"),
				women: require("../assets/images/sagney-puffer-jacket-women.png"),
			},
			headerImageUrl: {
				men: require("../assets/images/heatlover-puffer-jacket-model-men.png"),
				women: require("../assets/images/heatlover-puffer-jacket-model-women.png"),
			},
			gender: "men",
			supportLink: "https://www.google.com",
			connected: false,
		},
	]);

	const handleDeleteDevice = (id: string | null) => {
		setDeviceToDelete(null);
		setKnownDevices(knownDevices.filter((device) => device.id !== id));
	};

	const handleRenameDevice = (id: string | null) => {
		setDeviceToRename(null);
		setKnownDevices(
			knownDevices.map((device) =>
				device.id === id ? { ...device, modelName: newDeviceName } : device
			)
		);
	};

	return (
		<View style={styles.wrapper}>
			<SafeAreaView
				style={{
					flex: 1,
					flexDirection: "column",
					alignContent: "center",
					justifyContent: "space-between",
					paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
				}}
			>
				<Dialog.Container visible={!!deviceToRename}>
					<Dialog.Title>Rename this</Dialog.Title>
					<Dialog.Description>rename paragraph</Dialog.Description>
					<Dialog.Input
						placeholder={
							deviceToRename
								? knownDevices.find((device) => device.id === deviceToRename)
										?.modelName
								: ""
						}
						onChangeText={setNewDeviceName}
						value={newDeviceName}
						style={{ color: "black" }}
					/>
					<Dialog.Button
						label="Cancel"
						onPress={() => {
							setDeviceToRename(null);
							setNewDeviceName("");
						}}
					/>
					<Dialog.Button
						label="Save"
						onPress={() => handleRenameDevice(deviceToRename)}
					/>
				</Dialog.Container>
				<Dialog.Container visible={!!deviceToDelete}>
					<Dialog.Title>
						Delete{" "}
						{
							knownDevices.find((device) => device.id === deviceToDelete)
								?.modelName
						}
					</Dialog.Title>
					<Dialog.Description>
						This action will delete the device permanently!
					</Dialog.Description>
					<Dialog.Button
						label="Cancel"
						onPress={() => {
							setDeviceToDelete(null);
						}}
					/>
					<Dialog.Button
						label="Delete"
						onPress={() => handleDeleteDevice(deviceToDelete)}
					/>
				</Dialog.Container>
				<StatusBar style="light" />
				<View style={styles.headerContainer}>
					<View style={styles.headerButton}></View>
					<Logo style={{ width: 27, height: 33 }} />
					<TouchableOpacity
						style={styles.headerButton}
						onPress={() => {
							router.push("/onboarding");
						}}
					>
						<AddIcon />
					</TouchableOpacity>
				</View>

				<SwipeListView
					style={{ paddingHorizontal: 26, marginTop: 12 }}
					ref={swipeListViewRef}
					data={knownDevices}
					keyExtractor={(item) => item.id.toString()}
					renderItem={(rowData, rowMap) => (
						<Pressable
							onPress={() => {
								rowData.item.connected &&
									navigation.navigate(`device/[id]`, {
										id: rowData.item.id,
										modelName: rowData.item.modelName,
										gender: rowData.item.gender,
										productImageUrl: rowData.item.productImageUrl,
										headerImageUrl: rowData.item.headerImageUrl,
										brand: rowData.item.brand,
									});
							}}
							style={{
								zIndex: 2,
								backgroundColor: rowData.item.connected ? "#C6CACE" : "#93979D",
								borderRadius: 8,
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								height: 100,
								paddingHorizontal: 13,
								marginBottom: 12,
							}}
						>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									gap: 20,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Image
									style={{
										width: 60,
										height: 70,
										resizeMode: "contain",
										paddingLeft: 8,
										opacity: rowData.item.connected ? 1 : 0.5,
									}}
									source={
										rowData.item.gender &&
										rowData.item.productImageUrl[rowData.item.gender]
									}
								/>
								<View>
									<Text
										style={{
											fontWeight: "bold",
											textTransform: "uppercase",
											fontSize: 12,
										}}
									>
										{rowData.item.brand}
									</Text>
									<Text
										style={{
											fontWeight: "regular",
											textTransform: "uppercase",
											fontSize: 12,
										}}
									>
										{rowData.item.modelName}
									</Text>
								</View>
							</View>
							<View
								style={{
									width: 60,
									height: 60,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									opacity: rowData.item.connected ? 1 : 0,
								}}
							>
								<BluetoothIcon />
							</View>
						</Pressable>
					)}
					renderHiddenItem={(rowData, rowMap) => (
						<Pressable
							style={{
								backgroundColor: "#A54941",
								borderRadius: 8,
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-end",
								height: 100,
								width: 100,
								alignSelf: "flex-end",
							}}
						>
							<Pressable
								onPress={() => {
									actionSheetRefs.current[rowData.item.id]?.show();
								}}
								style={{
									width: 80,
									height: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<EditIcon />
							</Pressable>
						</Pressable>
					)}
					rightOpenValue={-80}
					stopRightSwipe={-80}
					disableRightSwipe={true}
				/>

				<View style={styles.tabsContainer}>
					<View style={styles.tabItemContainer}>
						<ProductsIconSelected />
						<Text style={styles.tabLabel}>PRODUCTS</Text>
					</View>
					<Pressable onPress={() => {}} style={styles.tabItemContainer}>
						<SettingsIcon />
						<Text style={styles.tabLabel}>SETTINGS</Text>
					</Pressable>
				</View>
			</SafeAreaView>
			{knownDevices.map((device, index) => (
				<View key={device.id}>
					<ActionSheet
						ref={(ref) => (actionSheetRefs.current[device.id] = ref)}
						overlayColor="#101820"
						defaultOverlayOpacity={0.85}
						onClose={() => swipeListViewRef.current?.closeAllOpenRows()}
						containerStyle={{
							backgroundColor: "#D6DADE",
						}}
					>
						<View
							style={{
								margin: 26,
								marginBottom: Platform.OS === "android" ? 60 : 30,
							}}
						>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",

									height: 100,
								}}
							>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										gap: 12,
									}}
								>
									<Image
										source={
											device.gender && device.productImageUrl[device.gender]
										}
										style={{
											width: 100,
											height: 100,
											objectFit: "contain",
											opacity: device.connected ? 1 : 0.5,
										}}
									/>
									<View
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
										}}
									>
										<Text
											style={{
												fontWeight: "bold",
												textTransform: "uppercase",
												fontSize: 14,
											}}
										>
											{device.brand}
										</Text>
										<Text
											style={{
												fontWeight: "regular",
												textTransform: "uppercase",
												fontSize: 14,
											}}
										>
											{device.modelName}
										</Text>
									</View>
								</View>
								<View
									style={{
										width: 60,
										height: 60,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										opacity: device.connected ? 1 : 0,
									}}
								>
									<BluetoothIcon />
								</View>
							</View>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									gap: 16,
									height: 36,
									marginTop: 22,
								}}
							>
								<TouchableOpacity
									onPress={() =>
										setKnownDevices(
											knownDevices.map((item) =>
												item.id === device.id
													? { ...item, gender: "men" }
													: item
											)
										)
									}
									style={{
										flex: 1,
										backgroundColor:
											device.gender === "men" ? "#2E3B48" : "#EAECEF",
										borderRadius: 10,
										height: 36,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text
										style={{
											color: device.gender === "men" ? "#EAECEF" : "#2E3B48",
											textTransform: "capitalized",
											fontWeight: "bold",
										}}
									>
										Men
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										setKnownDevices(
											knownDevices.map((item) =>
												item.id === device.id
													? { ...item, gender: "women" }
													: item
											)
										)
									}
									style={{
										flex: 1,
										backgroundColor:
											device.gender === "women" ? "#2E3B48" : "#EAECEF",
										borderRadius: 10,
										height: 36,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text
										style={{
											color: device.gender === "women" ? "#EAECEF" : "#2E3B48",
											textTransform: "capitalized",
										}}
									>
										Women
									</Text>
								</TouchableOpacity>
							</View>
							<View
								style={{
									display: "flex",
									gap: 16,
									marginTop: 36,
									flexDirection: "row",
									flexWrap: "wrap",
									justifyContent: "flex-start",
									alignItems: "center",
								}}
							>
								<TouchableOpacity
									onPress={() => {
										actionSheetRefs.current[device.id]?.hide();
										setTimeout(() => {
											setDeviceToDelete(device.id);
										}, 200);
									}}
									style={{
										flex: 1,
										padding: 18,
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										gap: 10,
										backgroundColor: "#EAECEF",
										borderRadius: 10,
									}}
								>
									<DeleteIcon />
									<Text style={{ fontSize: 13 }}>Forget this product</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										actionSheetRefs.current[device.id]?.hide();
										setTimeout(() => {
											setDeviceToRename(device.id);
										}, 200);
									}}
									style={{
										flex: 1,
										padding: 18,
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										gap: 10,
										backgroundColor: "#EAECEF",
										borderRadius: 10,
									}}
								>
									<EditIcon2 />
									<Text style={{ fontSize: 13 }}>Rename the product</Text>
								</TouchableOpacity>
							</View>
							<View
								style={{
									display: "flex",
									gap: 16,
									marginTop: 16,
									flexDirection: "row",
									flexWrap: "wrap",
									justifyContent: "flex-start",
									alignItems: "center",
								}}
							>
								<TouchableOpacity
									onPress={() => {
										Linking.openURL(device.supportLink);
									}}
									style={{
										flex: 1,
										padding: 18,
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										gap: 10,
										backgroundColor: "#EAECEF",
										borderRadius: 10,
									}}
								>
									<SupportIcon />
									<Text style={{ fontSize: 13 }}>Get support</Text>
								</TouchableOpacity>

								{/* this is a ghost child for grid look */}
								<View
									style={{
										flex: 1,
										padding: 18,
										opacity: 0,
									}}
									disabled
									accessible={false}
								></View>
							</View>
						</View>
					</ActionSheet>
				</View>
			))}
			<ScreenBackground
				width="100%"
				height="100%"
				preserveAspectRatio="none"
				style={[StyleSheet.absoluteFill, { zIndex: -2 }]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	tabsContainer: {
		height: 70,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 125,
		flexDirection: "row",
		marginTop: 16,
		marginBottom: Platform.OS === "android" ? 30 : 0,
	},
	tabLabel: {
		color: "#EAECEF",
		fontSize: 10,
		textTransform: "uppercase",
		fontFamily: "FontMedium",
		opacity: 0.7,
		marginTop: 8,
	},
	tabItemContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
	headerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 24,
		marginHorizontal: 26,
		marginTop: 16,
	},
	headerButton: {
		width: 32,
		height: 32,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default products;
