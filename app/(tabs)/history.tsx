import { LeaveBalanceHistory } from "@/globalInterface"
import FreshIcon from "@/icons/freshIcon"
import { useLeaveHistory } from "@/store/historyStore"
import { useThemeStore } from "@/store/themeStore"
import { leaveBalanceComputation, messengerStyleTime } from "@/utils"
import {
	Alert,
	FlatList,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View
} from "react-native"
import * as Haptics from "expo-haptics"

import React from "react"

const HistoryCard = ({
	history,
	onPress,
	theme
}: {
	history: LeaveBalanceHistory[]
	onPress: () => void
	theme: boolean
}) => {
	return (
		<View className="flex flex-1">
			<TouchableOpacity
				onPress={onPress}
				className={`${theme ? "bg-neutral-900" : "bg-neutral-100"} px-4 pt-4 flex justify-between items-center flex-row p-4 rounded-2xl`}
			>
				<FreshIcon theme={theme} />
				<Text className={`${theme ? "text-neutral-100" : "text-neutral-600"}`}>
					Clear History
				</Text>
				<Text className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}>
					{history.length}
				</Text>
			</TouchableOpacity>
			<View className="mt-4 flex-1">
				<FlatList
					data={history}
					keyExtractor={(item) => item.timeStamps}
					scrollEnabled={true}
					inverted={true}
					contentContainerStyle={{ gap: 8 }}
					renderItem={({ item }) => (
						<View
							className={`${theme ? "bg-neutral-900" : "bg-neutral-100"} "flex flex-row justify-between  p-4 rounded-2xl`}
						>
							<Text
								className={`${theme ? "text-neutral-500" : "text-neutral-600"} text-xs`}
							>
								{messengerStyleTime(item.timeStamps)}
							</Text>

							<View className={`flex flex-row justify-end`}>
								<View className="flex flex-row items-end gap-1">
									<View className="flex flex-row items-end gap-1">
										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-2xl font-semibold`}
										>
											{`${item.balance} `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-700"} text-lg`}
										>
											{`old bal `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-2xl font-semibold`}
										>
											{`- `}
										</Text>
									</View>

									<View className="flex flex-row items-end gap-1 w-[8rem] justify-end">
										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-2xl font-semibold`}
										>
											{`${item.hours} `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-lg `}
										>
											{`hr `}
										</Text>
										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-2xl font-semibold`}
										>
											{`${item.minutes} `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-lg`}
										>
											{`min `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-300" : "text-neutral-800"} text-2xl font-semibold`}
										>
											{`= `}
										</Text>
									</View>
								</View>

								<View className="flex flex-row w-[9rem] justify-end">
									<Text
										numberOfLines={1}
										className={`${theme ? "text-neutral-200" : "text-neutral-600"} text-4xl font-semibold`}
									>{`${leaveBalanceComputation(item)[1]} `}</Text>
								</View>
							</View>
						</View>
					)}
				></FlatList>
			</View>
		</View>
	)
}

export default function History() {
	const history = useLeaveHistory((s) => s.history)
	const hydrated = useLeaveHistory.persist.hasHydrated()
	const resetHistory = useLeaveHistory((s) => s.reset)

	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()

	if (!theme_hydrated) {
		return
	}

	if (!hydrated) {
		return null
	}

	function reset() {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

		console.log("resetting history")

		// React Native Web: use browser confirm/alert
		const isWeb =
			typeof window !== "undefined" && typeof window.confirm === "function"

		if (isWeb) {
			const ok = window.confirm("Clear History\n\nDo you want to continue?")
			if (!ok) return

			resetHistory()
			if (typeof window.alert === "function") {
				window.alert("History Cleared")
			}
			return
		}

		// Native: use RN Alert + ToastAndroid
		Alert.alert("Clear History", "Do you want to continue?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "OK",
				onPress: () => {
					ToastAndroid.show("History Cleared", ToastAndroid.SHORT)
					resetHistory()

					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
				}
			}
		])
	}

	return (
		<View
			className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex-1 gap-4 p-4`}
		>
			<HistoryCard
				history={history}
				onPress={() => {
					reset()
				}}
				theme={theme}
			/>
		</View>
	)
}
