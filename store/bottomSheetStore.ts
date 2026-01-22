import { create } from "zustand"

interface ThemeStore {
	list: {
		name: string
		link: string
		type: "copy" | "link" | "callback"
	}[]
	changeList: (list: ThemeStore["list"]) => void
}

const useBottomSheetStore = create<ThemeStore>((set) => ({
	list: [],
	show_bottom_sheet: false,
	changeList: (list) => {
		set({ list })
	}
}))

export default useBottomSheetStore
