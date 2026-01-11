import React from "react"

import { useThemeStore } from "@/store/themeStore"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import History from "./History"
import Index from "./Index"
import Settings from "./Settings"

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
					tabBarLabelStyle: {
						fontSize: 12,
						color: theme ? "#fafafa" : "#0a0a0a"
					},
					tabBarStyle: {
						backgroundColor: theme ? "#171717" : "#f5f5f5"
					}
				}}
			>
				<Tab.Screen name="Home" component={Index} />
				<Tab.Screen name="History" component={History} />
				<Tab.Screen name="Settings" component={Settings} />
			</Tab.Navigator>

			<StatusBar style={theme ? "light" : "dark"} />
		</SafeAreaView>
	)
}

export default Layout
