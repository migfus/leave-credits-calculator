import Svg, { Path } from "react-native-svg"

type IconProps = {
	width?: number
	height?: number
	theme?: boolean
}

export default function HomeIcon({
	width = 24,
	height = 24,
	theme = false
}: IconProps) {
	return theme ? (
		<Svg width={width} height={height} viewBox="0 0 24 24">
			<Path
				fill="#c6c6bb"
				d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3z"
			></Path>
		</Svg>
	) : (
		<Svg width={width} height={height} viewBox="0 0 24 24">
			<Path fill="#303030" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></Path>
		</Svg>
	)
}
