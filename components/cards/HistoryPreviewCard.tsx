import { LeaveBalanceHistory } from "@/globalInterface"
import HistoryIcon from "@/icons/historyIcon"
import { leaveBalanceComputation, messengerStyleTime } from "@/utils"
import React, { useEffect, useRef } from "react"
import { FlatList, Text, View } from "react-native"

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
			className={`${theme ? "bg-neutral-900" : "bg-neutral-50"} rounded-2xl flex flex-1`}
		>
			<View className="px-4 pt-4 rounded-2xl flex justify-between flex-row">
				<View className="flex flex-row gap-2 items-center">
					<HistoryIcon theme={theme} width={16} height={16} />
					<Text
						className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
					>
						History
					</Text>
				</View>

				<Text
					className={`${theme ? "text-neutral-200" : "text-neutral-600"} text-sm`}
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
					renderItem={({ item }) => (
						<View className="flex flex-row justify-between">
							<Text
								className={`${theme ? "text-neutral-500" : "text-neutral-600"} text-xs`}
							>
								{messengerStyleTime(item.timeStamps)}
							</Text>
							<View className="flex flex-row justify-end gap-4">
								<View className="flex flex-row items-end gap-1">
									<View className="flex flex-row items-end gap-1">
										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-lg font-semibold`}
										>
											{`${item.balance} `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-700"} text-md`}
										>
											{`old bal `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-lg font-semibold`}
										>
											{`- `}
										</Text>
									</View>

									<View className="flex flex-row items-end gap-1 min-w-[8rem] justify-end">
										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-lg font-semibold`}
										>
											{`${item.hours} `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-md `}
										>
											{`hr `}
										</Text>
										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-lg font-semibold`}
										>
											{`${item.minutes} `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-md`}
										>
											{`min `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-300" : "text-neutral-800"} text-lg font-semibold`}
										>
											{`= `}
										</Text>
									</View>
								</View>

								<View className="flex flex-row min-w-[6rem] justify-end">
									<Text
										numberOfLines={1}
										className={`${theme ? "text-neutral-200" : "text-neutral-800"} font-semibold text-right text-xl`}
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
