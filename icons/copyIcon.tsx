import { IconProps } from "@/globalInterface"
import { View } from "react-native"
import Svg, { Path } from "react-native-svg"

export default function CopyIcon({ size = 24, color = "#222" }: IconProps) {
	return (
		<View className="ml-1">
			<Svg width={size * 0.9} height={size * 0.9} viewBox="0 0 24 24">
				<Path
					fill={color}
					d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
				></Path>
			</Svg>
		</View>
	)
}
