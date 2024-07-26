module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@babel/preset-flow'
  ],
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
  ],
};
