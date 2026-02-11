// TODO: FIX SOME FUTURE SHITS
import moment from "moment"

export function leaveBalanceComputation(data: {
	balance: string
	hours: string
	minutes: string
	method: "CSC Leave Credits Rule" | "Fixed Leave Credits Rule"
}): string[] {
	// CONVERT 1/480
	// let computed_hours = 0
	let computed_mins = 0
	if (data.method === "CSC Leave Credits Rule") {
		computed_mins = leaveConvertionFromCSC(
			Number(data.hours) * 60 + Number(data.minutes)
		)
	} else {
		computed_mins = leaveConvertionFromFixed(
			Number(data.minutes) + Number(data.hours) * 60
		)
	}

	let final_balance = roundUp(Number(data.balance) - computed_mins)
	// Add .000 if cost is a whole number (e.g., 2 → 2.000)
	if (Number.isInteger(computed_mins)) {
		computed_mins = Number(computed_mins.toFixed(3))
	}

	if (Number.isInteger(Number(final_balance))) {
		final_balance = Number(final_balance.toFixed(3))
	}

	return [
		formatBalance(computed_mins.toString()),
		formatBalance(final_balance.toString())
	]

	// return Number(data.balance) + Number(data.hours) + Number(data.minutes)
}

function formatBalance(balance: string): string {
	if (!balance) {
		return "0.000"
	}

	// Ensure 3 decimal places:
	// 1 -> 1.000, 1.1 -> 1.100, 1.11 -> 1.110, 1.111 -> 1.111
	const v = balance.startsWith(".") ? `0${balance}` : balance
	const [intPart, fracPart] = v.split(".")

	if (fracPart === undefined) {
		return `${intPart}.000`
	}

	if (fracPart.length >= 3) {
		return `${intPart}.${fracPart}`
	}

	return `${intPart}.${fracPart.padEnd(3, "0")}`
}

function roundUp(value: number, decimals = 3) {
	const factor = 10 ** decimals
	return Math.ceil(value * factor) / factor
}

function leaveConvertionFromCSC(minutes: number) {
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

function leaveConvertionFromFixed(minutes: number) {
	// Step 1: convert input safely
	if (typeof minutes !== "number" || isNaN(minutes)) {
		return 0
	}

	// Step 2: base calculation
	const raw = minutes / 480

	// Step 3: scale for 3 decimal rounding
	const scaled = raw * 1000

	// Step 4: round up only when reaching 0.5
	const floor = Math.floor(scaled)
	const diff = scaled - floor

	const rounded = diff >= 0.5 ? floor + 1 : floor

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
