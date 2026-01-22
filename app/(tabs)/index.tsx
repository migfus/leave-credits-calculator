import HistoryPreviewCard from "@/components/cards/HistoryPreviewCard"
import KeypadCard from "@/components/cards/KeypadCard"
import ResultCard from "@/components/cards/ResultCard"
import TextInputForm from "@/components/forms/TextInputForm"
import { useLeaveHistory } from "@/store/historyStore"
import { useThemeStore } from "@/store/themeStore"
import * as Haptics from "expo-haptics"
import React, { useRef, useState } from "react"
import { ActivityIndicator, TextInput, View } from "react-native"

export default function Index() {
	const [balance, setBalance] = useState<string>("0")
	const [hours, setHours] = useState<string>("0")
	const [minutes, setMinutes] = useState<string>("0")
	const [select, setSelect] = useState<string>("balance")

	const balanceInputRef = useRef<TextInput>(null)
	const hoursInputRef = useRef<TextInput>(null)
	const minutesInputRef = useRef<TextInput>(null)

	const history = useLeaveHistory((s) => s.history)
	const addHistory = useLeaveHistory((s) => s.addHistory)
	const leave_hydrated = useLeaveHistory.persist.hasHydrated()
	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()

	if (!leave_hydrated || !theme_hydrated) {
		return (
			<View
				className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex-1 justify-center items-center`}
			>
				<ActivityIndicator size="large" className="text-brand-500" />
			</View>
		)
	}

	return (
		<View className="flex-1">
			<View
				className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex flex-col justify-between gap-4 p-4 h-full`}
			>
				{/* SECTION: HISTORY PREVIEW CARD */}
				<HistoryPreviewCard history={history} theme={theme} />

				{/* SECTION: RESULT CARD */}
				<ResultCard
					balance={balance}
					hours={hours}
					minutes={minutes}
					theme={theme}
				/>

				{/* SECTION: INPUT FORM */}
				<View className="flex flex-row gap-4">
					<TextInputForm
						title="Current Balance"
						value={balance}
						selected={select === "balance"}
						inputRef={balanceInputRef}
						onPressIn={() => {
							setSelect("balance")
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
						}}
						setValue={(value: string) => {
							setBalance(value)
						}}
						theme={theme}
						noDot={false}
					/>
				</View>

				<View className="flex flex-row gap-2">
					{/* <TextInputForm
						title="Days"
						value={hours}
						selected={select === "hours"}
						inputRef={hoursInputRef}
						onPressIn={() => {
							setSelect("hours")
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
						}}
						setValue={(value: string) => setHours(value)}
						theme={theme}
						noDot={true}
					/> */}
					<TextInputForm
						title="Hours"
						value={hours}
						selected={select === "hours"}
						inputRef={hoursInputRef}
						onPressIn={() => {
							setSelect("hours")
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
						}}
						setValue={(value: string) => setHours(value)}
						theme={theme}
						noDot={true}
					/>
					<TextInputForm
						title="Minutes"
						value={minutes}
						selected={select === "minutes"}
						inputRef={minutesInputRef}
						onPressIn={() => {
							setSelect("minutes")
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
						}}
						setValue={(value: string) => setMinutes(value)}
						theme={theme}
						noDot={true}
					/>
				</View>

				{/* SECTION: KEYPADCARD */}
				<KeypadCard
					theme={theme}
					select={select}
					balance={balance}
					hours={hours}
					minutes={minutes}
					setBalance={setBalance}
					setHours={setHours}
					addHistory={addHistory}
					setSelect={setSelect}
					setMinutes={setMinutes}
					onResetAll={() => {
						balanceInputRef.current?.focus()
					}}
				/>
			</View>
		</View>
	)
}
