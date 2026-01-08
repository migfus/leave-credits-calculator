// TODO: FIX SOME FUTURE SHITS

export function leaveBalanceComputation(data: {
	balance: string
	hours: string
	minutes: string
}): number {
	return Number(data.balance) + Number(data.hours) + Number(data.minutes)
}
