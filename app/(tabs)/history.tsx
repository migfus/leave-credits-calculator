import { LeaveBalanceHistory } from "@/globalInterface"
import FreshIcon from "@/icons/freshIcon"
import { useLeaveHistory } from "@/store/historyStore"
import { useThemeStore } from "@/store/themeStore"
import { leaveBalanceComputation, messengerStyleTime } from "@/utils"
import {
	Alert,
	FlatList,
	ScrollView,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View
} from "react-native"

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
								<View className="flex flex-row items-center">
									<Text
										numberOfLines={1}
										className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
									>{`${item.balance} `}</Text>
									<Text numberOfLines={1} className="text-neutral-400 text-xs ">
										{`bal `}
									</Text>
									<Text
										numberOfLines={1}
										className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
									>
										{`- `}
									</Text>

									<Text
										numberOfLines={1}
										className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
									>{`${item.hours} `}</Text>
									<Text numberOfLines={1} className="text-neutral-400 text-xs">
										{`hr `}
									</Text>
									<Text
										numberOfLines={1}
										className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
									>{`${item.minutes} `}</Text>
									<Text numberOfLines={1} className="text-neutral-400 text-xs">
										{`min `}
									</Text>

									<Text
										numberOfLines={1}
										className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
									>
										{`= `}
									</Text>
								</View>

								<View className="flex flex-row">
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

export default function Index() {
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
		Alert.alert("Clear History", "Do you want to continue?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "OK",
				onPress: () => {
					ToastAndroid.show("History Cleared", ToastAndroid.SHORT)
					resetHistory()
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
