import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import * as Haptics from "expo-haptics"

interface ThemeStore {
	vibrate_on: boolean
	toggleVibrate: () => void
	vibrate: () => void
}

export const useVibrateStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			vibrate_on: true,
			toggleVibrate: () => {
				set({ vibrate_on: !get().vibrate_on })
				if (get().vibrate_on) {
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
				}
			},
			vibrate: () => {
				if (get().vibrate_on) {
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
				}
			}
		}),
		{
			name: "vibrate_on",
			storage: createJSONStorage(() => AsyncStorage, {
				reviver: (key, value) => {
					if (key === "vibrate_on") {
						return value === true || value === "true"
					}
					return value
				}
			})
		}
	)
)
