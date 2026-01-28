import { Text, TouchableOpacity, View } from "react-native"

import useBottomSheetStore from "@/store/bottomSheetStore"
import useComputationMethodStore from "@/store/computationMethodStore"
import { leaveBalanceComputation } from "@/utils"
import React, { useEffect, useRef } from "react"

interface ResultCardProps {
	balance: string
	hours: string
	minutes: string
	theme?: boolean
}

const ResultCard = ({
	balance,
	hours,
	minutes,
	theme = false
}: ResultCardProps) => {
	const $method = useComputationMethodStore((s) => s.method)

	const result = { balance, hours, minutes, method: $method }
	const new_balance = leaveBalanceComputation(result)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const $changeListStore = useBottomSheetStore((s) => s.changeList)

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
				className=" rounded-2xl flex flex-col justify-between p-2 flex-none"
			>
				<View className="flex flex-col justify-end gap-2">
					<View className="flex flex-row justify-end ">
						<View
							className={`${theme ? "bg-brand-900" : "bg-brand-50"} flex flex-row items-end gap-1 rounded-full px-6 py-2`}
						>
							<View className="flex flex-row items-end">
								<Text
									numberOfLines={1}
									className={`${theme ? "text-brand-100" : "text-brand-700"} text-right text-4xl font-bold`}
								>
									{`${new_balance[1].split(".")[0]}.`}
								</Text>
								<Text
									numberOfLines={1}
									className={`${theme ? "text-brand-100" : "text-brand-700"} text-right text-3xl font-bold`}
								>
									{`${new_balance[1].split(".")[1]}`}
								</Text>
							</View>

							<Text
								numberOfLines={1}
								className={`${theme ? "text-brand-200" : "text-neutral-700"} text-right text-md text-sm font-semibold`}
							>
								new bal
							</Text>
						</View>
					</View>

					<View className="flex flex-row justify-end">
						<View
							className={`${theme ? "bg-red-900" : "bg-red-50"} "flex flex-row items-end gap-1 rounded-full px-5 py-1`}
						>
							<View className="flex flex-row items-end">
								<Text
									numberOfLines={1}
									className={`${theme ? "text-red-100" : "text-red-700"} text-right  font-bold text-2xl`}
								>
									{`${new_balance[0] === "0.000" ? "0" : "-" + new_balance[0].split(".")[0]}.`}
								</Text>
								<Text
									numberOfLines={1}
									className={`${theme ? "text-red-100" : "text-red-700"} text-right font-bold text-xl`}
								>
									{`${new_balance[0].split(".")[1] === "0" ? "0" : new_balance[0].split(".")[1]}`}
								</Text>
							</View>

							<Text
								numberOfLines={1}
								className={`${theme ? "text-red-200" : "text-red-700"}  text-right text-sm font-semibold`}
							>
								cost
							</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</>
	)
}
export default ResultCard
