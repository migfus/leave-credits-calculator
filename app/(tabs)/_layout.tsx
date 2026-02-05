import BottomSheetModalComponent from "@/components/bottom-sheet/BottomSheetModalComponent"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import history from "./history"
import index from "./index"
import Information from "./information"
import settings from "./settings"

import ActivitySection from "@/components/others/ActivitySection"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import type { ComponentType } from "react"
import { Platform, View } from "react-native"
import { useVibrateStore } from "@/store/vibrateStore"
import {
	Clock02Icon,
	Home01Icon,
	InformationCircleIcon,
	Settings01Icon
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react-native"
import { useColorScheme } from "nativewind"

const Tab = createMaterialTopTabNavigator()

export default function Layout() {
	const $vibrate = useVibrateStore((s) => s.vibrate)
	const $hydrated = [useVibrateStore.persist.hasHydrated()]
	const { colorScheme } = useColorScheme()

	if ($hydrated.some((v) => v === false)) {
		return <ActivitySection title="Hydrating..." sub_title="(tabs)/_layout" />
	}

	return (
		<BottomSheetModalComponent>
			<SafeAreaView className="bg-neutral-200 dark:bg-neutral-950 h-full">
				<Tab.Navigator
					screenOptions={{
						tabBarIndicatorStyle: {
							backgroundColor: colorScheme === "dark" ? "#223935" : "#d8efe8",
							height: "100%",
							borderRadius: 999
						},
						tabBarIndicatorContainerStyle: {
							padding: 0
						},

						tabBarActiveTintColor:
							colorScheme === "dark" ? "#b4c5c0" : "#295049",
						tabBarInactiveTintColor:
							colorScheme === "dark" ? "#cacaca" : "#393939",
						tabBarStyle: {
							marginTop: 8,
							marginHorizontal: 12,
							borderRadius: 999,
							overflow: "hidden",
							backgroundColor: colorScheme === "dark" ? "#171717" : "#f5f5f5",
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
						size: 30,
						onTabPress: $vibrate
					})}
					{TabScreen({
						name: "History",
						component: history,
						icon: "history",
						onTabPress: $vibrate
					})}
					{TabScreen({
						name: "Information",
						component: Information,
						icon: "information",
						size: 30,
						onTabPress: $vibrate
					})}
					{TabScreen({
						name: "Settings",
						component: settings,
						icon: "cog",
						onTabPress: $vibrate
					})}
				</Tab.Navigator>

				<StatusBar style={colorScheme === "dark" ? "dark" : "light"} />
			</SafeAreaView>
		</BottomSheetModalComponent>
	)
}

interface TabScreenProps {
	name: string
	component: ComponentType<any>
	icon: "cog" | "history" | "information" | "home"
	size?: number
	padding?: number
	onTabPress: () => void
}

function TabScreen({
	name,
	component,
	icon,
	size = 28,
	padding = 16,
	onTabPress
}: TabScreenProps) {
	return (
		<Tab.Screen
			name={name}
			component={component}
			options={{
				tabBarIcon: () => (
					<View style={{ height: "100%", justifyContent: "center" }}>
						{icon === "home" ? (
							<HugeiconsIcon
								icon={Home01Icon}
								className="text-neutral-700 dark:text-neutral-100"
								strokeWidth={2}
							/>
						) : icon === "history" ? (
							<HugeiconsIcon
								icon={Clock02Icon}
								className="text-neutral-700 dark:text-neutral-100"
								strokeWidth={2}
							/>
						) : icon === "information" ? (
							<HugeiconsIcon
								icon={InformationCircleIcon}
								className="text-neutral-700 dark:text-neutral-100"
								strokeWidth={2}
							/>
						) : (
							<HugeiconsIcon
								icon={Settings01Icon}
								className="text-neutral-700 dark:text-neutral-100"
								strokeWidth={2}
							/>
						)}
					</View>
				),
				tabBarItemStyle: {
					padding: padding
				}
			}}
			listeners={{
				tabPress: () => {
					onTabPress()
				}
			}}
		/>
	)
}
