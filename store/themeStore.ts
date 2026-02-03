import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { useVibrateStore } from "./vibrateStore"

interface ThemeStore {
	theme: boolean
	toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			theme: true,
			toggleTheme: () => {
				set({ theme: !get().theme })
				// Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
				// useVibrateStore.getState().vibrate()
			}
		}),
		{
			name: "theme",
			storage: createJSONStorage(() => AsyncStorage, {
				reviver: (key, value) => {
					if (key === "theme") {
						return value === true || value === "true"
					}
					return value
				}
			})
		}
	)
)
