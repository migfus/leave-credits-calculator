import FreshIcon from "@/icons/freshIcon"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

import { LeaveBalanceHistory } from "@/globalInterface"
import { useLeaveHistory } from "@/store/historyStore"
import { useThemeStore } from "@/store/themeStore"
import { leaveBalanceComputation, messengerStyleTime } from "@/utils"
import useBottomSheetStore from "@/store/bottomSheetStore"
import moment from "moment"
import React, { useMemo, useState } from "react"
import { useVibrateStore } from "@/store/vibrateStore"
import ActivitySection from "@/components/others/ActivitySection"

const HistoryCard = ({
	history,
	onPress,
	theme
}: {
	history: LeaveBalanceHistory[]
	onPress: () => void
	theme: boolean
}) => {
	const filters = ["All", "Today", "This Week", "This Month", "This Year"]
	const [selected_filter, setSelectedFilter] = useState("All")

	const $changeListStore = useBottomSheetStore((s) => s.changeList)
	const $vibrate = useVibrateStore((s) => s.vibrate)

	const $hydrated = [useVibrateStore.persist.hasHydrated()]

	const newestFirstHistory = useMemo(() => {
		const now = moment()
		const filtered = history.filter((item) => {
			const date = moment(item.timeStamps)
			if (!date.isValid()) return false

			switch (selected_filter) {
				case "Today":
					return now.isSame(date, "day")
				case "This Week":
					return now.isSame(date, "week")
				case "This Month":
					return now.isSame(date, "month")
				case "This Year":
					return now.isSame(date, "year")
				case "All":
				default:
					return true
			}
		})

		return [...filtered].reverse()
	}, [history, selected_filter])

	if ($hydrated.some((v) => v === false)) {
		return (
			<ActivitySection
				title="Hydrating..."
				sub_title="(tabs)/history/HistoryCard"
			/>
		)
	}

	return (
		<View className="flex flex-1 gap-2">
			{history.length > 0 ? (
				<TouchableOpacity
					onPress={onPress}
					className={`${theme ? "bg-neutral-900" : "bg-neutral-50"} px-4 pt-4 flex justify-between items-center flex-row p-4 rounded-full`}
				>
					<FreshIcon color={theme ? "#898989" : "#484848"} />
					<Text
						className={`${theme ? "text-neutral-300" : "text-neutral-600"}`}
					>
						Clear History
					</Text>

					<Text
						className={`${theme ? "text-neutral-400 bg-neutral-700" : "text-neutral-600 bg-neutral-200"} px-2 rounded-full  text-sm`}
					>
						{history.length}
					</Text>
				</TouchableOpacity>
			) : (
				<></>
			)}

			<View className="">
				<FlatList
					data={filters}
					keyExtractor={(item) => item}
					scrollEnabled={true}
					contentContainerStyle={{ gap: 8, paddingBottom: 0 }}
					horizontal
					renderItem={({ item }) =>
						selected_filter === item ? (
							<View
								className={`${theme ? "bg-brand-900" : "bg-brand-200"} "flex flex-row justify-between py-2 px-4 rounded-full`}
							>
								<Text
									className={`${theme ? "text-brand-100" : "text-brand-700"} text-md font-semibold`}
								>
									{item}
								</Text>
							</View>
						) : (
							<TouchableOpacity
								onPress={() => {
									setSelectedFilter(item)
									$vibrate()
								}}
								className={`${theme ? "bg-neutral-900" : "bg-white"} "flex flex-row justify-between py-2 px-4 rounded-full`}
							>
								<Text
									className={`${theme ? "text-neutral-400" : "text-neutral-600"} text-md font-semibold`}
								>
									{item}
								</Text>
							</TouchableOpacity>
						)
					}
				></FlatList>
				{newestFirstHistory.length === 0 && (
					<View
						className={`${theme ? "bg-neutral-900" : "bg-white"} flex flex-col items-center justify-center  rounded-full p-6 mt-8`}
					>
						<Text
							className={`${theme ? "text-neutral-400" : "text-neutral-600"} text-center `}
						>
							Empty
						</Text>
					</View>
				)}
			</View>

			{/* SECTION: CONTENTS */}
			<View className="mt-4 grow">
				<FlatList
					data={newestFirstHistory}
					keyExtractor={(item) => item.timeStamps}
					scrollEnabled={true}
					contentContainerStyle={{ gap: 8 }}
					renderItem={({ item, index }) => {
						const computed = leaveBalanceComputation({
							balance: item.balance,
							hours: item.hours,
							minutes: item.minutes,
							method: "CSC Leave Credits Rule"
						})

						return (
							<TouchableOpacity
								onPress={() =>
									$changeListStore([
										{
											name: computed[1],
											link: computed[1],
											type: "copy",
											callback: () => {}
										},
										{
											name: `-${computed[0]}`,
											link: `-${computed[0]}`,
											type: "copy",
											callback: () => {}
										}
									])
								}
								className={`${theme ? "bg-neutral-900" : "bg-white"} ${index === 0 ? "rounded-t-3xl" : "rounded-t-xl"} ${index === newestFirstHistory.length - 1 ? "rounded-b-3xl" : "rounded-b-xl"} flex flex-row justify-between  p-4 rounded-3xl`}
							>
								<Text
									className={`${theme ? "text-neutral-400" : "text-neutral-600"} text-xs`}
								>
									{messengerStyleTime(item.timeStamps)}
								</Text>

								<View className={`flex flex-col gap-2`}>
									<View className="flex flex-row items-end justify-end gap-1 ">
										<View className="flex flex-row items-end gap-1 justify-end ">
											<Text
												numberOfLines={1}
												className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-md font-semibold`}
											>
												{`${item.balance}`}
											</Text>

											<Text
												numberOfLines={1}
												className={`${theme ? "text-neutral-400" : "text-neutral-700"} text-sm`}
											>
												{`old bal `}
											</Text>

											<Text
												numberOfLines={1}
												className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-md font-semibold`}
											>
												{`-`}
											</Text>

											<Text
												numberOfLines={1}
												className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-md font-semibold`}
											>
												{`${item.hours}`}
											</Text>

											<Text
												numberOfLines={1}
												className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-sm`}
											>
												{`hr `}
											</Text>
											<Text
												numberOfLines={1}
												className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-md font-semibold`}
											>
												{`${item.minutes}`}
											</Text>

											<Text
												numberOfLines={1}
												className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-sm`}
											>
												{`min `}
											</Text>

											<Text
												numberOfLines={1}
												className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-md font-semibold`}
											>
												{`= `}
											</Text>
										</View>
									</View>

									<View className="flex flex-row justify-end gap-2 items-center">
										<Text
											numberOfLines={1}
											className={`${theme ? "bg-red-900 text-red-100" : "bg-red-100 text-red-700"} text-xl font-semibold rounded-full px-4 py-1`}
										>{`-${computed[0]} `}</Text>
										<Text
											numberOfLines={1}
											className={`${theme ? "bg-brand-900 text-brand-50" : "bg-brand-100 text-brand-700"} text-2xl font-semibold rounded-full px-4 py-1`}
										>{`${computed[1]} `}</Text>
									</View>
								</View>
							</TouchableOpacity>
						)
					}}
				></FlatList>
			</View>
		</View>
	)
}

export default function History() {
	const $history = useLeaveHistory((s) => s.history)
	const $resetHistory = useLeaveHistory((s) => s.reset)

	const theme = useThemeStore((s) => s.theme)
	const $changeList = useBottomSheetStore((s) => s.changeList)
	const $hydrated = [
		useThemeStore.persist.hasHydrated(),
		useLeaveHistory.persist.hasHydrated()
	]

	function clearHistory() {
		$resetHistory()
	}

	if ($hydrated.some((v) => v === false)) {
		return <ActivitySection title="Hydrating..." sub_title="(tabs)/history" />
	}

	return (
		<View
			className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex-1 gap-4 p-4`}
		>
			<HistoryCard
				history={$history}
				onPress={() =>
					$changeList([
						{
							name: "Clear History",
							link: "",
							type: "check",
							active: false,
							callback: () => {
								clearHistory()
								$changeList([])
							}
						}
					])
				}
				theme={theme}
			/>
		</View>
	)
}
