import { LeaveBalanceHistory } from "@/globalInterface"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface LeaveHistoryState {
	history: LeaveBalanceHistory[]
	addHistory: (item: LeaveBalanceHistory) => void
	reset: () => void
	onHistoryUpdate?: (callback: () => void) => void
}
export const useLeaveHistory = create<LeaveHistoryState>()(
	persist(
		(set) => ({
			history: [],

			addHistory: (item) =>
				set((state) => ({
					history: [...state.history, item]
				})),

			reset: () =>
				set(() => {
					return {
						history: []
					}
				}),
			onHistoryUpdate: undefined
		}),
		{
			name: "leave-history-store",
			storage: createJSONStorage(() => AsyncStorage)
		}
	)
)
