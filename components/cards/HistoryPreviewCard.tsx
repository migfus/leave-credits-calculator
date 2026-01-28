import HistoryIcon from "@/icons/historyIcon"
import { FlatList, Text, View } from "react-native"

import { LeaveBalanceHistory } from "@/globalInterface"
import { leaveBalanceComputation, messengerStyleTime } from "@/utils"
import React, { useEffect, useRef } from "react"

const HistoryPreviewCard = ({
	history,
	theme
}: {
	history: LeaveBalanceHistory[]
	theme: boolean
}) => {
	const flatListRef = useRef<FlatList>(null)

	// Auto-scroll to bottom when history updates
	useEffect(() => {
		if (history.length > 0) {
			flatListRef.current?.scrollToEnd({ animated: true })
		}
	}, [history])

	return (
		<View
			className={`${theme ? "bg-neutral-900" : "bg-neutral-50"} rounded-3xl flex flex-1 p-1`}
		>
			<View className="p-4 rounded-2xl flex justify-between flex-row items-center ">
				<View className="flex flex-row gap-2 items-center">
					<HistoryIcon size={18} color={theme ? "#898989" : "#484848"} />
					<Text
						className={`${theme ? "text-neutral-400 " : "text-neutral-600"}`}
					>
						History
					</Text>
				</View>

				<Text
					className={`${theme ? "text-neutral-200 bg-neutral-800" : "text-neutral-600 bg-neutral-200"}  px-2 rounded-full py-1 text-xs`}
				>
					{history.length}
				</Text>
			</View>

			<View className="p-4 overflow-y-auto flex-1">
				<FlatList
					ref={flatListRef}
					data={history}
					keyExtractor={(item) => item.timeStamps}
					scrollEnabled={true}
					contentContainerStyle={{ gap: 8 }}
					renderItem={({ item }) => (
						<View className="flex flex-row justify-between items-center">
							<Text
								className={`${theme ? "text-neutral-500" : "text-neutral-600"} text-xs`}
							>
								{messengerStyleTime(item.timeStamps)}
							</Text>
							<View className="flex flex-row justify-end gap-4 items-center">
								<View className="flex flex-row items-end gap-1">
									<View className="flex flex-row items-end gap-1 min-w-[8rem] justify-end">
										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-md font-semibold`}
										>
											{`${item.balance} `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-400" : "text-neutral-700"} text-xs`}
										>
											{`old bal `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-md font-semibold`}
										>
											{`- `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-md font-semibold`}
										>
											{`${item.hours}`}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-xs `}
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
											className={`${theme ? "text-neutral-400" : "text-neutral-800"} text-xs`}
										>
											{`min `}
										</Text>
									</View>
								</View>

								<View className="flex flex-row min-w-[6rem] justify-end">
									<Text
										numberOfLines={1}
										className={`${theme ? "text-brand-100 bg-brand-900" : "text-brand-800 bg-brand-100"} font-semibold text-right text-xl px-2 py-1 rounded-full`}
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

export default HistoryPreviewCard
