module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo|react-native-reanimated|expo-modules-core|@unimodules|react-native-gesture-handler|@react-navigation)'
  ],
};
