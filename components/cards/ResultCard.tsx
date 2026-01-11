import { leaveBalanceComputation } from "@/utils"
import React from "react"
import { Text, View } from "react-native"

const ResultCard = ({
	balance,
	hours,
	minutes,
	theme = false
}: {
	balance: string
	hours: string
	minutes: string
	theme?: boolean
}) => {
	const result = { balance, hours, minutes }
	return (
		<View className=" rounded-2xl flex flex-col justify-between p-2 flex-none">
			<Text className={`${theme ? "text-neutral-50" : "text-neutral-600"}`}>
				Result
			</Text>
			<View className="flex flex-row justify-end items-end">
				{leaveBalanceComputation(result)[0] ? (
					<Text
						numberOfLines={1}
						className="text-right text-red-700 text-xl font-bold "
					>
						{`-${leaveBalanceComputation(result)[0]}   `}
					</Text>
				) : (
					<></>
				)}

				<Text
					numberOfLines={1}
					className={`${theme ? "text-neutral-50" : "text-neutral-700"} text-right text-4xl font-bold`}
				>
					{`${leaveBalanceComputation(result)[1]} `}
				</Text>
				<Text
					numberOfLines={1}
					className={`${theme ? "text-neutral-50" : "text-neutral-700"} text-right text-md`}
				>
					bal
				</Text>
			</View>
		</View>
	)
}
export default ResultCard
