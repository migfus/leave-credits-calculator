import React from "react"

import HistoryIcon from "@/icons/historyIcon"
import HomeIcon from "@/icons/homeIcon"
import SettingsIcon from "@/icons/settingsIcon"
import { useThemeStore } from "@/store/themeStore"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import history from "./history"
import index from "./index"
import settings from "./settings"
import * as Haptics from "expo-haptics"

const Tab = createMaterialTopTabNavigator()

const Layout = () => {
	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()

	if (!theme_hydrated) {
		return null
	}

	return (
		<SafeAreaView
			className={`${theme ? "bg-neutral-900" : "bg-neutral-100"} h-full `}
		>
			<Tab.Navigator
				screenOptions={{
					tabBarIndicatorStyle: { backgroundColor: "#80c8b7" },
					tabBarActiveTintColor: theme ? "#fafafa" : "#0a0a0a",
					tabBarInactiveTintColor: theme ? "#a3a3a3" : "#737373",
					tabBarStyle: {
						backgroundColor: theme ? "#171717" : "#f5f5f5",
						paddingVertical: 2
					},
					tabBarShowIcon: true,
					tabBarShowLabel: false
				}}
			>
				<Tab.Screen
					name="Home"
					component={index}
					options={{
						tabBarIcon: () => <HomeIcon width={30} height={30} theme={theme} />
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
							<HistoryIcon theme={theme} width={28} height={28} />
						)
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
							<SettingsIcon theme={theme} width={28} height={28} />
						)
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
	)
}

export default Layout
