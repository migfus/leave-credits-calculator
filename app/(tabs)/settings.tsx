import { useThemeStore } from "@/store/themeStore"
import { Link } from "expo-router"
import React from "react"
import { Image, Switch, Text, TouchableOpacity, View } from "react-native"
import Svg, { Path } from "react-native-svg"

const Settings = () => {
	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()
	const toggleTheme = useThemeStore((s) => s.toggleTheme)

	if (!theme_hydrated) {
		return
	}

	return (
		<View className={theme ? "bg-neutral-950" : "bg-neutral-200"}>
			<View
				className={`${theme ? "bg-neutral-900" : "bg-neutral-100"} p-4  m-4 rounded-2xl flex flex-col justify-start gap-4`}
			>
				<View className={`flex flex-row justify-start gap-4`}>
					<Image
						style={{ width: 50, height: 50, borderRadius: 10 }}
						source={require("@/assets/images/icon.png")}
					></Image>

					<View className="grow ">
						<Text
							className={`${theme ? "text-brand-50" : "text-brand-900"} text-brand-50 text-2xl font-semibold`}
						>
							Leave Credit Balance Calculator
						</Text>
						<Text className={`${theme ? "text-brand-50" : "text-brand-900"} `}>
							v1.0.1
						</Text>
					</View>
				</View>

				<View className={`flex flex-row justify-start gap-4`}>
					{theme ? (
						<Svg width={32} height={32} viewBox="0 0 24 24" color="#fff">
							<Path
								color="#fff"
								fill="#fff"
								d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
							></Path>
						</Svg>
					) : (
						<Svg width={32} height={32} viewBox="0 0 24 24" color="#000">
							<Path
								color="#000"
								fill="#000"
								d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
							></Path>
						</Svg>
					)}

					<View className="grow flex flex-row items-center">
						<Link
							href="https://github.com/migfus/leave-balance-calculator"
							className={`${theme ? "text-brand-50" : "text-brand-900"} `}
						>
							https://github.com/migfus/leave-balance-calculator
						</Link>
					</View>
				</View>
			</View>

			<TouchableOpacity
				className={`${theme ? "bg-neutral-900" : "bg-neutral-100"} m-4 rounded-2xl p-4 `}
				onPress={toggleTheme}
			>
				<View className="flex flex-row justify-between items-center">
					<Text
						className={`${theme ? "text-neutral-50" : "text-neutral-600"} font-semibold`}
					>
						Dark Mode
					</Text>

					<Switch
						value={theme}
						onValueChange={() => toggleTheme()}
						trackColor={{ false: "#ccc", true: "#4ade80" }}
						thumbColor={theme ? "#22c55e" : "#f4f4f5"}
						style={{ height: 32, width: 32 }}
					/>
				</View>
			</TouchableOpacity>

			<View className="p-4 bg-neutral-9050 m-4 rounded-2xl h-full"></View>
		</View>
	)
}

export default Settings
