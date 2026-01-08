import { IconProps } from "@/globalInterface"
import Svg, { Path } from "react-native-svg"

export default function HistoryIcon({
	width = 24,
	height = 24,
	color = "#000",
	outline = false
}: IconProps) {
	return outline ? (
		<Svg width={width} height={height} viewBox="0 0 24 24">
			<Path
				fill={color}
				d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"
			></Path>
		</Svg>
	) : (
		<Svg width={width} height={height} viewBox="0 0 24 24">
			<Path
				fill={color}
				d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m3.3 14.71L11 12.41V7h2v4.59l3.71 3.71z"
			></Path>
		</Svg>
	)
}
