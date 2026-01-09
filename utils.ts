// TODO: FIX SOME FUTURE SHITS
import moment from "moment"

export function leaveBalanceComputation(data: {
	balance: string
	hours: string
	minutes: string
}): number[] {
	// CONVERT 1/480
	const computed_hours = leaveEquivalentFromCSV(Number(data.hours) * 60)
	const computed_mins = leaveEquivalentFromCSV(Number(data.minutes))
	const cost = computed_hours + computed_mins

	return [cost, roundUp(Number(data.balance) - cost)]
	// return Number(data.balance) + Number(data.hours) + Number(data.minutes)
}

function roundUp(value: number, decimals = 3) {
	const factor = 10 ** decimals
	return Math.ceil(value * factor) / factor
}

function leaveEquivalentFromCSV(minutes: number) {
	// Step 1: convert input safely
	if (typeof minutes !== "number" || isNaN(minutes)) {
		return 0
	}

	// Step 2: base calculation
	const raw = minutes / 480

	// Step 3: scale for 3 decimal rounding
	const scaled = raw * 1000

	// Step 4: banker’s rounding (round half to even)
	const floor = Math.floor(scaled)
	const diff = scaled - floor

	let rounded

	if (diff > 0.5) {
		rounded = floor + 1
	} else if (diff < 0.5) {
		rounded = floor
	} else {
		// exactly .5 → round to EVEN
		rounded = floor % 2 === 0 ? floor : floor + 1
	}

	// Step 5: scale back
	return rounded / 1000
}

export function messengerStyleTime(timestamp: string) {
	const now = moment()
	const date = moment(timestamp)

	if (now.isSame(date, "day")) {
		// Today: show time like 3:15 PM
		return date.format("h:mm A")
	} else if (now.subtract(1, "day").isSame(date, "day")) {
		// Yesterday: show "Yesterday"
		return "Ytd"
	} else if (now.isSame(date, "week")) {
		// Same week: show weekday name like "Monday"
		return date.format("ddd")
	} else if (now.isSame(date, "year")) {
		// Same year: show like "Feb 20"
		return date.format("MMM D")
	} else {
		// Older: show like "2 years ago"
		return date.fromNow()
	}
}
