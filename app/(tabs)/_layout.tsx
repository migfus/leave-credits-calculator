import HistoryIcon from "@/icons/historyIcon"
import HomeIcon from "@/icons/homeIcon"
import InformationIcon from "@/icons/informationIcon"
import SettingsIcon from "@/icons/settingsIcon"
import { useThemeStore } from "@/store/themeStore"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import * as Haptics from "expo-haptics"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { Platform, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import history from "./history"
import index from "./index"
import Information from "./information"
import settings from "./settings"
import BottomSheetModalComponent from "@/components/bottom-sheet/BottomSheetModalComponent"

const Tab = createMaterialTopTabNavigator()

const Layout = () => {
	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()

	if (!theme_hydrated) {
		return null
	}

	return (
		<BottomSheetModalComponent>
			<SafeAreaView
				className={`${theme ? "bg-neutral-900" : "bg-neutral-200"} h-full`}
			>
				<Tab.Navigator
					screenOptions={{
						tabBarIndicatorStyle: {
							backgroundColor: theme ? "#262626" : "#d8efe8",
							height: "100%",
							borderRadius: 999
						},
						tabBarIndicatorContainerStyle: {
							padding: 0
						},

						tabBarActiveTintColor: theme ? "#fafafa" : "#f3faf7",
						tabBarInactiveTintColor: theme ? "#a3a3a3" : "#737373",
						tabBarStyle: {
							marginTop: 8,
							marginHorizontal: 12,
							borderRadius: 999,
							overflow: "hidden",
							backgroundColor: theme ? "#171717" : "#f5f5f5",
							...(Platform.OS === "android"
								? { elevation: 10 }
								: {
										shadowColor: "#000",
										shadowOpacity: 0.18,
										shadowRadius: 14,
										shadowOffset: { width: 0, height: 8 }
									})
						},
						tabBarContentContainerStyle: {
							height: "100%",
							alignItems: "center"
						},
						tabBarItemStyle: {
							height: "100%",
							padding: 0,
							margin: 0,
							borderRadius: 999,
							justifyContent: "center",
							alignItems: "center"
						},
						tabBarShowIcon: true,
						tabBarShowLabel: false
					}}
				>
					<Tab.Screen
						name="Home"
						component={index}
						options={{
							tabBarIcon: () => (
								<View style={{ height: "100%", justifyContent: "center" }}>
									<HomeIcon size={30} color="#333" />
								</View>
							),
							tabBarItemStyle: {
								padding: 16
							}
						}}
						listeners={{
							tabPress: () => {
								Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
							}
						}}
					/>
					<Tab.Screen
						name="History"
						component={history}
						options={{
							tabBarIcon: () => (
								<View style={{ height: "100%", justifyContent: "center" }}>
									<HistoryIcon color="#333" size={28} />
								</View>
							),
							tabBarItemStyle: {
								padding: 16
							}
						}}
						listeners={{
							tabPress: () => {
								Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
							}
						}}
					/>

					<Tab.Screen
						name="Information"
						component={Information}
						options={{
							tabBarIcon: () => (
								<View style={{ height: "100%", justifyContent: "center" }}>
									<InformationIcon size={30} color="#333" />
								</View>
							),
							tabBarItemStyle: {
								padding: 16
							}
						}}
						listeners={{
							tabPress: () => {
								Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
							}
						}}
					/>

					<Tab.Screen
						name="Settings"
						component={settings}
						options={{
							tabBarIcon: () => (
								<View style={{ height: "100%", justifyContent: "center" }}>
									<SettingsIcon color="#333" size={28} />
								</View>
							),
							tabBarItemStyle: {
								padding: 16
							}
						}}
						listeners={{
							tabPress: () => {
								Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
							}
						}}
					/>
				</Tab.Navigator>

				<StatusBar style={theme ? "light" : "dark"} />
			</SafeAreaView>
		</BottomSheetModalComponent>
	)
}

export default Layout
