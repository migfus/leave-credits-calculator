import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface IntroStore {
	show_intro: boolean
	removeIntro: () => void
}

export const useIntroStore = create<IntroStore>()(
	persist(
		(set, get) => ({
			show_intro: true,
			removeIntro: () => {
				set({ show_intro: !get().show_intro })
			}
		}),
		{
			name: "intro",
			storage: createJSONStorage(() => AsyncStorage, {
				reviver: (key, value) => {
					if (key === "intro") {
						return value === true || value === "true"
					}
					return value
				}
			})
		}
	)
)
