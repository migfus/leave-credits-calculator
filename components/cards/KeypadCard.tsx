import BackIcon from "@/icons/backIcon"
import FreshIcon from "@/icons/freshIcon"
import XIcon from "@/icons/xIcon"
import { Platform, Text, TouchableOpacity, View } from "react-native"

import { LeaveBalanceHistory } from "@/globalInterface"
import { useVibrateStore } from "@/store/vibrateStore"
import React, { useCallback, useEffect } from "react"
import ActivitySection from "../others/ActivitySection"

export default function KeypadCard({
	theme,
	select,
	balance,
	hours,
	minutes,
	setBalance,
	setHours,
	setMinutes,
	addHistory,
	setSelect,
	onResetAll
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
	onResetAll?: () => void
}) {
	const $vibrate = useVibrateStore((s) => s.vibrate)
	const $vibrateHydrated = useVibrateStore.persist.hasHydrated()

	const append = useCallback(
		(v: string) => {
			$vibrate()

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
		},
		[
			$vibrate,
			balance,
			hours,
			minutes,
			select,
			setBalance,
			setHours,
			setMinutes
		]
	)

	const reset = useCallback(() => {
		if (balance === "0" && hours === "0" && minutes === "0") {
			setSelect("balance")
			onResetAll?.()
			return
		}

		addHistory({
			balance,
			hours,
			minutes,
			timeStamps: new Date().toISOString()
		})
		setBalance("0")
		setHours("0")
		setMinutes("0")

		$vibrate()
		setSelect("balance")
		onResetAll?.()
	}, [
		$vibrate,
		addHistory,
		balance,
		hours,
		minutes,
		onResetAll,
		setBalance,
		setHours,
		setMinutes,
		setSelect
	])

	const clear = useCallback(() => {
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
		$vibrate()
	}, [$vibrate, select, setBalance, setHours, setMinutes])

	const reverse = useCallback(() => {
		if (select === "balance") {
			setBalance((Number(balance) * -1).toString())
		}
	}, [select, balance, setBalance])

	const del = useCallback(() => {
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
		$vibrate()
	}, [$vibrate, select, setBalance, setHours, setMinutes])

	function getButtonClass(b: string) {
		if (b === "Reset" && balance === "0") {
			return theme ? "bg-neutral-950" : "bg-neutral-200"
		}
		if (b === "." && select !== "balance") {
			return theme ? "bg-neutral-950" : "bg-neutral-200"
		}
		if (b === "Clear" || b === "Del") {
			if (
				(select === "balance" && balance === "0") ||
				(select === "hours" && hours === "0") ||
				(select === "minutes" && minutes === "0")
			) {
				return theme ? "bg-neutral-950" : "bg-neutral-200"
			}
			return theme ? "bg-neutral-800" : "bg-white"
		}
		if (b === "+/-" && select !== "balance") {
			return theme ? "bg-neutral-950" : "bg-neutral-200"
		}

		return theme ? "bg-neutral-800" : "bg-white"
	}

	const rows = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		["Del", "0", "."],
		["+/-", "Reset", "Clear"]
	]

	useEffect(() => {
		if (Platform.OS !== "web") return
		if (typeof window === "undefined") return

		const handler = (event: KeyboardEvent) => {
			if (event.defaultPrevented) return
			if (event.ctrlKey || event.metaKey || event.altKey) return

			const key = event.key

			if (key === "Backspace") {
				event.preventDefault()
				del()
				return
			}
			if (key === "Delete") {
				event.preventDefault()
				clear()
				return
			}
			if (key === "Enter") {
				event.preventDefault()
				reset()
				return
			}

			if (/^[0-9]$/.test(key)) {
				event.preventDefault()
				append(key)
				return
			}
			if (key === ".") {
				event.preventDefault()
				append(".")
			}
		}

		window.addEventListener("keydown", handler)
		return () => window.removeEventListener("keydown", handler)
		// Intentionally depend on state/handlers so selected field stays correct.
	}, [append, clear, del, reset])

	if (!$vibrateHydrated) {
		return (
			<ActivitySection title="Hydrating..." sub_title="components/KeypadCard" />
		)
	}

	return (
		<View className="flex-none">
			{rows.map((row, ri) => (
				<View key={ri} className="flex-row justify-between mb-2 gap-2">
					{row.map((b, bi) => {
						const onPress = () => {
							if (b === "Reset") reset()
							else if (b === "Del") del()
							else if (b === "Clear") clear()
							else if (b === "+/-") reverse()
							else append(b)
						}

						const buttonClass = `${getButtonClass(b)} rounded-2xl justify-center items-center flex-1 h-[4rem] `

						return (
							<TouchableOpacity
								key={bi}
								onPress={onPress}
								activeOpacity={0.7}
								className={buttonClass}
							>
								{b === "Del" ? (
									<BackIcon size={26} />
								) : b === "Clear" ? (
									<View className="flex flex-row gap-2 items-center">
										<XIcon size={26} color={theme ? "#cecece" : "#191919"} />
										<Text
											className={`${theme ? "text-neutral-50" : "text-neutral-900"} font-semibold text-xl `}
										>
											Clear
										</Text>
									</View>
								) : b === "Reset" ? (
									<View className="flex flex-row gap-2 items-center">
										<FreshIcon
											size={26}
											color={theme ? "#cecece" : "#191919"}
										/>
										<Text
											className={`${theme ? "text-neutral-50" : "text-neutral-900"} font-semibold text-xl `}
										>
											Reset
										</Text>
									</View>
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
