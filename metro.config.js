const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
  // Get the default Metro configuration
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  // Add support for SVG using react-native-svg-transformer
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"), // SVG transformer
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"), // Remove .svg from asset extensions
    sourceExts: [...resolver.sourceExts, "svg"], // Add .svg as a source extension
  };

  // Add NativeWind Tailwind support
  return withNativeWind(config, {
    input: "./global.css", // Ensure this matches your Tailwind setup
  });
})();
