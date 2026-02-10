import { useIntroStore } from "@/store/introStore"
import { Stack } from "expo-router"
import {
	FlatList,
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Switch,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import ActivitySection from "@/components/others/ActivitySection"
import { useVibrateStore } from "@/store/vibrateStore"
import {
	ArrowDown01Icon,
	ArrowLeft02Icon,
	ArrowRight02Icon,
	Cancel01Icon,
	CheckmarkCircle01Icon,
	CircleIcon
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react-native"
import { StatusBar } from "expo-status-bar"
import { useColorScheme } from "nativewind"
import { useRef, useState } from "react"
import "./global.css"
import useComputationMethodStore from "@/store/computationMethodStore"

export default function RootLayout() {
	const $show_intro = useIntroStore((s) => s.show_intro)
	const $hydratedIntroStore = useIntroStore.persist.hasHydrated()

	if (!$hydratedIntroStore) {
		return <ActivitySection title="Loading..." sub_title="/intro" />
	}

	return (
		<>
			{$show_intro ? (
				<IntroScreen></IntroScreen>
			) : (
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />{" "}
				</Stack>
			)}
		</>
	)
}

const intro_data = [
	{
		title: "Welcome to the LCBC",
		sub_title: "Were you can compute the Employee's Leave Credits"
	},
	{
		title: "Makes easier to compute now.",
		sub_title: "Quick and accurate at your fingertips."
	},
	{
		title: "You can select the rule type.",
		sub_title: "Switch between CSC leave rule or fixed rule."
	},
	{
		title: "Select your theme",
		sub_title: "You can go light or dark mode."
	}
]

const bottom_indicator = [1, 2, 3, 4]

function IntroScreen() {
	const flatListRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const $removeIntro = useIntroStore((s) => s.removeIntro)
	const $vibrate = useVibrateStore((s) => s.vibrate)
	const { width: screen_width } = useWindowDimensions()
	const { colorScheme, toggleColorScheme } = useColorScheme()
	const $computation_method = useComputationMethodStore((s) => s.method)
	const $changeMethod = useComputationMethodStore((s) => s.changeMethod)
	const $hydrateComputationMethod =
		useComputationMethodStore.persist.hasHydrated()

	const handleNavigation = (direction: "next" | "prev") => {
		let nextIndex = direction === "next" ? activeIndex + 1 : activeIndex - 1

		// Boundary checks to prevent index out of bounds
		if (nextIndex >= 0 && nextIndex < intro_data.length) {
			// @ts-ignore
			flatListRef.current?.scrollToIndex({
				index: nextIndex,
				animated: true
			})
			// activeIndex is usually updated via onScroll,
			// but you can set it manually here for immediate UI feedback
			setActiveIndex(nextIndex)
		}
		$vibrate()
	}

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const scroll_x = event.nativeEvent.contentOffset.x

		const index = Math.round(scroll_x / screen_width)
		setActiveIndex(index)
	}

	function removeIntro() {
		$removeIntro()
		$vibrate()
	}

	if (!$hydrateComputationMethod) {
		return <ActivitySection title="Hydrating..." sub_title="/intro" />
	}

	return (
		<SafeAreaView className="flex-1 bg-neutral-200 dark:bg-neutral-950 ">
			<FlatList
				ref={flatListRef}
				data={intro_data}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				onMomentumScrollEnd={handleScroll}
				renderItem={({ item }) => {
					return item.title === "Welcome to the LCBC" ? (
						<Slide title={item.title} sub_title={item.sub_title}>
							<View className="flex flex-row justify-center">
								<Image
									source={require("../assets/images/favicon.png")}
									className="size-72 rounded-3xl"
								/>
							</View>
						</Slide>
					) : item.title === "Makes easier to compute now." ? (
						<Slide title={item.title} sub_title={item.sub_title}>
							<View className="flex flex-row justify-center">
								<Image
									source={require("../assets/images/slide02.jpg")}
									className="size-72 rounded-3xl"
								/>
							</View>
						</Slide>
					) : item.title === "You can select the rule type." ? (
						<Slide title={item.title} sub_title={item.sub_title}>
							<View className="px-4 flex gap-2">
								<View className="bg-white dark:bg-neutral-900 rounded-3xl p-6">
									<View className="flex flex-row justify-between items-center">
										<Text className="text-neutral-600 dark:text-neutral-300 font-semibold">
											Computation Mode
										</Text>

										<View className="flex flex-row gap-2">
											<Text
												className={"text-neutral-500 dark:text-neutral-400"}
											>
												{$computation_method}
											</Text>
											<HugeiconsIcon
												icon={ArrowDown01Icon}
												className="text-neutral-700 dark:text-neutral-300"
											/>
										</View>
									</View>
								</View>

								<TouchableOpacity
									onPress={() => {
										$changeMethod("CSC Leave Credits Rule")
										console.log("changed")
									}}
									className="bg-white dark:bg-neutral-900 rounded-3xl p-6"
								>
									<View className="flex flex-row justify-between items-center">
										<Text className="text-neutral-600 dark:text-neutral-300 font-semibold">
											CSC Leave Credits Rule
										</Text>

										<View className="flex flex-row gap-2">
											{$computation_method === "CSC Leave Credits Rule" ? (
												<HugeiconsIcon
													icon={CheckmarkCircle01Icon}
													className="text-neutral-700 dark:text-neutral-300"
												/>
											) : (
												<HugeiconsIcon
													icon={CircleIcon}
													className="text-neutral-700 dark:text-neutral-300"
												/>
											)}
										</View>
									</View>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										$changeMethod("Fixed Leave Credits Rule")
										console.log("changed")
									}}
									className="bg-white dark:bg-neutral-900 rounded-3xl p-6"
								>
									<View className="flex flex-row justify-between items-center">
										<Text className="text-neutral-600 dark:text-neutral-300 font-semibold">
											Fixed Leave Credits Rule
										</Text>

										<View className="flex flex-row gap-2">
											{$computation_method === "Fixed Leave Credits Rule" ? (
												<HugeiconsIcon
													icon={CheckmarkCircle01Icon}
													className="text-neutral-700 dark:text-neutral-300"
												/>
											) : (
												<HugeiconsIcon
													icon={CircleIcon}
													className="text-neutral-700 dark:text-neutral-300"
												/>
											)}
										</View>
									</View>
								</TouchableOpacity>
							</View>
						</Slide>
					) : item.title === "Select your theme" ? (
						<Slide title={item.title} sub_title={item.sub_title}>
							<View className="px-4">
								<TouchableOpacity
									className="bg-white dark:bg-neutral-900 rounded-3xl p-6"
									onPress={toggleColorScheme}
								>
									<View className="flex flex-row justify-between items-center">
										<Text className="text-neutral-600 dark:text-neutral-300 font-semibold">
											Dark Mode
										</Text>

										<Switch
											value={colorScheme === "dark"}
											onValueChange={toggleColorScheme}
											trackColor={{ false: "#ccc", true: "#4ade80" }}
											thumbColor={
												colorScheme === "dark" ? "#22c55e" : "#f4f4f5"
											}
											style={{ height: 32, width: 32 }}
										/>
									</View>
								</TouchableOpacity>
							</View>
						</Slide>
					) : (
						<View>
							<Text>Buggs</Text>
						</View>
					)
				}}
			></FlatList>

			{/* SECTION INDICATOR */}
			<View className="my-4 items-center justify-center">
				<FlatList
					data={bottom_indicator}
					horizontal
					scrollEnabled={false}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(_, index) => index.toString()}
					contentContainerClassName="flex-row gap-2 grow justify-center items-center"
					renderItem={({ item, index }) => {
						const isActive = activeIndex === index

						return (
							<View
								className={`h-2 rounded-full transition-all ${
									isActive
										? "w-8 bg-neutral-600 dark:bg-neutral-300"
										: "w-2 bg-neutral-300 dark:bg-neutral-500"
								}`}
							/>
						)
					}}
				/>
			</View>

			{/* SECTION BUTTONS */}
			<View className="flex flex-row justify-between mb-4">
				<TouchableOpacity
					className="rounded-3xl p-4 flex flex-row gap-2"
					onPress={() => removeIntro()}
				>
					<Text>Skip</Text>
					<HugeiconsIcon icon={Cancel01Icon} />
				</TouchableOpacity>

				<View className="flex flex-row px-4 gap-4 justify-end">
					{activeIndex !== 0 ? (
						<TouchableOpacity
							className="bg-white dark:bg-neutral-950 rounded-3xl p-4 flex flex-row gap-2"
							onPress={() => handleNavigation("prev")}
						>
							<HugeiconsIcon
								icon={ArrowLeft02Icon}
								className="text-neutral-700 dark:text-neutral-300"
							/>
							<Text className="text-neutral-700 dark:text-neutral-300">
								Previous
							</Text>
						</TouchableOpacity>
					) : (
						<></>
					)}

					{activeIndex < intro_data.length - 1 ? (
						<TouchableOpacity
							className="bg-white dark:bg-neutral-950 rounded-3xl p-4 flex flex-row gap-2"
							onPress={() => handleNavigation("next")}
						>
							<Text className="text-neutral-700 dark:text-neutral-300">
								Next
							</Text>
							<HugeiconsIcon
								icon={ArrowRight02Icon}
								className="text-neutral-700 dark:text-neutral-300"
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							className="bg-white dark:bg-neutral-950 rounded-3xl p-4 flex flex-row gap-2"
							onPress={() => removeIntro()}
						>
							<Text className="text-neutral-700 dark:text-neutral-300">
								Done
							</Text>
							<HugeiconsIcon
								icon={CheckmarkCircle01Icon}
								className="text-neutral-700 dark:text-neutral-300"
							/>
						</TouchableOpacity>
					)}
				</View>
			</View>

			<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
		</SafeAreaView>
	)
}

function Slide({
	children,
	title,
	sub_title
}: {
	children: React.ReactElement
	title: string
	sub_title: string
}) {
	return (
		<View className={`w-screen flex flex-col pt-8 pb-8 gap-8`}>
			<View className="flex flex-col gap-2 p-6 bg-white dark:bg-neutral-900 rounded-3xl mx-4">
				<Text
					className={`text-neutral-700 dark:text-neutral-300 font-bold text-3xl `}
				>
					{title}
				</Text>
				<Text
					className={`text-neutral-600 dark:text-neutral-400 font-semibold`}
				>
					{sub_title}
				</Text>
			</View>

			{children}
		</View>
	)
}
