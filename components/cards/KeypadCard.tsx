import { Text, TouchableOpacity, View } from "react-native"
import React, { useEffect } from "react"
import BackIcon from "@/icons/backIcon"
import * as Haptics from "expo-haptics"
import { LeaveBalanceHistory } from "@/globalInterface"

const KeypadCard = ({
	theme,
	select,
	balance,
	hours,
	minutes,
	setBalance,
	setHours,
	setMinutes,
	addHistory,
	setSelect
}: {
	theme: boolean
	select: string
	balance: string
	hours: string
	minutes: string
	setBalance: React.Dispatch<React.SetStateAction<string>>
	setHours: React.Dispatch<React.SetStateAction<string>>
	setMinutes: React.Dispatch<React.SetStateAction<string>>
	addHistory: (history: LeaveBalanceHistory) => void
	setSelect: React.Dispatch<React.SetStateAction<string>>
}) => {
	function append(v: string) {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

		switch (select) {
			case "balance":
				if (v === "." && balance.includes(".")) return
				if (balance === "0" && v !== ".") {
					setBalance(v)
				} else {
					setBalance((s) => s + v)
				}
				break
			case "hours":
				if (v === ".") return
				if (hours === "0" && v !== ".") {
					setHours(v)
				} else {
					setHours((s) => s + v)
				}
				break
			case "minutes":
				if (v === ".") return
				if (minutes === "0" && v !== ".") {
					setMinutes(v)
				} else {
					setMinutes((s) => s + v)
				}
				break
		}
	}

	function reset() {
		if (balance === "0" && hours === "0" && minutes === "0") return

		addHistory({
			balance,
			hours,
			minutes,
			timeStamps: new Date().toISOString()
		})
		setBalance("0")
		setHours("0")
		setMinutes("0")

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
		setSelect("balance")
	}

	function clear() {
		switch (select) {
			case "balance":
				setBalance("0")
				break
			case "hours":
				setHours("0")
				break
			case "minutes":
				setMinutes("0")
				break
		}
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
	}

	function del() {
		switch (select) {
			case "balance":
				setBalance((s) => (s.length > 1 ? s.slice(0, -1) : "0"))
				break
			case "hours":
				setHours((s) => (s.length > 1 ? s.slice(0, -1) : "0"))
				break
			case "minutes":
				setMinutes((s) => (s.length > 1 ? s.slice(0, -1) : "0"))
				break
		}
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
	}

	function getButtonClass(b: string) {
		if (b === "Reset All" && balance === "0") {
			return theme ? "bg-neutral-950" : "bg-red-500"
		}
		if (b === "." && select !== "balance") {
			return theme ? "bg-neutral-950" : "bg-red-500"
		}
		if (b === "Clear" || b === "Del") {
			if (
				(select === "balance" && balance === "0") ||
				(select === "hours" && hours === "0") ||
				(select === "minutes" && minutes === "0")
			) {
				return theme ? "bg-neutral-950" : "bg-red-500"
			}
			return theme ? "bg-neutral-800" : "bg-white"
		}

		return theme ? "bg-neutral-800" : "bg-white"
	}

	const rows = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		["Del", "0", "."],
		["Reset All", "Clear"]
	]

	useEffect(() => {
		console.log("select is now: ", select)
	}, [select])

	return (
		<View className="flex-none">
			{rows.map((row, ri) => (
				<View key={ri} className="flex-row justify-between mb-3">
					{row.map((b, bi) => {
						const onPress = () => {
							if (b === "Reset All") reset()
							else if (b === "Del") del()
							else if (b === "Clear") clear()
							else append(b)
						}

						const buttonClass = `${getButtonClass(b)} rounded-2xl justify-center items-center flex-1 h-[5rem] mx-1`

						return (
							<TouchableOpacity
								key={bi}
								onPress={onPress}
								activeOpacity={0.7}
								className={buttonClass}
							>
								{b === "Del" ? (
									<BackIcon theme={theme} />
								) : (
									<Text
										className={`${theme ? "text-neutral-50" : "text-neutral-900"} font-semibold text-2xl `}
									>
										{b}
									</Text>
								)}
							</TouchableOpacity>
						)
					})}
				</View>
			))}
		</View>
	)
}

export default KeypadCard
