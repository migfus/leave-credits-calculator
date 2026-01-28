import { Text, View, ScrollView } from "react-native"
import CollapseCard from "@/components/cards/CollapseCard"

import { useThemeStore } from "@/store/themeStore"
import { useVibrateStore } from "@/store/vibrateStore"
import ActivitySection from "@/components/others/ActivitySection"

const informations = [
	{
		title: "CSC Leave Credits Rule",
		sub_title: "Based on Civil Service Commission computation",
		more_info: {
			title: "Conversion of Working Hours/Minutes into Fraction of a Day",
			sub_title: "Based on 8 Hours Workday",
			links: [
				{
					name: "Omnibus Rule On Leave.pdf",
					link: "https://trd.zamitsolutions.net/resources/zSf5MJdW.pdf"
				}
			]
		}
	},
	{
		title: "Fixed Leave Credits Rule",
		sub_title: "Based on 1/480 computation",
		more_info: {
			title: "Based on 1 minute = 1/480.",
			sub_title: "No longer strictly follows on Civil Service Commission rule"
		}
	}
]

type ConversionRate = {
	title: string
	csc: string
	fixed: string
}

const formatRate = (value: number) => value.toFixed(3)

const conversion_rate: ConversionRate[] = [
	{ title: "8 hr undertime", csc: formatRate(1.0), fixed: formatRate(1.0) },
	{ title: "7 hr undertime", csc: formatRate(0.875), fixed: formatRate(0.875) },
	{ title: "6 hr undertime", csc: formatRate(0.75), fixed: formatRate(0.75) },
	{ title: "5 hr undertime", csc: formatRate(0.625), fixed: formatRate(0.625) },
	{ title: "4 hr undertime", csc: formatRate(0.5), fixed: formatRate(0.5) },
	{ title: "3 hr undertime", csc: formatRate(0.375), fixed: formatRate(0.375) },
	{ title: "2 hr undertime", csc: formatRate(0.25), fixed: formatRate(0.25) },
	{ title: "1 hr undertime", csc: formatRate(0.125), fixed: formatRate(0.125) },
	{
		title: "60 min undertime",
		csc: formatRate(0.125),
		fixed: formatRate(0.125)
	}
]

const minuteOverrides: Record<number, ConversionRate> = {
	59: {
		title: "59 min undertime",
		csc: formatRate(0.123),
		fixed: formatRate(0.123)
	},
	58: {
		title: "58 min undertime",
		csc: formatRate(0.121),
		fixed: formatRate(0.121)
	},
	57: {
		title: "57 min undertime",
		csc: formatRate(0.119),
		fixed: formatRate(0.119)
	},
	56: {
		title: "56 min undertime",
		csc: formatRate(0.117),
		fixed: formatRate(0.117)
	},
	55: {
		title: "55 min undertime",
		csc: formatRate(0.115),
		fixed: formatRate(0.115)
	},
	54: {
		title: "54 min undertime",
		csc: formatRate(0.112),
		fixed: formatRate(0.113)
	},
	53: {
		title: "53 min undertime",
		csc: formatRate(0.11),
		fixed: formatRate(0.11)
	},
	52: {
		title: "52 min undertime",
		csc: formatRate(0.108),
		fixed: formatRate(0.108)
	},
	51: {
		title: "51 min undertime",
		csc: formatRate(0.106),
		fixed: formatRate(0.106)
	},
	50: {
		title: "50 min undertime",
		csc: formatRate(0.104),
		fixed: formatRate(0.104)
	},
	49: {
		title: "49 min undertime",
		csc: formatRate(0.102),
		fixed: formatRate(0.102)
	},
	48: {
		title: "48 min undertime",
		csc: formatRate(0.1),
		fixed: formatRate(0.1)
	},
	47: {
		title: "47 min undertime",
		csc: formatRate(0.098),
		fixed: formatRate(0.098)
	},
	46: {
		title: "46 min undertime",
		csc: formatRate(0.096),
		fixed: formatRate(0.096)
	},
	45: {
		title: "45 min undertime",
		csc: formatRate(0.094),
		fixed: formatRate(0.094)
	},
	44: {
		title: "44 min undertime",
		csc: formatRate(0.092),
		fixed: formatRate(0.092)
	},
	43: {
		title: "43 min undertime",
		csc: formatRate(0.09),
		fixed: formatRate(0.09)
	},
	42: {
		title: "42 min undertime",
		csc: formatRate(0.087),
		fixed: formatRate(0.088)
	},
	41: {
		title: "41 min undertime",
		csc: formatRate(0.085),
		fixed: formatRate(0.085)
	},
	40: {
		title: "40 min undertime",
		csc: formatRate(0.083),
		fixed: formatRate(0.083)
	},
	39: {
		title: "39 min undertime",
		csc: formatRate(0.081),
		fixed: formatRate(0.081)
	},
	38: {
		title: "38 min undertime",
		csc: formatRate(0.079),
		fixed: formatRate(0.079)
	},
	37: {
		title: "37 min undertime",
		csc: formatRate(0.077),
		fixed: formatRate(0.077)
	},
	36: {
		title: "36 min undertime",
		csc: formatRate(0.075),
		fixed: formatRate(0.075)
	},
	35: {
		title: "35 min undertime",
		csc: formatRate(0.073),
		fixed: formatRate(0.073)
	},
	34: {
		title: "34 min undertime",
		csc: formatRate(0.071),
		fixed: formatRate(0.071)
	},
	33: {
		title: "33 min undertime",
		csc: formatRate(0.069),
		fixed: formatRate(0.069)
	},
	32: {
		title: "32 min undertime",
		csc: formatRate(0.067),
		fixed: formatRate(0.067)
	},
	31: {
		title: "31 min undertime",
		csc: formatRate(0.065),
		fixed: formatRate(0.065)
	},
	30: {
		title: "30 min undertime",
		csc: formatRate(0.062),
		fixed: formatRate(0.063)
	},
	29: {
		title: "29 min undertime",
		csc: formatRate(0.06),
		fixed: formatRate(0.06)
	},
	28: {
		title: "28 min undertime",
		csc: formatRate(0.058),
		fixed: formatRate(0.058)
	},
	27: {
		title: "27 min undertime",
		csc: formatRate(0.056),
		fixed: formatRate(0.056)
	},
	26: {
		title: "26 min undertime",
		csc: formatRate(0.054),
		fixed: formatRate(0.054)
	},
	25: {
		title: "25 min undertime",
		csc: formatRate(0.052),
		fixed: formatRate(0.052)
	},
	24: {
		title: "24 min undertime",
		csc: formatRate(0.05),
		fixed: formatRate(0.05)
	},
	23: {
		title: "23 min undertime",
		csc: formatRate(0.048),
		fixed: formatRate(0.048)
	},
	22: {
		title: "22 min undertime",
		csc: formatRate(0.046),
		fixed: formatRate(0.046)
	},
	21: {
		title: "21 min undertime",
		csc: formatRate(0.044),
		fixed: formatRate(0.044)
	},
	20: {
		title: "20 min undertime",
		csc: formatRate(0.042),
		fixed: formatRate(0.042)
	},
	19: {
		title: "19 min undertime",
		csc: formatRate(0.04),
		fixed: formatRate(0.04)
	},
	18: {
		title: "18 min undertime",
		csc: formatRate(0.037),
		fixed: formatRate(0.038)
	},
	17: {
		title: "17 min undertime",
		csc: formatRate(0.035),
		fixed: formatRate(0.035)
	},
	16: {
		title: "16 min undertime",
		csc: formatRate(0.033),
		fixed: formatRate(0.033)
	},
	15: {
		title: "15 min undertime",
		csc: formatRate(0.031),
		fixed: formatRate(0.031)
	},
	14: {
		title: "14 min undertime",
		csc: formatRate(0.029),
		fixed: formatRate(0.029)
	},
	13: {
		title: "13 min undertime",
		csc: formatRate(0.027),
		fixed: formatRate(0.027)
	},
	12: {
		title: "12 min undertime",
		csc: formatRate(0.025),
		fixed: formatRate(0.025)
	},
	11: {
		title: "11 min undertime",
		csc: formatRate(0.023),
		fixed: formatRate(0.023)
	},
	10: {
		title: "10 min undertime",
		csc: formatRate(0.021),
		fixed: formatRate(0.021)
	},
	9: {
		title: "9 min undertime",
		csc: formatRate(0.019),
		fixed: formatRate(0.019)
	},
	8: {
		title: "8 min undertime",
		csc: formatRate(0.017),
		fixed: formatRate(0.017)
	},
	7: {
		title: "7 min undertime",
		csc: formatRate(0.015),
		fixed: formatRate(0.016)
	},
	6: {
		title: "6 min undertime",
		csc: formatRate(0.012),
		fixed: formatRate(0.013)
	},
	5: {
		title: "5 min undertime",
		csc: formatRate(0.01),
		fixed: formatRate(0.01)
	},
	4: {
		title: "4 min undertime",
		csc: formatRate(0.008),
		fixed: formatRate(0.008)
	},
	3: {
		title: "3 min undertime",
		csc: formatRate(0.006),
		fixed: formatRate(0.006)
	},
	2: {
		title: "2 min undertime",
		csc: formatRate(0.004),
		fixed: formatRate(0.004)
	},
	1: {
		title: "1 min undertime",
		csc: formatRate(0.002),
		fixed: formatRate(0.002)
	}
}

for (let minutes = 59; minutes >= 1; minutes -= 1) {
	const override = minuteOverrides[minutes]
	if (override) {
		conversion_rate.push(override)
	} else {
		const computed = minutes / 480
		const rate = formatRate(computed)
		conversion_rate.push({
			title: `${minutes} min undertime`,
			csc: rate,
			fixed: rate
		})
	}
}

const Information = () => {
	const $theme = useThemeStore((s) => s.theme)
	const $theme_hydrated = useThemeStore.persist.hasHydrated()

	if (!$theme_hydrated) {
		return (
			<ActivitySection title="Hydrating..." sub_title="(tabs)/information" />
		)
	}

	return (
		<View className={`${$theme ? "bg-neutral-950" : "bg-neutral-200"} flex-1`}>
			<ScrollView
				className="gap-2 py-4"
				contentContainerStyle={{ paddingBottom: 24, gap: 8 }}
				showsVerticalScrollIndicator={false}
			>
				{informations.map((item) => {
					return (
						<View key={item.title} className="px-4">
							<CollapseCard
								title={item.title}
								sub_title={item.sub_title}
								more_info={item.more_info}
							/>
						</View>
					)
				})}

				{conversion_rate.map((item, index) => {
					return (
						<View key={index} className="px-4">
							<View
								className={`${index === 0 ? "rounded-t-3xl" : "rounded-t-xl"} ${index === conversion_rate.length - 1 ? "rounded-b-3xl" : "rounded-b-xl"} ${$theme ? "bg-neutral-900" : "bg-white"}  p-6 flex flex-row gap-2 justify-between`}
							>
								<Text
									className={`${$theme ? "text-neutral-300" : " text-neutral-600"} font-semibold`}
								>
									{item.title}
								</Text>

								{item.csc === item.fixed ? (
									<View className="flex flex-row gap-2">
										<View
											className={`${$theme ? "bg-red-800" : "bg-red-50"} items-center flex flex-row gap-2  px-3 py-1 rounded-full`}
										>
											<Text
												className={`${$theme ? "text-orange-100" : "text-orange-700"} font-semibold text-sm`}
											>
												{`CSC & Fixed`}
											</Text>
											<Text
												className={`${$theme ? "text-red-100" : "text-orange-700"} font-semibold text-sm`}
											>
												{`-${item.csc}`}
											</Text>
										</View>
									</View>
								) : (
									<View className="flex flex-row gap-2">
										<View
											className={`${$theme ? "bg-red-800" : "bg-red-50"} items-center flex flex-row gap-2  px-3 py-1 rounded-full`}
										>
											<Text
												className={`${$theme ? "text-red-100" : "text-red-700"} font-semibold text-sm`}
											>
												{`CSC`}
											</Text>
											<Text
												className={`${$theme ? "text-red-100" : "text-red-700"} font-semibold text-sm`}
											>
												{`-${item.csc}`}
											</Text>
										</View>

										<View
											className={`${$theme ? "bg-orange-800" : "bg-orange-50"} items-center flex flex-row gap-2  px-3 py-1 rounded-full`}
										>
											<Text
												className={`${$theme ? "text-orange-100" : "text-orange-700"} font-semibold text-sm`}
											>
												{`Fixed`}
											</Text>
											<Text
												className={`${$theme ? "text-orange-100" : "text-orange-700"} font-semibold text-sm`}
											>
												{`-${item.fixed}`}
											</Text>
										</View>
									</View>
								)}
							</View>
						</View>
					)
				})}
			</ScrollView>
		</View>
	)
}

export default Information
