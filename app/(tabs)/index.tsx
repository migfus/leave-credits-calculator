import HistoryPreviewCard from "@/components/cards/HistoryPreviewCard"
import KeypadCard from "@/components/cards/KeypadCard"
import ResultCard from "@/components/cards/ResultCard"
import TextInputForm from "@/components/forms/TextInputForm"
import { useLeaveHistory } from "@/store/historyStore"
import { useThemeStore } from "@/store/themeStore"
import * as Haptics from "expo-haptics"
import React, { useState } from "react"
import { ActivityIndicator, View } from "react-native"

export default function Index() {
	const [balance, setBalance] = useState<string>("0")
	const [hours, setHours] = useState<string>("0")
	const [minutes, setMinutes] = useState<string>("0")
	const [select, setSelect] = useState<string>("balance")

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
		<View
			className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex flex-col justify-between h-full gap-4 p-4`}
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
			<TextInputForm
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
				<TextInputForm
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
				<TextInputForm
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
			/>
		</View>
	)
}
