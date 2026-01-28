import { Linking, Text, TouchableOpacity, View } from "react-native"
import ChevronDownIcon from "@/icons/chevronDownIcon"
import MinusIcon from "@/icons/minusIcon"

import React, { useState } from "react"
import { useThemeStore } from "@/store/themeStore"
import { useVibrateStore } from "@/store/vibrateStore"

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
	const $theme = useThemeStore((s) => s.theme)
	const $peristTheme = useThemeStore.persist.hasHydrated()
	const $vibrate = useVibrateStore((s) => s.vibrate)
	const $vibrateHydrated = useVibrateStore.persist.hasHydrated()

	if (!$peristTheme && !$vibrateHydrated) {
		return
	}

	return (
		<View className="flex flex-col gap-2">
			<View
				className={`${collapse ? "rounded-b-xl rounded-t-3xl" : "rounded-b-3xl rounded-t-3xl"} ${$theme ? "bg-neutral-900" : "bg-white"} p-6 flex flex-col gap-4`}
			>
				<TouchableOpacity
					onPress={() => {
						setCollapse(!collapse)
						$vibrate()
					}}
					className="flex flex-row justify-between items-center"
				>
					<View className="flex flex-col gap-2">
						<Text
							className={`${$theme ? "text-neutral-300" : "text-neutral-700"} font-semibold text-xl text-wrap`}
						>
							{title}
						</Text>
						<Text
							className={`${$theme ? "text-neutral-400" : "text-neutral-500"} text-wrap`}
						>
							{sub_title}
						</Text>
					</View>

					{collapse ? (
						<MinusIcon color={$theme ? "#898989" : "#393939"} />
					) : (
						<ChevronDownIcon color={$theme ? "#898989" : "#393939"} />
					)}
				</TouchableOpacity>
			</View>

			{!collapse ? (
				<></>
			) : (
				<View
					className={`${$theme ? "bg-neutral-900" : "bg-white"} p-6 rounded-t-xl rounded-b-3xl flex flex-col gap-4`}
				>
					<View className="flex flex-row justify-between items-center">
						<View className="flex flex-col gap-2 flex-1 min-w-0">
							<Text
								numberOfLines={1}
								ellipsizeMode="tail"
								className={`${$theme ? "text-neutral-300" : "text-neutral-700"} font-semibold text-xl text-wrap flex-shrink`}
							>
								{more_info.title}
							</Text>
							<Text
								numberOfLines={2}
								ellipsizeMode="tail"
								className={`${$theme ? "text-neutral-400" : "text-neutral-500"} text-wrap flex-shrink`}
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
									className={`${$theme ? "bg-brand-900" : "bg-brand-500"}  px-4 py-2 rounded-full`}
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
