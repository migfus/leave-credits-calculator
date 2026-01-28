import BottomSheetModalComponent from "@/components/bottom-sheet/BottomSheetModalComponent"
import HistoryIcon from "@/icons/historyIcon"
import HomeIcon from "@/icons/homeIcon"
import InformationIcon from "@/icons/informationIcon"
import SettingsIcon from "@/icons/settingsIcon"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import history from "./history"
import index from "./index"
import Information from "./information"
import settings from "./settings"

import ActivitySection from "@/components/others/ActivitySection"
import { useThemeStore } from "@/store/themeStore"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import type { ComponentType } from "react"
import { Platform, View } from "react-native"
import { useVibrateStore } from "@/store/vibrateStore"

const Tab = createMaterialTopTabNavigator()

const Layout = () => {
	const $theme = useThemeStore((s) => s.theme)
	const $themeHydrated = useThemeStore.persist.hasHydrated()

	if (!$themeHydrated) {
		return <ActivitySection title="Hydrating..." sub_title="(tabs)/_layout" />
	}

	return (
		<BottomSheetModalComponent>
			<SafeAreaView
				className={`${$theme ? "bg-neutral-950" : "bg-neutral-200"} h-full`}
			>
				<Tab.Navigator
					screenOptions={{
						tabBarIndicatorStyle: {
							backgroundColor: $theme ? "#223935" : "#d8efe8",
							height: "100%",
							borderRadius: 999
						},
						tabBarIndicatorContainerStyle: {
							padding: 0
						},

						tabBarActiveTintColor: $theme ? "#b4c5c0" : "#295049",
						tabBarInactiveTintColor: $theme ? "#cacaca" : "#393939",
						tabBarStyle: {
							marginTop: 8,
							marginHorizontal: 12,
							borderRadius: 999,
							overflow: "hidden",
							backgroundColor: $theme ? "#171717" : "#f5f5f5",
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
					{TabScreen({
						name: "Home",
						component: index,
						icon: "home",
						size: 30
					})}
					{TabScreen({ name: "History", component: history, icon: "history" })}
					{TabScreen({
						name: "Information",
						component: Information,
						icon: "information",
						size: 30
					})}
					{TabScreen({ name: "Settings", component: settings, icon: "cog" })}
				</Tab.Navigator>

				<StatusBar style={$theme ? "light" : "dark"} />
			</SafeAreaView>
		</BottomSheetModalComponent>
	)
}

export default Layout

interface TabScreenProps {
	name: string
	component: ComponentType<any>
	icon: "cog" | "history" | "information" | "home"
	size?: number
	padding?: number
}

function TabScreen({
	name,
	component,
	icon,
	size = 28,
	padding = 16
}: TabScreenProps) {
	const $vibrate = useVibrateStore((s) => s.vibrate)
	const $vibrateHydrated = useVibrateStore.persist.hasHydrated()

	if (!$vibrateHydrated) {
		return (
			<ActivitySection
				title="Hydrating..."
				sub_title="(tabs)/_layout/TabScreen"
			/>
		)
	}

	return (
		<Tab.Screen
			name={name}
			component={component}
			options={{
				tabBarIcon: ({ color }) => (
					<View style={{ height: "100%", justifyContent: "center" }}>
						{icon === "home" ? (
							<HomeIcon color={color} size={size} />
						) : icon === "history" ? (
							<HistoryIcon color={color} size={size} />
						) : icon === "information" ? (
							<InformationIcon color={color} size={size} />
						) : (
							<SettingsIcon color={color} size={size} />
						)}
					</View>
				),
				tabBarItemStyle: {
					padding: padding
				}
			}}
			listeners={{
				tabPress: () => {
					$vibrate()
				}
			}}
		/>
	)
}
