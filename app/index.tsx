"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { brandsData } from "./utils/brandsData";

const products = () => {
	const { i18n, t } = useTranslation();
	const locale = i18n.language;
	const actionSheetRefs = useRef({});
	const swipeListViewRef = useRef(null);
	const [productToRename, setProductToRename] = useState(null);
	const [productToDelete, setProductToDelete] = useState(null);
	const [newProductName, setNewProductName] = useState("");
	const [knownDevices, setKnownDevices] = useState([]);

	const handleRenameDevice = (deviceIndex: number | null, newName: string) => {
		if (deviceIndex === null) return;

		setKnownDevices((prev) => {
			const updated = prev.map((device, i) => {
				if (i === deviceIndex) {
					brandsData[device.brandId].products[device.productId].name = newName;
					return { ...device };
				}
				return device;
			});

			AsyncStorage.setItem("@knownDevices", JSON.stringify(updated)).catch(
				(err) => console.error("Failed to save renamed device:", err)
			);

			return updated;
		});

		setProductToRename(null);
	};

	const handleDeleteDevice = async (index: number | null) => {
		if (index === null) return;

		setKnownDevices((prev) => {
			const updated = prev.filter((_, i) => i !== index);

			AsyncStorage.setItem("@knownDevices", JSON.stringify(updated)).catch(
				(err) => console.error("Failed to delete device:", err)
			);

			return updated;
		});

		setProductToDelete(null);
	};

	useEffect(() => {
		// clearAsync();

		const loadKnownDevices = async () => {
			try {
				const storedDevices = await AsyncStorage.getItem("@knownDevices");
				const devicesArray = storedDevices ? JSON.parse(storedDevices) : [];
				setKnownDevices(devicesArray);

				// Navigate to onboarding if empty
				if (devicesArray.length === 0) {
					router.push(`/onboarding?devicesCount=${devicesArray.length}`);
				}
			} catch (error) {
				console.error("Failed to load devices:", error);
			}
		};

		loadKnownDevices();
	}, [knownDevices.length]);

	const clearAsync = async (index) => {
		try {
			const stored = await AsyncStorage.getItem("@knownDevices");
			if (!stored) return;

			const devices = JSON.parse(stored);
			devices.splice(index, 1); // remove the device at the given index

			await AsyncStorage.setItem("@knownDevices", JSON.stringify(devices));
			console.log("Device deleted successfully");
		} catch (error) {
			console.error("Failed to delete device:", error);
		}
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
				<Dialog.Container
					visible={productToRename !== null && productToRename !== undefined}
				>
					<Dialog.Title>{t("renameGarment.title")}</Dialog.Title>
					<Dialog.Description>{t("renameGarment.p")}</Dialog.Description>
					<Dialog.Input
						placeholder={
							brandsData[knownDevices[productToRename]?.brandId]?.products?.[
								knownDevices[productToRename]?.productId
							]?.name
						}
						onChangeText={setNewProductName}
						value={newProductName}
						style={{ color: "black" }}
					/>
					<Dialog.Button
						label={t("cancel")}
						onPress={() => {
							setProductToRename(null);
							setNewProductName("");
						}}
					/>
					<Dialog.Button
						label={t("save")}
						onPress={() => handleRenameDevice(productToRename, newProductName)}
					/>
				</Dialog.Container>
				<Dialog.Container
					visible={productToDelete !== null && productToDelete !== undefined}
				>
					<Dialog.Title>
						{t("deleteGarment.title", {
							productName:
								brandsData[knownDevices[productToDelete]?.brandId]?.products?.[
									knownDevices[productToDelete]?.productId
								]?.name,
						})}
					</Dialog.Title>
					<Dialog.Description>{t("deleteGarment.p")}</Dialog.Description>
					<Dialog.Button
						label="Cancel"
						onPress={() => {
							setProductToDelete(null);
						}}
					/>
					<Dialog.Button
						label="Delete"
						onPress={() => handleDeleteDevice(productToDelete)}
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
					keyExtractor={(item, index) => index}
					renderItem={(rowData, rowMap) => (
						<Pressable
							onPress={() => {
								rowData.item.connected &&
									router.push(
										`/device/${rowData.item.id}?` +
											`modelName=${encodeURIComponent(
												brandsData[rowData.item.brandId].products[
													rowData.item.productId
												].name
											)}&` +
											`gender=${rowData.item.gender}&` +
											`productImageUrl=${encodeURIComponent(
												brandsData[rowData.item.brandId].products[
													rowData.item.productId
												].productImageUrl[rowData.item.gender]
											)}&` +
											`headerImageUrl=${encodeURIComponent(
												brandsData[rowData.item.brandId].products[
													rowData.item.productId
												].headerImageUrl[rowData.item.gender]
											)}&` +
											`brand=${encodeURIComponent(
												brandsData[rowData.item.brandId].name
											)}`
									);
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
										brandsData[rowData.item.brandId]?.products?.[
											rowData.item.productId
										]?.productImageUrl?.[rowData.item.gender]
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
										{rowData.item.newProductName
											? rowData.item.newProductName
											: brandsData[rowData.item.brandId]?.name}
									</Text>
									<Text
										style={{
											fontWeight: "regular",
											textTransform: "uppercase",
											fontSize: 12,
										}}
									>
										{
											brandsData[rowData.item.brandId]?.products?.[
												rowData.item.productId
											]?.name
										}
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
									actionSheetRefs.current[rowData.index]?.show();
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
						<Text style={styles.tabLabel}>{t("products")}</Text>
					</View>
					<Pressable onPress={() => {}} style={styles.tabItemContainer}>
						<SettingsIcon />
						<Text style={styles.tabLabel}>{t("settings")}</Text>
					</Pressable>
				</View>
			</SafeAreaView>
			{knownDevices.map((device, index) => (
				<View key={index}>
					<ActionSheet
						ref={(ref) => (actionSheetRefs.current[index] = ref)}
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
											device.gender &&
											brandsData[device.brandId]?.products?.[device.productId]
												?.productImageUrl?.[device.gender]
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
											{brandsData[device.brandId]?.name}
										</Text>
										<Text
											style={{
												fontWeight: "regular",
												textTransform: "uppercase",
												fontSize: 14,
											}}
										>
											{
												brandsData[device.brandId]?.products?.[device.productId]
													?.name
											}
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
									onPress={() => {
										setKnownDevices((prev) => {
											const updated = prev.map((item) =>
												item.brandId === device.brandId &&
												item.productId === device.productId
													? { ...item, gender: "men" }
													: item
											);

											AsyncStorage.setItem(
												"@knownDevices",
												JSON.stringify(updated)
											).catch((err) =>
												console.error("Failed to update gender:", err)
											);

											return updated;
										});
									}}
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
									onPress={() => {
										setKnownDevices((prev) => {
											const updated = prev.map((item) =>
												item.brandId === device.brandId &&
												item.productId === device.productId
													? { ...item, gender: "women" }
													: item
											);

											AsyncStorage.setItem(
												"@knownDevices",
												JSON.stringify(updated)
											).catch((err) =>
												console.error("Failed to update gender:", err)
											);

											return updated;
										});
									}}
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
										actionSheetRefs.current[index]?.hide();
										setTimeout(() => {
											setProductToDelete(index);
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
										actionSheetRefs.current[index]?.hide();
										setTimeout(() => {
											setProductToRename(index);
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
									onPress={() =>
										Linking.openURL(
											brandsData[device.brandId]?.supportLink ?? ""
										)
									}
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
