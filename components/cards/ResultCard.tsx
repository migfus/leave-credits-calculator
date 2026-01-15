import CheckIcon from "@/icons/checkIcon"
import CopyIcon from "@/icons/copyIcon"
import { leaveBalanceComputation } from "@/utils"
import * as Clipboard from "expo-clipboard"
import React, { useEffect, useRef, useState } from "react"
import { Pressable, Text, View } from "react-native"
import * as Haptics from "expo-haptics"

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
	const new_balance = leaveBalanceComputation(result)
	const [copied, setCopied] = useState<"new" | "cost" | null>(null)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current)
		}
	}, [])

	const copyText = async (which: "new" | "cost", text: string) => {
		await Clipboard.setStringAsync(text)
		setCopied(which)
		if (timerRef.current) clearTimeout(timerRef.current)
		timerRef.current = setTimeout(() => setCopied(null), 2000)
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
	}

	const costCopyValue =
		new_balance[0] === "0.000" ? "0.000" : `-${new_balance[0]}`

	return (
		<View className=" rounded-2xl flex flex-col justify-between p-2 flex-none">
			<Text className={`${theme ? "text-neutral-50" : "text-neutral-600"}`}>
				Result
			</Text>
			<View className="flex flex-col justify-end gap-2">
				<View className="flex flex-row justify-between">
					<View>
						<Pressable
							onPress={() => copyText("new", new_balance[1])}
							hitSlop={8}
							className="p-2 rounded-2xl"
						>
							<Text className="text-neutral-800 font-semibold">
								{copied === "new" ? (
									<CheckIcon theme={theme} width={23} height={23} />
								) : (
									<CopyIcon theme={theme} width={23} height={23} />
								)}
							</Text>
						</Pressable>
					</View>
					<View className="flex flex-row items-end gap-1">
						<View className="flex flex-row items-end">
							<Text
								numberOfLines={1}
								className={`${theme ? "text-neutral-50" : "text-neutral-700"} text-right text-4xl font-bold`}
							>
								{`${new_balance[1].split(".")[0]}.`}
							</Text>
							<Text
								numberOfLines={1}
								className={`${theme ? "text-neutral-50" : "text-neutral-700"} text-right text-3xl font-bold`}
							>
								{`${new_balance[1].split(".")[1]}`}
							</Text>
						</View>

						<Text
							numberOfLines={1}
							className={`${theme ? "text-neutral-50" : "text-neutral-700"} text-right text-md`}
						>
							new bal
						</Text>
					</View>
				</View>

				<View className="flex flex-row justify-between">
					<View>
						<Pressable
							onPress={() => copyText("cost", costCopyValue)}
							hitSlop={8}
							className="p-2 rounded-2xl"
						>
							<Text className="text-neutral-800 font-semibold">
								{copied === "cost" ? (
									<CheckIcon theme={theme} width={23} height={23} />
								) : (
									<CopyIcon theme={theme} width={23} height={23} />
								)}
							</Text>
						</Pressable>
					</View>
					<View className="flex flex-row items-end gap-1">
						<View className="flex flex-row items-end">
							<Text
								numberOfLines={1}
								className="text-right text-red-700 font-bold text-2xl"
							>
								{`${new_balance[0] === "0.000" ? "0" : "-" + new_balance[0].split(".")[0]}.`}
							</Text>
							<Text
								numberOfLines={1}
								className="text-right text-red-700 font-bold text-xl"
							>
								{`${new_balance[0].split(".")[1] === "0" ? "0" : new_balance[0].split(".")[1]}`}
							</Text>
						</View>

						<Text numberOfLines={1} className={`text-red-700 text-right`}>
							cost bal
						</Text>
					</View>
				</View>
			</View>
		</View>
	)
}
export default ResultCard
