import { Linking, Text, TouchableOpacity, View } from "react-native"

import React, { useState } from "react"
import { useVibrateStore } from "@/store/vibrateStore"
import ActivitySection from "../others/ActivitySection"
import { HugeiconsIcon } from "@hugeicons/react-native"
import { ArrowDown01Icon, MinusSignIcon } from "@hugeicons/core-free-icons"

interface CollapseCardProps {
	title: string
	sub_title: string
	more_info: {
		title: string
		sub_title: string
		links?: {
			name: string
			link: string
		}[]
	}
}

const CollapseCard = ({ title, sub_title, more_info }: CollapseCardProps) => {
	const [collapse, setCollapse] = useState(false)
	const $vibrate = useVibrateStore((s) => s.vibrate)
	const $vibrateHydrated = useVibrateStore.persist.hasHydrated()

	if (!$vibrateHydrated) {
		return (
			<ActivitySection
				title="Collapse Card"
				sub_title="components/CollapseCard"
			/>
		)
	}

	return (
		<View className="flex flex-col gap-2 px-4">
			<View
				className={`${collapse ? "rounded-b-xl rounded-t-3xl" : "rounded-b-3xl rounded-t-3xl"} bg-white dark:bg-neutral-900 p-6 flex flex-col gap-4`}
			>
				<TouchableOpacity
					onPress={() => {
						setCollapse(!collapse)
						$vibrate()
					}}
					className="flex flex-row justify-between items-center"
				>
					<View className="flex-shrink">
						<Text
							className={`text-neutral-700 dark:text-neutral-300 font-semibold text-xl flex-shrink`}
						>
							{title}
						</Text>
						<Text
							className={`text-neutral-500 dark:text-neutral-400 text-wrap text-md flex-shrink`}
						>
							{sub_title}
						</Text>
					</View>

					<View className="">
						{collapse ? (
							<HugeiconsIcon
								className="text-neutral-500 dark:text-neutral-400"
								icon={MinusSignIcon}
							/>
						) : (
							<HugeiconsIcon
								className="text-neutral-500 dark:text-neutral-400"
								icon={ArrowDown01Icon}
							/>
						)}
					</View>
				</TouchableOpacity>
			</View>

			{!collapse ? (
				<></>
			) : (
				<View
					className={`bg-white dark:bg-neutral-900 p-6 rounded-t-xl rounded-b-3xl flex flex-col gap-4`}
				>
					<View className="flex flex-row justify-between items-center">
						<View className="grow flex-shrink">
							<Text
								numberOfLines={1}
								ellipsizeMode="tail"
								className={`text-neutral-700 dark:text-neutral-300 font-semibold text-xl text-wrap flex-shrink`}
							>
								{more_info.title}
							</Text>
							<Text
								numberOfLines={2}
								ellipsizeMode="tail"
								className={`text-neutral-500 dark:text-neutral-400 text-wrap flex-shrink`}
							>
								{more_info.sub_title}
							</Text>
						</View>
					</View>

					{more_info.links ? (
						more_info.links.map((item, index) => (
							<View
								key={`${item.name}-${index}`}
								className="flex flex-row justify-end"
							>
								<TouchableOpacity
									onPress={() => Linking.openURL(item.link)}
									className={`bg-brand-500 dark:bg-brand-900  px-4 py-2 rounded-full`}
								>
									<Text className="text-brand-50">{item.name}</Text>
								</TouchableOpacity>
							</View>
						))
					) : (
						<></>
					)}
				</View>
			)}
		</View>
	)
}

export default CollapseCard
