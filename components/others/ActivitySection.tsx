import React from "react"
import { ActivityIndicator, Text, View } from "react-native"

interface Props {
	title: string
	sub_title: string
}

const ActivitySection = ({ title, sub_title }: Props) => {
	return (
		<View className="bg-neutral-950 flex-1 justify-center items-center flex flex-col gap-4">
			<ActivityIndicator size="large" className="text-brand-500" />
			<Text className="font-semibold text-lg text-neutral-200">{title}</Text>
			<Text className=" text-neutral-200">{sub_title}</Text>
		</View>
	)
}

export default ActivitySection
