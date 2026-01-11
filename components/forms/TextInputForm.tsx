import React from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

const TextInputForm = ({
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

export default TextInputForm

const styles = StyleSheet.create({})
