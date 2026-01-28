import { Text, TouchableOpacity } from "react-native"
import CopyIcon from "@/icons/copyIcon"
import XIcon from "@/icons/xIcon"
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetBackdrop,
	BottomSheetView
} from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import CheckIcon from "@/icons/checkIcon"
import CircleIcon from "@/icons/circleIcon"

import React, { useCallback, useEffect, useRef } from "react"
import useBottomSheetStore from "@/store/bottomSheetStore"
import { useThemeStore } from "@/store/themeStore"
import * as Clipboard from "expo-clipboard"
import { useVibrateStore } from "@/store/vibrateStore"
import ActivitySection from "../others/ActivitySection"

interface Props {
	children: React.ReactNode
}

const BottomSheetModalComponent = ({ children }: Props) => {
	const $list_store = useBottomSheetStore((s) => s.list)
	const $changeListStore = useBottomSheetStore((s) => s.changeList)
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)
	const $theme = useThemeStore((s) => s.theme)
	const $themeHydated = useThemeStore.persist.hasHydrated()
	const $vibrate = useVibrateStore((s) => s.vibrate)
	const $vibrateHydated = useVibrateStore.persist.hasHydrated()

	const copyToClipboard = async (text: string) => {
		$vibrate()
		await Clipboard.setStringAsync(text)
	}

	const handleSheetChanges = useCallback(
		(index: number) => {
			if (index === -1) {
				$changeListStore([])
			}
		},
		[$changeListStore]
	)

	useEffect(() => {
		if ($list_store.length > 0) {
			bottomSheetModalRef.current?.present()
			$vibrate()
		} else {
			bottomSheetModalRef.current?.dismiss()
		}
	}, [$list_store, $vibrate])

	if (!$themeHydated || !$vibrateHydated) {
		return (
			<ActivitySection title="Hydrating..." sub_title="Bottom Sheet Modal" />
		)
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				{children}

				{/* Keep the modal mounted separately from the main view */}
				<BottomSheetModal
					ref={bottomSheetModalRef}
					onChange={handleSheetChanges}
					enablePanDownToClose
					backgroundStyle={{
						backgroundColor: $theme
							? "rgba(23, 23, 23, 0.95)"
							: "rgba(245, 245, 245, 0.95)",
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24
					}}
					handleIndicatorStyle={{
						backgroundColor: $theme
							? "rgba(250, 250, 250, 0.35)"
							: "rgba(10, 10, 10, 0.25)",
						width: 48
					}}
					backdropComponent={(props) => (
						<BottomSheetBackdrop
							{...props}
							appearsOnIndex={0}
							disappearsOnIndex={-1}
							opacity={$theme ? 0.55 : 0.35}
						/>
					)}
				>
					<BottomSheetView
						className="flex flex-col divide-y divide-gray-300"
						style={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 24 }}
					>
						{$list_store.map((item, index) =>
							item.type === "copy" ? (
								<TouchableOpacity
									key={index}
									onPress={() => copyToClipboard(item.link)}
									className="flex flex-row justify-end gap-2 items-center mt-4"
								>
									<Text
										className={`${$theme ? "text-neutral-300" : "text-neutral-600"} text-xl font-semibold`}
									>
										{item.name}
									</Text>

									<CopyIcon size={28} color={$theme ? "#cecece" : "#191919"} />
								</TouchableOpacity>
							) : item.type === "check" ? (
								<TouchableOpacity
									key={index}
									onPress={() => {
										item.callback()
										$vibrate()
									}}
									className="flex flex-row justify-end gap-2 items-center mt-4"
								>
									<Text
										className={`${$theme ? "text-neutral-300" : "text-neutral-600"} text-xl font-semibold`}
									>
										{item.name}
									</Text>

									{item.active ? (
										<CheckIcon
											size={28}
											color={$theme ? "#b0b0b0" : "#191919"}
										/>
									) : (
										<CircleIcon
											size={28}
											color={$theme ? "#b0b0b0" : "#191919"}
										/>
									)}
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									key={index}
									onPress={() => $changeListStore([])}
									className="flex flex-row justify-end gap-2 items-center mt-4"
								>
									<Text className="text-xl font-semibold text-neutral-600">
										{item.name}
									</Text>

									<CopyIcon size={28} color={$theme ? "#cecece" : "#191919"} />
								</TouchableOpacity>
							)
						)}

						<TouchableOpacity
							onPress={() => {
								$changeListStore([])
								bottomSheetModalRef.current?.dismiss()
								$vibrate()
							}}
							className="flex flex-row justify-end gap-2 items-center mb-6 mt-4"
						>
							<Text
								className={`${$theme ? "text-red-400" : "text-red-600"} text-xl font-semibold `}
							>
								Close
							</Text>

							<XIcon size={28} color={$theme ? "#c96062" : "#b32329"} />
						</TouchableOpacity>
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}

export default BottomSheetModalComponent
