export interface IconProps {
	width?: number
	height?: number
	theme: boolean
}

export interface TabIconProps {
	children: React.ReactNode
	title: string
}

export interface LeaveBalanceHistory {
	hours: string
	minutes: string
	balance: string
	timeStamps: string
}
