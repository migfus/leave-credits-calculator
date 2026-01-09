import { LeaveBalanceHistory } from "@/globalInterface"
import { useLeaveHistory } from "@/store/historyStore"
import { useThemeStore } from "@/store/themeStore"
import { leaveBalanceComputation } from "@/utils"
import React from "react"
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from "react-native"

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
				className={`${theme ? "bg-neutral-900" : "bg-neutral-100"} px-4 pt-4 flex justify-between flex-row p-4 rounded-2xl`}
			>
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
					contentContainerStyle={{ gap: 8 }}
					renderItem={({ item }) => (
						<View
							className={`${theme ? "bg-neutral-900" : "bg-neutral-100"} flex flex-row justify-end p-4 rounded-2xl`}
						>
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
		return null // or splash screen
	}

	return (
		<ScrollView
			className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex-1 gap-4 p-4`}
		>
			<HistoryCard
				history={history}
				onPress={() => resetHistory()}
				theme={theme}
			/>
		</ScrollView>
	)
}
