import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView
} from "@gorhom/bottom-sheet"
import {
	Cancel01Icon,
	CheckmarkCircle04Icon,
	CircleIcon,
	Copy01Icon
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react-native"
import { Text, TouchableOpacity } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import useBottomSheetStore from "@/store/bottomSheetStore"
import { useVibrateStore } from "@/store/vibrateStore"
import * as Clipboard from "expo-clipboard"
import { useColorScheme } from "nativewind"
import React, { useCallback, useEffect, useRef } from "react"
import ActivitySection from "../others/ActivitySection"

export default function BottomSheetModalComponent({
	children
}: {
	children: React.ReactNode
}) {
	const $list_store = useBottomSheetStore((s) => s.list)
	const $changeListStore = useBottomSheetStore((s) => s.changeList)
	const $vibrate = useVibrateStore((s) => s.vibrate)
	const $vibrateHydated = useVibrateStore.persist.hasHydrated()
	const { colorScheme } = useColorScheme()

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

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

	if (!$vibrateHydated) {
		return (
			<ActivitySection title="Hydrating..." sub_title="Bottom Sheet Modal" />
		)
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				{children}

				<BottomSheetModal
					ref={bottomSheetModalRef}
					onChange={handleSheetChanges}
					enablePanDownToClose
					backgroundStyle={{
						backgroundColor:
							colorScheme === "dark"
								? "rgba(23, 23, 23, 0.95)"
								: "rgba(245, 245, 245, 0.95)",
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24
					}}
					handleIndicatorStyle={{
						backgroundColor:
							colorScheme === "dark"
								? "rgba(250, 250, 250, 0.35)"
								: "rgba(10, 10, 10, 0.25)",
						width: 48
					}}
					backdropComponent={(props) => (
						<BottomSheetBackdrop
							{...props}
							appearsOnIndex={0}
							disappearsOnIndex={-1}
							opacity={colorScheme === "dark" ? 0.55 : 0.35}
						/>
					)}
				>
					<BottomSheetView
						className="flex flex-col divide-y divide-gray-300"
						style={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 24 }}
					>
						{$list_store.map((item, i) =>
							item.type === "copy" ? (
								<TouchableOpacity
									key={i}
									onPress={() => copyToClipboard(item.link)}
									className="flex flex-row justify-end gap-2 items-center mt-4"
								>
									<Text className="text-neutral-600 dark:text-neutral-300 text-xl font-semibold">
										{item.name}
									</Text>

									<HugeiconsIcon
										icon={Copy01Icon}
										strokeWidth={2}
										className="text-neutral-600 dark:text-neutral-300"
									/>
								</TouchableOpacity>
							) : item.type === "check" ? (
								<TouchableOpacity
									key={i}
									onPress={() => {
										item.callback()
										$vibrate()
									}}
									className="flex flex-row justify-end gap-2 items-center mt-4"
								>
									{item.active ? (
										<>
											<Text className="text-neutral-600 dark:text-neutral-300 text-xl font-semibold">
												{item.name}
											</Text>
											<HugeiconsIcon
												icon={CheckmarkCircle04Icon}
												strokeWidth={2}
												className="text-neutral-600 dark:text-neutral-300"
											/>
										</>
									) : (
										<>
											<Text className="text-neutral-500 dark:text-neutral-400 text-xl font-semibold">
												{item.name}
											</Text>
											<HugeiconsIcon
												icon={CircleIcon}
												strokeWidth={2}
												className="text-neutral-500 dark:text-neutral-400"
											/>
										</>
									)}
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									key={i}
									onPress={() => $changeListStore([])}
									className="flex flex-row justify-end gap-2 items-center mt-4"
								>
									<Text className="text-xl font-semibold text-neutral-600">
										{item.name}
									</Text>

									<HugeiconsIcon
										icon={Copy01Icon}
										strokeWidth={2}
										className="text-neutral-600 dark:text-neutral-200"
									/>
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
							<Text className="text-red-600 dark:text-red-400 text-xl font-semibold">
								Close
							</Text>

							<HugeiconsIcon
								icon={Cancel01Icon}
								strokeWidth={2}
								className="text-red-600 dark:text-red-400"
							/>
						</TouchableOpacity>
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}
