import { LeaveBalanceHistory } from "@/globalInterface"
import { useLeaveHistory } from "@/store/historyStore"
import { useThemeStore } from "@/store/themeStore"
import { leaveBalanceComputation } from "@/utils"
import * as Haptics from "expo-haptics"
import React, { useState } from "react"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"

const HistoryCard = ({
	history,
	theme
}: {
	history: LeaveBalanceHistory[]
	theme: boolean
}) => {
	return (
		<View
			className={`${theme ? "bg-neutral-900" : "bg-neutral-50"} rounded-2xl flex flex-1`}
		>
			<View className="px-4 pt-4 rounded-2xl flex justify-between flex-row">
				<Text className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}>
					History
				</Text>
				<Text className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}>
					{history.length}
				</Text>
			</View>
			<View className="p-4 overflow-y-auto flex-1">
				<FlatList
					data={history}
					keyExtractor={(item) => item.timeStamps}
					renderItem={({ item }) => (
						<View className="flex flex-row justify-end ">
							<View className="flex flex-row items-end">
								<Text
									numberOfLines={1}
									className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
								>{`${item.balance} `}</Text>
								<Text
									numberOfLines={1}
									className={`${theme ? "text-neutral-200" : "text-neutral-600"} text-xs`}
								>
									{`bal `}
								</Text>
								<Text
									numberOfLines={1}
									className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
								>
									{`- `}
								</Text>

								<Text
									numberOfLines={1}
									className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
								>{`${item.hours} `}</Text>
								<Text numberOfLines={1} className="text-neutral-400 text-xs">
									{`hr `}
								</Text>
								<Text
									numberOfLines={1}
									className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
								>{`${item.minutes} `}</Text>
								<Text numberOfLines={1} className="text-neutral-400 text-xs">
									{`min `}
								</Text>

								<Text
									numberOfLines={1}
									className={`${theme ? "text-neutral-200" : "text-neutral-600"}`}
								>
									{`= `}
								</Text>
							</View>

							<View className="flex flex-row w-16">
								<Text
									numberOfLines={1}
									className={`${theme ? "text-neutral-200" : "text-neutral-600"} font-semibold text-right`}
								>{`${leaveBalanceComputation(item)[1]} `}</Text>
							</View>
						</View>
					)}
				></FlatList>
			</View>
		</View>
	)
}

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

const InputCard = ({
	title,
	value,
	full,
	selected,
	onPressIn,

	setValue,
	theme
}: {
	title: string
	value: string
	full: boolean
	selected: boolean
	onPressIn: () => void

	setValue: (text: string) => void
	theme: boolean
}) => {
	return (
		<View className={`${full ? "grow overflow-x-hidden" : "flex-none"} `}>
			<View className="px-2 pb-1 rounded-2xl flex justify-between flex-row">
				<Text className={`${theme ? "text-neutral-50" : "text-neutral-600"}`}>
					{title}
				</Text>
			</View>
			<TextInput
				value={value}
				onChangeText={setValue}
				className={`${selected && theme ? "border border-neutral-300 bg-neutral-900 text-brand-50" : selected ? "border border-neutral-300 bg-white" : theme ? "bg-neutral-800 text-neutral-100" : "bg-neutral-100 text-neutral-900"} rounded-2xl h-16 text-right text-2xl font-semibold px-4`}
				showSoftInputOnFocus={false}
				keyboardType="numeric"
				selection={{ start: value.length, end: value.length }}
				onSelectionChange={() => {
					onPressIn()
				}}
			/>
		</View>
	)
}

export default function Index() {
	const [balance, setBalance] = useState<string>("0")
	const [hours, setHours] = useState<string>("0")
	const [minutes, setMinutes] = useState<string>("0")
	const [select, setSelect] = useState<string>("balance")

	const [balanceError, setBalanceError] = useState<boolean>(false)
	const [hoursError, setHoursError] = useState<boolean>(false)
	const [minutesError, setMinutesError] = useState<boolean>(false)

	const history = useLeaveHistory((s) => s.history)
	const addHistory = useLeaveHistory((s) => s.addHistory)
	const leave_hydrated = useLeaveHistory.persist.hasHydrated()
	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()
	// const toggleTheme = useThemeStore((s) => s.toggleTheme)

	if (!leave_hydrated) {
		return null // or splash screen
	}
	if (!theme_hydrated) {
		return null // or splash screen
	}

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
		addHistory({
			balance,
			hours,
			minutes,
			timeStamps: new Date().toISOString()
		})
		setBalance("0")
		setHours("0")
		setMinutes("0")
		setSelect("balance")
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
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

	const rows = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		["Del", "0", "."],
		["Reset All", "Clear"]
	]

	return (
		<View
			className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex flex-col justify-between h-full gap-4 p-4`}
		>
			<HistoryCard history={history} theme={theme} />
			<ResultCard
				balance={balance}
				hours={hours}
				minutes={minutes}
				theme={theme}
			/>
			<InputCard
				title="Balance"
				value={balance}
				full={false}
				selected={select === "balance"}
				onPressIn={() => {
					setSelect("balance")
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
				}}
				setValue={(value: string) => setBalance(value)}
				theme={theme}
			/>
			<View className="flex flex-row gap-4">
				<InputCard
					title="Hours"
					value={hours}
					full={true}
					selected={select === "hours"}
					onPressIn={() => {
						setSelect("hours")
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
					}}
					setValue={(value: string) => setHours(value)}
					theme={theme}
				/>
				<InputCard
					title="Minutes"
					value={minutes}
					full={true}
					selected={select === "minutes"}
					onPressIn={() => {
						setSelect("minutes")
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
					}}
					setValue={(value: string) => setMinutes(value)}
					theme={theme}
				/>
			</View>

			<View className="flex-none">
				{rows.map((row, ri) => (
					<View key={ri} className="flex-row justify-between mb-3">
						{row.map((b, bi) => {
							const onPress = () => {
								setBalanceError(false)
								setHoursError(false)
								setMinutesError(false)

								if (b === "Reset All") reset()
								else if (b === "Del") del()
								else if (b === "Clear") clear()
								else append(b)
							}

							return (
								<TouchableOpacity
									key={bi}
									onPressIn={onPress}
									activeOpacity={0.7}
									className={`${theme ? "bg-neutral-800" : "bg-white"} rounded-2xl justify-center items-center flex-1 h-[5rem] mx-1`}
								>
									<Text
										className={`${theme ? "text-neutral-50" : "text-neutral-900"} font-semibold text-2xl`}
									>
										{b}
									</Text>
								</TouchableOpacity>
							)
						})}
					</View>
				))}
			</View>
		</View>
	)
}
