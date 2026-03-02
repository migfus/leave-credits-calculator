import React, { useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming
} from "react-native-reanimated"

import useBottomSheetStore from "@/store/bottomSheetStore"
import useComputationMethodStore from "@/store/computationMethodStore"
import { leaveBalanceComputation } from "@/utils"

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

	const $changeListStore = useBottomSheetStore((s) => s.changeList)

	const new_balance_is_negative = new_balance[1].startsWith("-")
	const absBalance = new_balance_is_negative
		? new_balance[1].substring(1)
		: new_balance[1]

	const splitted_new_balance = absBalance.split(".")[0].split("")
	const splitted_new_balance_decimal = absBalance.split(".")[1]?.split("") || []

	// Reanimated Shared Values for Opacity
	const opacityNewBal = useSharedValue(1)
	const opacityCostBal = useSharedValue(1)

	useEffect(() => {
		opacityNewBal.value = withTiming(new_balance[1] === "0.000" ? 0.8 : 1)
		opacityCostBal.value = withTiming(new_balance[0] === "0.000" ? 0.5 : 1)
	}, [new_balance])

	const animatedNewBalStyle = useAnimatedStyle(() => ({
		opacity: opacityNewBal.value
	}))

	const animatedCostBalStyle = useAnimatedStyle(() => ({
		opacity: opacityCostBal.value
	}))

	return (
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
				<View className="flex flex-row justify-end">
					<Animated.View
						style={animatedNewBalStyle}
						className="bg-brand-50 dark:bg-brand-900 flex flex-row items-end gap-1 rounded-full px-6 py-2"
					>
						<View className="text-brand-700 dark:text-brand-100 text-right text-4xl font-bold flex flex-row overflow-hidden gap-1 items-end">
							<View className="text-brand-700 dark:text-brand-100 text-right text-4xl font-bold flex flex-row items-center">
								<Text className="font-bold text-green-900 dark:text-green-100 text-3xl">
									{new_balance[1].split(".")[0]}
								</Text>
								<Text className="font-bold text-green-900 dark:text-green-100 text-3xl">
									.
								</Text>
								<Text className="font-bold text-green-900 dark:text-green-100 mt-1 text-xl">
									{new_balance[1].split(".")[1]}
								</Text>
							</View>
							<Text className="text-xs text-green-900 dark:text-green-100">
								new bal
							</Text>
						</View>
					</Animated.View>
				</View>

				<View className="flex flex-row justify-end">
					<Animated.View
						style={animatedCostBalStyle}
						className="bg-red-50 dark:bg-red-900 flex flex-row items-end justify-end gap-1 rounded-full px-5 py-2"
					>
						<View className="flex flex-row items-end gap-1">
							<View className="text-brand-700 dark:text-brand-100 text-right text-4xl font-bold flex flex-row items-center">
								<Text className="font-bold text-red-900 dark:text-red-100 text-lg">
									-
								</Text>
								<Text className="font-bold text-red-900 dark:text-red-100 text-lg">
									{new_balance[0].split(".")[0]}
								</Text>
								<Text className="font-bold text-red-900 dark:text-red-100 text-lg">
									.
								</Text>
								<Text className="font-bold text-red-900 dark:text-red-100">
									{new_balance[0].split(".")[1]}
								</Text>
							</View>
							<Text className="text-xs text-red-900 dark:text-red-100">
								cost bal
							</Text>
						</View>
					</Animated.View>
				</View>
			</View>
		</TouchableOpacity>
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
	display_offset?: number
	number_offset?: number
}) {
	const translateY = useSharedValue(0)

	useEffect(() => {
		translateY.value = withDelay(
			index * _stagger,
			withTiming(-fontSize * number_offset * number, { duration: 500 })
		)
	}, [number, fontSize])

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }]
	}))

	return (
		<View
			style={{ height: fontSize * display_offset }}
			className="overflow-hidden"
		>
			<Animated.View style={animatedStyle}>
				{numbersToNice.map((num) => (
					<Text
						key={num}
						style={{
							fontSize: fontSize,
							lineHeight: fontSize * 1.1,
							fontVariant: ["tabular-nums"]
						}}
						className={`font-bold ${className}`}
					>
						{num}
					</Text>
				))}
			</Animated.View>
		</View>
	)
}
