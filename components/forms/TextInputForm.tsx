import { Platform, Text, TextInput, View } from "react-native"

import React, { useEffect, useMemo, useState } from "react"

export default function TextInputForm({
	title,
	value,
	selected,
	onPressIn,
	inputRef,
	setValue,
	noDot
}: {
	title: string
	value: string
	selected: boolean
	onPressIn: () => void
	inputRef?: React.RefObject<TextInput | null>
	setValue: (text: string) => void
	noDot: boolean
}) {
	const endSelection = useMemo(
		() => ({ start: value.length, end: value.length }),
		[value.length]
	)
	const [selection, setSelection] = useState(endSelection)

	useEffect(() => {
		setSelection(endSelection)
	}, [endSelection])

	const moveCaretToEnd = () => {
		setSelection(endSelection)

		// On web, the underlying ref is a DOM input; update it explicitly.
		if (Platform.OS !== "web") return
		const current = inputRef?.current as unknown as
			| HTMLInputElement
			| undefined
			| null
		if (!current) return
		if (typeof current.setSelectionRange !== "function") return

		requestAnimationFrame(() => {
			current.setSelectionRange(endSelection.end, endSelection.end)
		})
	}

	function inputClass() {
		if (selected) {
			return "border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-brand-50"
		} else {
			return "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
		}
	}

	function cleanInput(text: string) {
		const cleaned = noDot
			? text.replace(/[^0-9]/g, "")
			: text.replace(/[^0-9.]/g, "")
		const parts = cleaned.split(".")
		const numericText =
			parts.length <= 2 ? cleaned : `${parts[0]}.${parts.slice(1).join("")}`

		if (value === "0") {
			setValue(numericText.replace(/^0+/, "") || "0")
		} else {
			setValue(numericText)
		}
	}

	function onFocus() {
		onPressIn()
		moveCaretToEnd()
	}

	return (
		<View className="flex flex-col flex-1 min-w-0">
			<View className="px-2 pb-1 rounded-2xl flex justify-between flex-row">
				<Text className={`text-neutral-600 dark:text-neutral-50 text-sm`}>
					{title}
				</Text>
			</View>
			<TextInput
				ref={inputRef}
				value={value}
				onFocus={onFocus}
				onPressIn={moveCaretToEnd}
				onChangeText={cleanInput}
				className={`${inputClass()} rounded-full h-14 text-right text-2xl font-semibold px-5 flex-shrink min-w-0 w-full`}
				showSoftInputOnFocus={false}
				keyboardType="numeric"
				selection={selection}
			/>
		</View>
	)
}
