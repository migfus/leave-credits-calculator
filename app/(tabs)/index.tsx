import { leaveBalanceComputation } from "@/utils"
import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const HistoryCard = () => {
	const history = [
		{
			hours: 1,
			minutes: 2,
			balance: 32.22,
			timeStamps: 1
		},
		{
			hours: 1,
			minutes: 2,
			balance: 32.22,
			timeStamps: 2
		},
		{
			hours: 1,
			minutes: 2,
			balance: 32.22,
			timeStamps: 3
		},
		{
			hours: 1,
			minutes: 2,
			balance: 32.22,
			timeStamps: 4
		},
		{
			hours: 1,
			minutes: 2,
			balance: 32.22,
			timeStamps: 5
		},
		{
			hours: 1,
			minutes: 2,
			balance: 32.22,
			timeStamps: 6
		},
		{
			hours: 1,
			minutes: 2,
			balance: 32.22,
			timeStamps: 7
		},
		{
			hours: 1,
			minutes: 2,
			balance: 32.22,
			timeStamps: 8
		}
	]

	return (
		<View className="bg-white rounded-2xl flex flex-1">
			<View className="px-4 pt-4 rounded-2xl flex justify-between flex-row">
				<Text className="text-neutral-600">History</Text>
				<Text className="text-neutral-400">99+</Text>
			</View>
			<View className="p-4">
				<FlatList
					data={history}
					keyExtractor={(item) => item.timeStamps.toString()}
					renderItem={({ item }) => (
						<View className="flex flex-row justify-end">
							<View className="flex flex-row">
								<Text
									numberOfLines={1}
									className="text-neutral-400"
								>{`${item.hours} `}</Text>
								<Text numberOfLines={1} className="text-neutral-400 text-xs">
									{`hr `}
								</Text>
								<Text
									numberOfLines={1}
									className="text-neutral-400"
								>{`${item.minutes} `}</Text>
								<Text numberOfLines={1} className="text-neutral-400 text-xs">
									{`min `}
								</Text>
								<Text numberOfLines={1} className="text-neutral-400">
									{`- `}
								</Text>
								<Text
									numberOfLines={1}
									className="text-neutral-400"
								>{`${item.balance} `}</Text>
								<Text numberOfLines={1} className="text-neutral-400 text-xs ">
									{`bal `}
								</Text>
								<Text numberOfLines={1} className="text-neutral-400">
									{`= `}
								</Text>
							</View>

							<View className="flex flex-row">
								<Text
									numberOfLines={1}
									className="text-neutral-600"
								>{`${leaveBalanceComputation(item)} `}</Text>
							</View>
						</View>
					)}
				></FlatList>
			</View>
		</View>
	)
}

const OutputCard = (result: {
	balance: string
	hours: string
	minutes: string
}) => {
	return (
		<View className="bg-white rounded-2xl flex flex-col justify-between p-4 flex-none">
			<Text className="text-neutral-600">Result</Text>
			<Text
				numberOfLines={1}
				className="text-right text-neutral-700 text-4xl font-bold "
			>
				{leaveBalanceComputation(result)}
			</Text>
		</View>
	)
}

const InputCard = ({
	title,
	value,
	full,
	selected,
	onPress
}: {
	title: string
	value: string
	full: boolean
	selected: boolean
	onPress: () => void
}) => {
	return (
		<View className={full ? "grow" : '"flex-none"'}>
			<View className="px-2 pb-1 rounded-2xl flex justify-between flex-row">
				<Text className="text-neutral-600 ">{title}</Text>
			</View>
			<TouchableOpacity
				className={`${selected ? "border border-neutral-300" : ""} p-4 bg-white rounded-2xl h-16`}
				onPress={() => onPress()}
			>
				<Text
					numberOfLines={1}
					className="text-right text-neutral-700 text-2xl font-bold "
				>
					{value}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default function Index() {
	const [balance, setBalance] = useState<string>("0")
	const [hours, setHours] = useState<string>("0")
	const [minutes, setMinutes] = useState<string>("0")
	const [select, setSelect] = useState<string>("balance")

	function append(v: string) {
		switch (select) {
			case "balance":
				if (balance === "0" && v !== ".") {
					setBalance(v)
				} else {
					setBalance((s) => s + v)
				}
				break
			case "hours":
				if (hours === "0" && v !== ".") {
					setHours(v)
				} else {
					setHours((s) => s + v)
				}
				break
			case "minutes":
				if (minutes === "0" && v !== ".") {
					setMinutes(v)
				} else {
					setMinutes((s) => s + v)
				}

				break
		}
	}

	function clear() {
		setBalance("0")
		setHours("0")
		setMinutes("0")
		setSelect("balance")
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
	}

	const rows = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		[".", "0", "Del"],
		["Clear"]
	]

	return (
		<SafeAreaView className="bg-neutral-100 h-full p-4">
			<View className="flex flex-col justify-between h-full gap-4 ">
				<HistoryCard />
				<OutputCard balance={balance} hours={hours} minutes={minutes} />
				<InputCard
					title="Balance"
					value={balance}
					full={false}
					selected={select === "balance"}
					onPress={() => {
						setSelect("balance")
					}}
				/>
				<View className="flex flex-row gap-4">
					<InputCard
						title="Hours"
						value={hours}
						full={true}
						selected={select === "hours"}
						onPress={() => {
							setSelect("hours")
						}}
					/>
					<InputCard
						title="Minutes"
						value={minutes}
						full={true}
						selected={select === "minutes"}
						onPress={() => {
							setSelect("minutes")
						}}
					/>
				</View>

				<View className="flex-none mb-20">
					{rows.map((row, ri) => (
						<View key={ri} className="flex-row justify-between mb-3">
							{row.map((b, bi) => {
								const onPress = () => {
									if (b === "C") clear()
									else if (b === "Del") del()
									else if (b === "Clear") clear()
									else append(b)
								}

								return (
									<TouchableOpacity
										key={bi}
										onPress={onPress}
										activeOpacity={0.7}
										className={`bg-white rounded-2xl justify-center items-center flex-1 h-16 mx-1`}
									>
										<Text className={`text-neutral-800 font-semibold text-2xl`}>
											{b}
										</Text>
									</TouchableOpacity>
								)
							})}
						</View>
					))}
				</View>
			</View>
			<StatusBar style="dark" />
		</SafeAreaView>
	)
}
