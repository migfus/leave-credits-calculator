import { Text, TouchableOpacity } from "react-native"
import React, { useCallback, useEffect, useRef } from "react"
import CopyIcon from "@/icons/copyIcon"
import useBottomSheetStore from "@/store/bottomSheetStore"
import XIcon from "@/icons/xIcon"
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetBackdrop,
	BottomSheetView
} from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useThemeStore } from "@/store/themeStore"
import * as Clipboard from "expo-clipboard"

interface Props {
	children: React.ReactNode
}

const BottomSheetModalComponent = ({ children }: Props) => {
	const $list_store = useBottomSheetStore((s) => s.list)
	const $changeListStore = useBottomSheetStore((s) => s.changeList)
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)
	const theme = useThemeStore((s) => s.theme)

	const copyToClipboard = async (text: string) => {
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
		} else {
		}
	}, [$list_store])

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
						backgroundColor: theme
							? "rgba(23, 23, 23, 0.95)"
							: "rgba(245, 245, 245, 0.95)",
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24
					}}
					handleIndicatorStyle={{
						backgroundColor: theme
							? "rgba(250, 250, 250, 0.35)"
							: "rgba(10, 10, 10, 0.25)",
						width: 48
					}}
					backdropComponent={(props) => (
						<BottomSheetBackdrop
							{...props}
							appearsOnIndex={0}
							disappearsOnIndex={-1}
							opacity={theme ? 0.55 : 0.35}
						/>
					)}
				>
					<BottomSheetView className="flex flex-col px-6 pb-10 divide-y gap-6 divide-gray-300">
						{$list_store.map((item, index) =>
							item.type === "copy" ? (
								<TouchableOpacity
									key={index}
									onPress={() => copyToClipboard(item.link)}
									className="flex flex-row justify-end gap-2 items-center"
								>
									<Text className="text-xl font-semibold text-neutral-600">
										{item.name}
									</Text>

									<CopyIcon size={28} color="#484848" />
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									key={index}
									onPress={() => $changeListStore([])}
									className="flex flex-row justify-end gap-2 items-center"
								>
									<Text className="text-xl font-semibold text-neutral-600">
										{item.name}
									</Text>

									<CopyIcon size={28} color="#484848" />
								</TouchableOpacity>
							)
						)}

						<TouchableOpacity
							onPress={() => {
								$changeListStore([])
								bottomSheetModalRef.current?.dismiss()
							}}
							className="flex flex-row justify-end gap-2 items-center mb-6"
						>
							<Text className="text-xl font-semibold text-red-600">Close</Text>

							<XIcon size={28} color="#b32329" />
						</TouchableOpacity>
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}

export default BottomSheetModalComponent
