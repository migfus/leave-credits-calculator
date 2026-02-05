import HistoryPreviewCard from "@/components/cards/HistoryPreviewCard"
import KeypadCard from "@/components/cards/KeypadCard"
import ResultCard from "@/components/cards/ResultCard"
import TextInputForm from "@/components/forms/TextInputForm"
import { TextInput, View } from "react-native"

import ActivitySection from "@/components/others/ActivitySection"
import { useLeaveHistory } from "@/store/historyStore"
import React, { useRef, useState } from "react"
import { useVibrateStore } from "@/store/vibrateStore"

export default function Index() {
	const [balance, setBalance] = useState<string>("0")
	const [hours, setHours] = useState<string>("0")
	const [minutes, setMinutes] = useState<string>("0")
	const [select, setSelect] = useState<string>("balance")

	const balanceInputRef = useRef<TextInput>(null)
	const hoursInputRef = useRef<TextInput>(null)
	const minutesInputRef = useRef<TextInput>(null)

	const $history = useLeaveHistory((s) => s.history)
	const $addHistory = useLeaveHistory((s) => s.addHistory)
	const $vibrate = useVibrateStore((s) => s.vibrate)

	const $hydrated = [
		useVibrateStore.persist.hasHydrated(),
		useLeaveHistory.persist.hasHydrated()
	]

	if ($hydrated.some((v) => v === false)) {
		return <ActivitySection title="Hydrating..." sub_title="(tabs)/index" />
	}

	return (
		<View className="flex-1">
			<View
				className={`bg-neutral-200 dark:bg-neutral-950 flex flex-col justify-between gap-4 p-4 h-full`}
			>
				{/* SECTION: HISTORY PREVIEW CARD */}
				<HistoryPreviewCard history={$history} />

				{/* SECTION: RESULT CARD */}
				<ResultCard balance={balance} hours={hours} minutes={minutes} />

				{/* SECTION: INPUT FORM */}
				<View className="flex flex-row gap-4">
					<TextInputForm
						title="Current Balance"
						value={balance}
						selected={select === "balance"}
						inputRef={balanceInputRef}
						onPressIn={() => {
							setSelect("balance")
							$vibrate()
						}}
						setValue={(v: string) => {
							setBalance(v)
						}}
						noDot={false}
					/>
				</View>

				<View className="flex flex-row gap-2">
					<TextInputForm
						title="Hours"
						value={hours}
						selected={select === "hours"}
						inputRef={hoursInputRef}
						onPressIn={() => {
							setSelect("hours")
							$vibrate()
						}}
						setValue={(v: string) => setHours(v)}
						noDot={true}
					/>
					<TextInputForm
						title="Minutes"
						value={minutes}
						selected={select === "minutes"}
						inputRef={minutesInputRef}
						onPressIn={() => {
							setSelect("minutes")
							$vibrate()
						}}
						setValue={(v: string) => setMinutes(v)}
						noDot={true}
					/>
				</View>

				{/* SECTION: KEYPADCARD */}
				<KeypadCard
					select={select}
					balance={balance}
					hours={hours}
					minutes={minutes}
					setBalance={setBalance}
					setHours={setHours}
					addHistory={$addHistory}
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
