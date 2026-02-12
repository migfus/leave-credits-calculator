const path = require("path")
const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")
const {
	wrapWithReanimatedMetroConfig
} = require("react-native-reanimated/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

// 1. Add support for additional file extensions
// (Required for libraries like Moti and Framer Motion)
config.resolver.sourceExts.push("cjs", "mjs")

// 2. The "Moti Fix": Resolve tslib/__extends undefined error
// This forces Metro to resolve all tslib calls to a single, stable source file.
config.resolver.unstable_enablePackageExports = false

const originalResolveRequest = config.resolver.resolveRequest

config.resolver.resolveRequest = (context, moduleName, platform) => {
	if (moduleName === "tslib" || moduleName.endsWith("/tslib")) {
		return {
			filePath: path.resolve(__dirname, "node_modules/tslib/tslib.js"),
			type: "sourceFile"
		}
	}

	if (originalResolveRequest) {
		return originalResolveRequest(context, moduleName, platform)
	}

	return context.resolveRequest(context, moduleName, platform)
}

// 3. Chain the configurations correctly
// We wrap the base config with Reanimated first
const reanimatedConfig = wrapWithReanimatedMetroConfig(config)

// Then wrap that result with NativeWind and export it
module.exports = withNativeWind(reanimatedConfig, {
	input: "./app/global.css"
})
