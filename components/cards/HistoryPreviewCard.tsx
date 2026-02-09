import { FlatList, Text, TouchableOpacity, View } from "react-native"

import { LeaveBalanceHistory } from "@/globalInterface"
import { leaveBalanceComputation, messengerStyleTime } from "@/utils"
import React, { useEffect, useRef } from "react"
import { HugeiconsIcon } from "@hugeicons/react-native"
import { Clock03Icon } from "@hugeicons/core-free-icons"
import { router } from "expo-router"

export default function HistoryPreviewCard({
	history
}: {
	history: LeaveBalanceHistory[]
}) {
	const flatListRef = useRef<FlatList>(null)

	// Auto-scroll to bottom when history updates
	useEffect(() => {
		if (history.length > 0) {
			flatListRef.current?.scrollToEnd({ animated: true })
		}
	}, [history])

	return (
		<View className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl flex flex-1 p-1">
			<TouchableOpacity
				onPress={() => router.push("/history")}
				className="p-4 rounded-2xl flex justify-between flex-row items-center"
			>
				<View className="flex flex-row gap-2 items-center">
					<HugeiconsIcon
						icon={Clock03Icon}
						strokeWidth={2}
						className="text-neutral-600 dark:text-neutral-400 size-5"
					/>
					<Text className="text-neutral-600 dark:text-neutral-400 text-sm">
						History
					</Text>
				</View>

				<Text className="text-neutral-600 bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-700 px-2 rounded-full py-1 text-xs">
					{history.length}
				</Text>
			</TouchableOpacity>

			<View className="p-4 overflow-y-auto flex-1">
				<FlatList
					ref={flatListRef}
					data={history}
					keyExtractor={(item) => item.timeStamps}
					scrollEnabled={true}
					contentContainerStyle={{ gap: 8 }}
					renderItem={({ item }) => (
						<View className="flex flex-row justify-between items-center">
							<Text className="text-neutral-600 dark:text-neutral-500 text-xs">
								{messengerStyleTime(item.timeStamps)}
							</Text>
							<View className="flex flex-row justify-end gap-4 items-center">
								<View className="flex flex-row items-end gap-1">
									<View className="flex flex-row items-end gap-1 min-w-[8rem] justify-end">
										<Text
											numberOfLines={1}
											className="text-neutral-800 dark:text-neutral-400 text-md font-semibold"
										>
											{`${item.balance} `}
										</Text>

										<Text
											numberOfLines={1}
											className="text-neutral-700 dark:text-neutral-400 text-xs"
										>
											{`old bal `}
										</Text>

										<Text
											numberOfLines={1}
											className="text-neutral-800 dark:text-neutral-400 text-md font-semibold"
										>
											{`- `}
										</Text>

										<Text
											numberOfLines={1}
											className="text-neutral-800 dark:text-neutral-400 text-md font-semibold"
										>
											{`${item.hours}`}
										</Text>

										<Text
											numberOfLines={1}
											className="text-neutral-800 dark:text-neutral-400 text-xs"
										>
											{`hr `}
										</Text>
										<Text
											numberOfLines={1}
											className="text-neutral-800 dark:text-neutral-400 text-md font-semibold"
										>
											{`${item.minutes}`}
										</Text>

										<Text
											numberOfLines={1}
											className="text-neutral-800 dark:text-neutral-400 text-xs"
										>
											{`min `}
										</Text>
									</View>
								</View>

								<View className="flex flex-row min-w-[6rem] justify-end">
									<Text
										numberOfLines={1}
										className="text-brand-800 bg-brand-100 dark:text-brand-100 dark:bg-brand-900 font-semibold text-right text-xl px-2 py-1 rounded-full"
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
