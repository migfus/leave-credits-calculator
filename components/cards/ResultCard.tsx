import { Text, TouchableOpacity, View, TextProps } from "react-native"

import useBottomSheetStore from "@/store/bottomSheetStore"
import useComputationMethodStore from "@/store/computationMethodStore"
import { leaveBalanceComputation } from "@/utils"
import React, { useEffect, useRef } from "react"
import { MotiView } from "moti"

interface ResultCardProps {
	balance: string
	hours: string
	minutes: string
	fontSize?: number
}

const numbersToNice = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const _stagger = 50

export default function ResultCard({
	balance,
	hours,
	minutes,
	fontSize = 20
}: ResultCardProps) {
	const $method = useComputationMethodStore((s) => s.method)

	const result = { balance, hours, minutes, method: $method }
	const new_balance = leaveBalanceComputation(result)
	// const new_balance_dummy = 12345
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const $changeListStore = useBottomSheetStore((s) => s.changeList)

	const new_balance_is_negative = new_balance[1].startsWith("-")
	const absBalance = new_balance_is_negative
		? new_balance[1].substring(1)
		: new_balance[1]
	const splitted_new_balance = absBalance.split(".")[0].split("")
	const splitted_new_balance_decimal = absBalance.split(".")[1]?.split("") || []

	const splitted_cost_balance = new_balance[0]
		.split(".")[0]
		.toString()
		.split("")
	const splitted_cost_balance_decimal = new_balance[0]
		.split(".")[1]
		.toString()
		.split("")

	useEffect(() => {
		const timeoutId = timerRef.current

		return () => {
			if (timeoutId) clearTimeout(timeoutId)
		}
	}, [])

	return (
		<>
			<TouchableOpacity
				onPress={() =>
					$changeListStore([
						{
							name: new_balance[1],
							link: new_balance[1],
							type: "copy",
							callback: () => {}
						},
						{
							name: `-${new_balance[0]}`,
							link: `-${new_balance[0]}`,
							type: "copy",
							callback: () => {}
						}
					])
				}
				className="rounded-2xl flex flex-col justify-between p-2 flex-none"
			>
				<View className="flex flex-col justify-end gap-2">
					<View className="flex flex-row justify-end ">
						<MotiView
							className="bg-brand-50 dark:bg-brand-900 flex flex-row items-end gap-1 rounded-full px-6 py-2"
							animate={{ opacity: new_balance[1] === "0.000" ? 0.8 : 1 }}
						>
							<View className="flex flex-row items-end">
								{new_balance_is_negative && (
									<Text
										style={{
											fontSize: 35,
											lineHeight: 35,
											fontVariant: ["tabular-nums"]
										}}
										className="font-bold text-green-900 dark:text-green-100"
									>
										-
									</Text>
								)}

								<View className="text-brand-700 dark:text-brand-100 text-right text-4xl font-bold flex flex-row overflow-auto gap-0">
									{splitted_new_balance.map((num, idx) => {
										return (
											<TickerList
												key={`n${num}-i${idx}`}
												index={idx}
												number={parseInt(num)}
												fontSize={35}
												number_offset={1.1}
												display_offset={1}
												className="text-green-900 dark:text-green-100"
											/>
										)
									})}
									<Text
										style={{
											fontSize: 35,
											lineHeight: 35,
											fontVariant: ["tabular-nums"]
										}}
										className="font-bold text-green-900 dark:text-green-100"
									>
										{`.`}
									</Text>
								</View>
								<View className="text-brand-700 dark:text-brand-100 text-right text-4xl font-bold flex flex-row overflow-auto">
									{splitted_new_balance_decimal.map((num, idx) => {
										return (
											<TickerList
												key={`n${num}-i${idx}`}
												index={idx}
												number={parseInt(num)}
												fontSize={28}
												number_offset={1.11}
												className="text-green-900 dark:text-green-100"
											/>
										)
									})}
								</View>
							</View>

							<Text className="text-sm text-green-900 dark:text-green-100">
								{`new bal`}
							</Text>
						</MotiView>
					</View>

					<View className="flex flex-row justify-end">
						<MotiView
							className="bg-red-50 dark:bg-red-900 flex flex-row items-end justify-end gap-1 rounded-full px-5 py-2"
							animate={{ opacity: new_balance[0] === "0.000" ? 0.5 : 1 }}
						>
							<View className="flex flex-row items-end">
								<View className="text-brand-700 dark:text-brand-100 text-right text-4xl font-bold flex flex-row overflow-auto gap-0">
									<Text
										style={{
											fontSize: fontSize,
											lineHeight: fontSize,
											fontVariant: ["tabular-nums"]
										}}
										className="font-bold text-red-900 dark:text-red-100"
									>
										{`-`}
									</Text>
									{splitted_cost_balance.map((num, idx) => {
										return (
											<TickerList
												key={`n${num}-i${idx}`}
												index={idx}
												number={parseInt(num)}
												fontSize={20}
												number_offset={1.18}
												className="text-red-900 dark:text-red-100"
											/>
										)
									})}
									<Text
										style={{
											fontSize: fontSize,
											lineHeight: fontSize,
											fontVariant: ["tabular-nums"]
										}}
										className="font-bold text-red-900 dark:text-red-100"
									>
										{`.`}
									</Text>
								</View>
								<View className="text-brand-700 dark:text-brand-100 text-right text-4xl font-bold flex flex-row overflow-auto">
									{splitted_cost_balance_decimal.map((num, idx) => {
										return (
											<TickerList
												key={`n${num}-i${idx}`}
												index={idx}
												number={parseInt(num)}
												fontSize={16}
												number_offset={1.23}
												display_offset={1.1}
												className="text-red-900 dark:text-red-100 "
											/>
										)
									})}
								</View>
							</View>

							<Text className="text-xs text-green-900 dark:text-green-100">
								{`cost bal`}
							</Text>
						</MotiView>
					</View>
				</View>
			</TouchableOpacity>
		</>
	)
}

function TickerList({
	number,
	fontSize,
	className,
	index,
	display_offset = 1,
	number_offset = 1.11
}: {
	number: number
	fontSize: number
	className: string
	index: number
	big?: boolean
	display_offset?: number
	number_offset?: number
}) {
	return (
		<View
			style={{ height: fontSize * display_offset }}
			className="overflow-hidden"
		>
			<MotiView
				from={{ translateY: 0 }}
				animate={{
					translateY: -fontSize * number_offset * number
				}}
				transition={{
					delay: index * _stagger,
					duration: 500
				}}
			>
				{numbersToNice.map((num, idx) => {
					return (
						<Tick
							key={idx}
							style={{
								fontSize: fontSize,
								lineHeight: fontSize * 1.1,
								fontVariant: ["tabular-nums"]
							}}
							className={`font-bold ${className}`}
						>
							{num}
						</Tick>
					)
				})}
			</MotiView>
		</View>
	)
}

function Tick({ children, ...rest }: TextProps) {
	return <Text {...rest}>{children}</Text>
}
