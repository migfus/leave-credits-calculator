import { Tabs } from "expo-router"
import React from "react"

import { TabIconProps } from "@/globalInterface"
import HistoryIcon from "@/icons/historyIcon"
import HomeIcon from "@/icons/homeIcon"
import SettingsIcon from "@/icons/settingsIcon"
import { Text, View } from "react-native"

const TabIcon = ({ children, title }: TabIconProps) => {
	return (
		// I cannot expand the view
		<View className="flex items-center">
			{children}
			<Text style={{ fontSize: 12, marginTop: 4 }}>{title}</Text>
		</View>
	)
}

const _Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					// width: "100%",
					// height: "100%",
					justifyContent: "center",
					alignItems: "stretch",
					flex: 1
				},
				tabBarStyle: {
					backgroundColor: "#fff",
					borderRadius: 50,
					marginHorizontal: 20,
					marginVertical: 30,
					position: "absolute",
					overflow: "hidden",
					shadowOpacity: 0.1,
					elevation: 2
				},
				tabBarIconStyle: {
					flex: 1, // IMPORTANT
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 20
				}
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					title: "Home",
					tabBarIcon: ({ focused }) => (
						<>
							<TabIcon title="Home">
								<HomeIcon
									width={25}
									height={25}
									color="#3f3f3f"
									outline={!focused}
								/>
							</TabIcon>
						</>
					)
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					headerShown: false,
					title: "History",
					tabBarIcon: ({ focused }) => (
						<>
							<TabIcon title="HIstory">
								<HistoryIcon
									width={25}
									height={25}
									color="#3f3f3f"
									outline={!focused}
								/>
							</TabIcon>
						</>
					)
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					headerShown: false,
					title: "Settings",
					tabBarIcon: ({ focused }) => (
						<>
							<TabIcon title="Settings">
								<SettingsIcon
									width={25}
									height={25}
									color="#3f3f3f"
									outline={!focused}
								/>
							</TabIcon>
						</>
					)
				}}
			/>
		</Tabs>
	)
}

export default _Layout
