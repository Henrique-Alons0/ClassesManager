// module.exports = {
//   preset: 'react-native',
//   transform: {
//     '^.+\\.(js|ts|tsx)$': 'babel-jest',
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   transformIgnorePatterns: [
//     'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|@react-native-async-storage|react-native-vector-icons)/)',
//   ],
//   moduleNameMapper: {
//     '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
//     '\\.(css|scss)$': 'identity-obj-proxy',
//     '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
//   },
//   testPathIgnorePatterns: ['/App\\.tsx$'],
//   collectCoverage: true,
//   collectCoverageFrom: [
//     "src/**/*.ts",
//     "src/**/*.tsx",
//     "!src/**/*.d.ts",
//     "!src/**/index.ts",
//     "!src/**/*/index.ts",
//     "!**/node_modules/**"
//   ],
//   coverageDirectory: "coverage",
//   coverageReporters: ["json", "html", "text"],
// };
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|@react-native-async-storage|react-native-vector-icons)/)',
  ],
  moduleNameMapper: {
    '^react-native-vector-icons/(.*)$': '<rootDir>/__mocks__/react-native-vector-icons.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^react-native$': 'react-native-web',
  },
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*/index.ts',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html', 'text'],
};
